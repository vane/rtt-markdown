import { IComponent } from '../../base/icomponent';

export class TextCodeButton implements IComponent<HTMLElement> {
  private el = document.createElement('div');

  render() {
    return this.el;
  }
}
