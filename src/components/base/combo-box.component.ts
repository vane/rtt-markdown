import { CssFactory } from '../../utils/css.factory';
import { IComponent } from './icomponent';
import { ListComponent } from './list.component';
import { WithValueComponent } from './with-value.component';

const elStyles = {
  'user-select': 'none',
  cursor: 'pointer'
};

export class ComboBoxComponent<T> implements IComponent<HTMLElement> {
  private el = document.createElement('div');

  private readonly list: ListComponent;
  private readonly labelElement: HTMLElement;

  private visible = false;

  constructor(
    private elements: WithValueComponent<T>[],
    private value: string,
    private handleChange?: (value: WithValueComponent<T>) => void
  ) {
    this.labelElement = document.createElement('div');
    this.labelElement.innerText = value;
    this.list = new ListComponent([]);
    this.labelElement.addEventListener('click', this.handleClick);
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
        if (this.handleChange) this.handleChange(element);
        this.hide();
      });
      this.list.append(element.render());
    }
  }

  get label(): HTMLElement {
    return this.labelElement;
  }

  setValue(value: string): void {
    this.value = value;
    this.labelElement.innerText = value;
  }

  render(): HTMLElement {
    CssFactory.apply(this.el, elStyles);

    this.el.appendChild(this.labelElement);

    for (const element of this.elements) {
      this.list.append(element.render());
    }
    this.el.appendChild(this.list.render());

    this.hide();

    return this.el;
  }

  cleanup(): void {
    this.labelElement.removeEventListener('click', this.handleClick);
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
