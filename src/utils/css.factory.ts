export class CssFactory {
  static apply(element: HTMLElement, styles: { [key: string]: string }): void {
    for (const key in styles) {
      const value = styles[key];
      element.style.setProperty(key, value);
    }
  }
}
