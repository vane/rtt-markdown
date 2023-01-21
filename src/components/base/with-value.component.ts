import { CssFactory } from '../../utils/css.factory';
import { IComponent } from './icomponent';

const elStyles = {
  'user-select': 'none',
  cursor: 'pointer'
};

export class WithValueComponent<T> implements IComponent<HTMLElement> {
  private readonly el: HTMLElement;

  constructor(tagName: string, public text: string, public value: T, private handleClick?: () => void) {
    this.el = document.createElement(tagName);
    this.el.innerText = text;
    if (handleClick) this.el.addEventListener('click', handleClick);
  }

  setClickListener(value?: () => void): void {
    if (this.handleClick) this.el.removeEventListener('click', this.handleClick);
    this.handleClick = value;
    if (value) this.el.addEventListener('click', value);
  }

  get style(): CSSStyleDeclaration {
    return this.el.style;
  }

  get container(): HTMLElement {
    return this.el;
  }

  render(): HTMLElement {
    CssFactory.apply(this.el, elStyles);
    return this.el;
  }

  cleanup(): void {
    if (this.handleClick) this.el.removeEventListener('click', this.handleClick);
  }
}
