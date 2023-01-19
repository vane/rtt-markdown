// from https://github.com/geekplux/markdown-it-fence
import * as Renderer from 'markdown-it/lib/renderer';
import * as StateBlock from 'markdown-it/lib/rules_block/state_block';
import * as Token from 'markdown-it/lib/token';
import MarkdownIt, { Options } from 'markdown-it';

interface MarkdownItFenceOptions {
  validate(params: string): boolean;
  render: () => string;
  marker: string;
}

export const markdownItFence = (md: MarkdownIt, name: string, options: MarkdownItFenceOptions) => {
  const defaultValidate = (params: string): boolean => {
    return params.trim().split(' ', 2)[0] === name;
  };

  const defaultRender = (tokens: Token[], idx: number, opt: Options, env: MarkdownIt.Environment, self: Renderer) => {
    if (tokens[idx].nesting === 1) {
      tokens[idx].attrPush(['class', name]);
    }

    return self.renderToken(tokens, idx, opt);
  };

  options = Object.assign(
    {
      validate: defaultValidate,
      render: defaultRender
    },
    options
  );

  const fence = (state: StateBlock, startLine: number, endLine: number) => {
    const optionMarker = options.marker || '`';
    let pos = state.bMarks[startLine] + state.tShift[startLine];
    let max = state.eMarks[startLine];
    let haveEndMarker = false;

    if (state.sCount[startLine] - state.blkIndent >= 4) return false;
    if (pos + 3 > max) return false;

    const marker = state.src.charCodeAt(pos);

    if (marker !== optionMarker.charCodeAt(0)) return false;

    let mem = pos;
    pos = state.skipChars(pos, marker);
    let len = pos - mem;

    if (len < 3) return false;

    const markup = state.src.slice(mem, pos);
    const params = state.src.slice(pos, max);

    if (params.indexOf(String.fromCharCode(marker)) >= 0) return false;

    let nextLine = startLine;

    for (;;) {
      nextLine++;
      if (nextLine >= endLine) break;

      pos = mem = state.bMarks[nextLine] + state.tShift[nextLine];
      max = state.eMarks[nextLine];

      if (pos < max && state.sCount[nextLine] < state.blkIndent) break;
      if (state.src.charCodeAt(pos) !== marker) continue;
      if (state.sCount[nextLine] - state.blkIndent >= 4) continue;

      pos = state.skipChars(pos, marker);

      if (pos - mem < len) continue;

      pos = state.skipSpaces(pos);

      if (pos < max) continue;

      haveEndMarker = true;

      break;
    }

    len = state.sCount[startLine];
    state.line = nextLine + (haveEndMarker ? 1 : 0);

    if (!options.validate(params)) return false;
    const token = state.push(name, 'div', 0);
    token.info = params;
    token.content = state.getLines(startLine + 1, nextLine, len, true);
    token.markup = markup;
    token.map = [startLine, state.line];

    return true;
  };
  /* eslint-disable */
  md.block.ruler.before('fence', name, fence, {
    alt: ['paragraph', 'reference', 'blockquote', 'list']
  });
  /* eslint-disable @typescript-eslint/no-unsafe-member-access */
  md.renderer.rules[name] = options.render;
};
