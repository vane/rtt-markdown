import { CssFactory } from '../../utils/css.factory';
import { IComponent } from './icomponent';

const elStyles = {
  'background-color': '#ffffff',
  border: '1px solid #000000',
  'border-radius': '2px',
  padding: '5px',
  height: 'fit-content',
  width: 'fit-content',
  'z-index': '1000',
  position: 'absolute'
};

export class ListComponent implements IComponent<HTMLElement> {
  private el = document.createElement('div');

  constructor(private elements: HTMLElement[]) {}

  get style(): CSSStyleDeclaration {
    return this.el.style;
  }

  append(element: HTMLElement): void {
    this.el.appendChild(element);
  }

  remove(element: HTMLElement) {
    this.el.removeChild(element);
  }

  render(): HTMLElement {
    for (const element of this.elements) {
      this.el.appendChild(element);
    }
    CssFactory.apply(this.el, elStyles);
    return this.el;
  }
}
