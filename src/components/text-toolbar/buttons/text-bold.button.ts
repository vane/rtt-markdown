import { IComponent } from '../../base/icomponent';

export class TextBoldButton implements IComponent<HTMLElement> {
  private el = document.createElement('div');

  render() {
    return this.el;
  }
}
