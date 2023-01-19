import * as Token from 'markdown-it/lib/token';
import MarkdownIt from 'markdown-it';
import { markdownItFence } from './markdown-it-fence';
import mermaid from 'mermaid';
import { nanoid } from 'nanoid';

const renderer = (tokens: Token[], idx: number) => {
  const id = nanoid();
  let svgData = '';
  mermaid.render(id, tokens[idx].content, (svgCode) => {
    svgData = svgCode;
  });
  return `<div class="mermaid-${id}">${svgData}</div>`;
};

export const markdownItMermaid = (md: MarkdownIt, options?: { [key: string]: any }) => {
  if (!options) options = {};
  options.render = renderer;
  return markdownItFence(md, 'mermaid', options);
};
