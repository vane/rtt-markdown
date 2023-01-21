import { IComponent } from '../../base/icomponent';

export class TextUnderlineButton implements IComponent<HTMLElement> {
  private el = document.createElement('div');

  render() {
    return this.el;
  }
}
