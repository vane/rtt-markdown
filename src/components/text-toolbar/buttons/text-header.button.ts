import { ComboBoxComponent } from '../../base/combo-box.component';
import { IComponent } from '../../base/icomponent';
import { WithValueComponent } from '../../base/with-value.component';

export class TextHeaderButton implements IComponent<HTMLElement> {
  private el = document.createElement('div');

  private readonly select: ComboBoxComponent<string>;

  constructor() {
    this.select = new ComboBoxComponent<string>([], 'header 1');
  }

  render(): HTMLElement {
    const options = this.createOptions();
    this.select.setOptions(options);
    this.el.appendChild(this.select.render());
    return this.el;
  }

  private createOptions(): WithValueComponent<string>[] {
    let value = '#';
    const out = [];
    for (let i = 1; i < 7; i++) {
      const option = new WithValueComponent<string>(`h${i}`, `header ${i}`, value);
      out.push(option);
      value += '#';
    }
    return out;
  }
}
