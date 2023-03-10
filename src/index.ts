import './css/prosemirror.css';
import 'highlight.js/styles/github.css';
import { Config } from './config';
import { TextContainerComponent } from './components/text-container.component';
import { markdownItHightlight } from './md/markdown-it-highlightjs';
import { markdownItKatexPlugin } from './md/makdown-it-katex';
import { markdownItMermaid } from './md/markdown-it-mermaid';
import markdownit from 'markdown-it';

const mdText = `### table with katex equation
equation | description
----------|------------
$\\nabla \\cdot \\vec{\\mathbf{B}}  = 0$ | divergence of $\\vec{\\mathbf{B}}$ is zero
$\\nabla \\times \\vec{\\mathbf{E}}\\, +\\, \\frac1c\\, \\frac{\\partial\\vec{\\mathbf{B}}}{\\partial t}  = \\vec{\\mathbf{0}}$ |  curl of $\\vec{\\mathbf{E}}$ is proportional to the rate of change of $\\vec{\\mathbf{B}}$
$\\nabla \\times \\vec{\\mathbf{B}} -\\, \\frac1c\\, \\frac{\\partial\\vec{\\mathbf{E}}}{\\partial t} = \\frac{4\\pi}{c}\\vec{\\mathbf{j}}    \\nabla \\cdot \\vec{\\mathbf{E}} = 4 \\pi \\rho$ | _wha?_
  
### javascript
\`\`\`js
function() {
}
\`\`\`
### python
\`\`\`python
def foo():
  return 'bar'
\`\`\`

### mermaid chart
\`\`\`mermaid
flowchart LR

A[Hard] -->|Text| B(Round)
B --> C{Decision}
C -->|One| D[Result 1]
C -->|Two| E[Result 2]
\`\`\`
__bold__  
*italic*  
~~Strikethrough~~  

> text quote  


# h1
## h2
### h3
#### h4
##### h5
###### h6

(c) (C) (r) (R) (tm) (TM) (p) (P) +-

`;

// Hot reloading
if (!Config.isProduction) {
  const ws = new WebSocket('ws://localhost:1234');
  ws.onmessage = () => {
    window.location.reload();
  };
}
const textContainer = new TextContainerComponent();
document.body.appendChild(textContainer.render());
textContainer.focus();

/* eslint-disable */
const md = markdownit({ html: false }).use(markdownItKatexPlugin).use(markdownItMermaid).use(markdownItHightlight)
// console.log(md.parse(mdText));
const el = document.createElement('div');
document.body.appendChild(el);
el.innerHTML = md.render(mdText);
