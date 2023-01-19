import './css/prosemirror.css';
import { Config } from './config';
import { TextEditorComponent } from './components/text-editor/text-editor.component';
const h1 = document.createElement('h1');
document.body.appendChild(h1);
h1.innerText = `is production ${Config.isProduction.toString()}, foo value from .env: ${Config.foo || ''}`;

// Hot reloading
if (!Config.isProduction) {
  const ws = new WebSocket('ws://localhost:1234');
  ws.onmessage = () => {
    window.location.reload();
  };
}
const editor = new TextEditorComponent('');
document.body.appendChild(editor.render());
editor.focus();
