import { IComponent } from '../../base/icomponent';

export class TextStriketrughButton implements IComponent<HTMLElement> {
  private el = document.createElement('div');

  render() {
    return this.el;
  }
}
