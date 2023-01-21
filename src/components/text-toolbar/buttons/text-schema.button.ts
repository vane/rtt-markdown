import { IComponent } from '../../base/icomponent';

export class TextSchemaButton implements IComponent<HTMLElement> {
  private el = document.createElement('div');

  render() {
    return this.el;
  }
}
