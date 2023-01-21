import { IComponent } from './base/icomponent';
import { TextEditorComponent } from './text-editor/text-editor.component';
import { TextToolbarComponent } from './text-toolbar/text-toolbar.component';

export class TextContainerComponent implements IComponent<HTMLElement> {
  private readonly el = document.createElement('div');

  private readonly textToolbar: TextToolbarComponent;
  private readonly textEditor: TextEditorComponent;

  constructor() {
    this.textToolbar = new TextToolbarComponent();
    this.textEditor = new TextEditorComponent('');
  }

  focus(): void {
    this.textEditor.focus();
  }

  render(): HTMLElement {
    this.el.appendChild(this.textToolbar.render());
    this.el.appendChild(this.textEditor.render());
    return this.el;
  }
}
