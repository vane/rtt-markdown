import * as Token from 'markdown-it/lib/token';
import { MarkdownItFenceOptions, markdownItFence } from './markdown-it-fence';
import MarkdownIt from 'markdown-it';
import hljs from 'highlight.js/lib/common';

const renderer = (tokens: Token[], idx: number) => {
  const token = tokens[idx];
  if (hljs.getLanguage(token.type)) {
    const result = hljs.highlight(token.content, { language: token.type });
    return `<pre class="hljs"><code>${result.value}</code></pre>`;
  }
  return `<pre><code>${token.content}</code></pre>`;
};

export const markdownItHightlight = (md: MarkdownIt, options?: MarkdownItFenceOptions) => {
  if (!options) options = {};
  options.render = renderer;
  return markdownItFence(md, ['js', 'python'], options);
};
