import { IComponent } from '../../base/icomponent';

export class TextTodoButton implements IComponent<HTMLElement> {
  private el = document.createElement('div');

  render() {
    return this.el;
  }
}
