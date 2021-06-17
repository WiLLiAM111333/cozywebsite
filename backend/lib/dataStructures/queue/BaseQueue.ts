import { SuperArray } from "../superArray";

/**
 * Abstract base-class for queues
 * @exports
 * @abstract
 * @class
 */
export abstract class BaseQueue<T> {
  /**
   * Internal array to store items
   * @protected
   * @abstract
   * @type {SuperArray<T>}
   */
  protected abstract items: SuperArray<T>;
  /**
   * Size of the queue. This is here because `items` is protected so you cant access it after instantiation
   * @public
   * @abstract
   * @type {Number}
   */
  public abstract size: number;

  /**
   * @public
   * @abstract
   * @method
   * @param {T} val
   * @returns {void} 
   */
  public abstract enqueue(val: T): void;
  /**
   * @public  
   * @abstract
   * @method
   * @returns {void}
   */
  public abstract dequeue(): T;
  /**
   * @public
   * @abstract
   * @method
   * @param {Number} amount 
   * @returns {void}
   */
  public abstract skip(amount: number): void;
  /**
   * Returns a boolean value to show if the queue has the provided item
   * @public
   * @method
   * @param {T} item
   * @returns {Boolean}
   */
  public has(item: T): boolean {
    return this.items.includes(item);
  }

  public get [Symbol.toStringTag](): string {
    return 'Queue';
  }
}
