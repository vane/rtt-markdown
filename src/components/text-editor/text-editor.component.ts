import { CssStyleFactory } from '../../utils/css-style.factory';
import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { IComponent } from '../icomponent';
import { TextEditorFactory } from './text-editor.factory';

const elStyles = {
  border: '1px solid #000000',
  width: '200px',
  height: '200px'
};

export class TextEditorComponent implements IComponent<HTMLElement> {
  private el = document.createElement('div');

  private readonly state: EditorState;
  private readonly view: EditorView;

  constructor(data: string) {
    this.state = TextEditorFactory.createState(data);
    this.view = this.createView(this.state);
  }

  private createView(state: EditorState): EditorView {
    return new EditorView(this.el, {
      state,
      handleKeyDown: (view: EditorView, event: KeyboardEvent) => {
        event.stopImmediatePropagation();
      },
      dispatchTransaction: (tx) => {
        state = state.apply(tx);
        this.view?.updateState(state);
      }
    });
  }

  focus(): void {
    this.view.focus();
  }

  render(): HTMLElement {
    CssStyleFactory.apply(this.el, elStyles);
    return this.el;
  }
}
