import { CssFactory } from '../../utils/css.factory';
import { IComponent } from './icomponent';
import { ListComponent } from './list.component';
import { WithValueComponent } from './with-value.component';

const elStyles = {
  'font-size': '20px',
  'user-select': 'none',
  cursor: 'pointer'
};

export class ComboBoxComponent<T> implements IComponent<HTMLElement> {
  private el = document.createElement('div');

  private readonly list: ListComponent;
  private readonly label: HTMLElement;

  private visible = false;

  constructor(private elements: WithValueComponent<T>[], private value: string) {
    this.label = document.createElement('div');
    this.label.innerText = value;
    this.list = new ListComponent([]);
    this.label.addEventListener('click', this.handleClick);
  }

  setOptions(elements: WithValueComponent<T>[]) {
    for (const element of this.elements) {
      element.cleanup();
      this.list.remove(element.container);
    }
    this.elements = elements;

    for (const element of elements) {
      element.setClickListener(() => {
        this.setValue(element.text);
        this.hide();
      });
      this.list.append(element.render());
    }
  }

  setValue(value: string): void {
    this.value = value;
    this.label.innerText = value;
  }

  render(): HTMLElement {
    for (const element of this.elements) {
      this.list.append(element.render());
    }
    CssFactory.apply(this.el, elStyles);
    this.hide();
    this.el.appendChild(this.label);
    this.el.appendChild(this.list.render());
    return this.el;
  }

  cleanup(): void {
    this.label.removeEventListener('click', this.handleClick);
    for (const element of this.elements) {
      element.cleanup();
    }
  }

  show(): void {
    this.visible = true;
    this.list.style.display = 'inline-block';
  }

  hide(): void {
    this.visible = false;
    this.list.style.display = 'none';
  }

  private handleClick = () => {
    this.visible ? this.hide() : this.show();
  };
}
