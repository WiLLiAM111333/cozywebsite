import { SuperArray } from "../superArray";
import { BaseQueue } from "./BaseQueue";

/**
 * A queue designed to handle common music operations.
 * @exports
 * @class 
 * @extends {BaseQueue} 
 */
export class MusicQueue<T> extends BaseQueue<T> {
  /**
   * The internal array of values in the queue. I went with array because I feel like anything 
   * else is just overkill for something this simple, I really dont need a doubly linked list 
   * to get and remove the first element of the queue.
   * @protected
   * @type {SuperArray<T>}
   */
  protected items: SuperArray<T>;
  /**
   * The amount of items in the queue
   * @public
   * @type {number}
   */
  public size: number;
  /**
   * The internal boolean to check if it should loop.
   * @private
   * @type {boolean}
   */
  private _isLooped: boolean;
  /**
   * The max amount of items that can exist at once in the queue
   * @private
   * @type {number}
   */
  private maxSize: number;

  public *[Symbol.iterator]() {
    for(let i = 0; i < this.items.length; i++) {
      yield this.items[i];
    }
  }

  public get [Symbol.toStringTag]() {
    return 'MusicQueue'
  }

  /**
   * The internal boolean to check if it should loop.
   * @public
   * @type {boolean}
   */
  public get isLooped(): boolean {
    return this._isLooped;
  }

  /**
   * The internal boolean to check if it should loop.
   * @public
   * @type {boolean}
   */
  public set isLooped(isLooped: boolean) {
    this._isLooped = isLooped;
  }
  
  /**
   * @public
   * @constructor
   * @param {SuperArray<T>} items 
   */
  public constructor(items?: SuperArray<T>) {
    super();

    this.size = items?.length || 0;
    this.maxSize = 100; // Might change later
    this.items = new SuperArray<T>(items);
  }

  /**
   * Adds an item to the end of the queue.
   * @public
   * @method
   * @param {T} val
   * @returns {void} 
   */
  public enqueue(val: T): void {
    if(this.size < this.maxSize) {
      this.items[this.size++] = val;
    }
  }

  /**
   * Removes the first element of the queue and returns its value (or undefined if the queue is empty).
   * @public
   * @method
   * @returns {T | undefined}
   */
  public dequeue(): T | undefined {
    const val = this.items.shift();

    if(this.isLooped) {
      // Doesnt reduce this.size by 1, it just puts it in the last spot
      this.items[this.size - 1] = val;
    } else {
      this.size--;
    }

    return val;
  }
  
  /**
   * Accesses the first element in the queue without removing it unlike `dequeue()`.
   * @public
   * @method
   * @returns {T | undefined}
   */
  public first(): T | undefined {
    return this.items[0];
  }

  /**
   * Clears the queue of all data
   * @public
   * @ethod
   * @returns {void}
   */
  public clear(): void {
    this.items = new SuperArray<T>();
    this.size = 0;
  }

  /**
   * Skips a given amount of items in the queue.
   * @public
   * @method
   * @param {number} amount 
   * @returns {void}
   */
  public skip(amount: number): void {
    if(this.size) {
      this.items = this.items.slice(amount, this.items.length);
      this.size = amount >= this.size ? 0 : this.size - amount;
    }
  }

  /**
   * Shuffles the queue.
   * @public
   * @method
   * @returns {void}
   */
  public shuffle(): void {
    this.items = this.items.shuffle();
  }
}
