import * as Token from 'markdown-it/lib/token';
import { MarkdownItFenceOptions, markdownItFence } from './markdown-it-fence';
import MarkdownIt from 'markdown-it';
import mermaid from 'mermaid';
import { nanoid } from 'nanoid';
mermaid.initialize({ theme: 'forest', startOnLoad: false });

const renderer = (tokens: Token[], idx: number) => {
  const id = nanoid();
  let svgData = '';
  mermaid.render(id, tokens[idx].content, (svgCode) => {
    svgData = svgCode;
  });
  return `<div class="mermaid-${id}">${svgData}</div>`;
};

export const markdownItMermaid = (md: MarkdownIt, options?: MarkdownItFenceOptions) => {
  if (!options) options = {};
  options.render = renderer;
  return markdownItFence(md, ['mermaid'], options);
};
