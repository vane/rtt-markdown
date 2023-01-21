import { CssFactory } from '../../utils/css.factory';
import { IComponent } from '../base/icomponent';
import { TextHeaderButton } from './buttons/text-header.button';

const elStyles = {
  margin: '10px',
  display: 'flex',
  height: '24px'
};

export class TextToolbarComponent implements IComponent<HTMLElement> {
  private readonly el = document.createElement('div');

  private headerButton: TextHeaderButton;

  constructor() {
    this.headerButton = new TextHeaderButton();
  }

  render() {
    this.el.appendChild(this.headerButton.render());
    CssFactory.apply(this.el, elStyles);
    return this.el;
  }
}
