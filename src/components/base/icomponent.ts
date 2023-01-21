export interface IComponent<T> {
  render(): T;
  cleanup?: () => void;
}
