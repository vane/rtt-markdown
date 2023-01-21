import { ComboBoxComponent } from '../../base/combo-box.component';
import { CssFactory } from '../../../utils/css.factory';
import { IComponent } from '../../base/icomponent';
import { WithValueComponent } from '../../base/with-value.component';

const labelStyles = {
  'font-size': '20px',
  border: '1px solid #000000',
  'border-radius': '2px',
  width: '117px',
  padding: '2px 5px 2px 5px',
  'margin-bottom': '1px'
};

export class TextHeaderButton implements IComponent<HTMLElement> {
  private el = document.createElement('div');

  private readonly select: ComboBoxComponent<string>;

  private selectedValue = '#';

  constructor() {
    this.select = new ComboBoxComponent<string>([], 'header 1', (element) => {
      this.selectedValue = element.value;
    });
  }

  value(): string {
    return this.selectedValue;
  }

  render(): HTMLElement {
    const options = this.createOptions();
    this.select.setOptions(options);

    this.el.appendChild(this.select.render());
    CssFactory.apply(this.select.label, labelStyles);

    return this.el;
  }

  cleanup(): void {
    this.select.cleanup();
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
