/*






WORK IN PROGRESS







*/

export abstract class BaseQueue<T> {
  protected abstract items: Array<T>;
  public abstract size: number;

  public abstract enqueue(val: T): void;
  public abstract dequeue(): T;
  public abstract skip(amount: number): void;
}
