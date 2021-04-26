import { SuperArray } from "../SuperArray";
import { BaseQueue } from "./BaseQueue";
import { inspect, InspectOptionsStylized } from 'util';

/**
 * A queue designed to handle common music operations.
 * @exports
 * @class 
 * @extends {BaseQueue} 
 */
export class MusicQueue<T> extends BaseQueue<T> {
  /**
   * The internal array of values in the queue. I went with array because I feel 
   * like anything  else is just overkill for something this simple, I really dont need a doubly 
   * linked list to get and remove the first element of the queue.
   * @protected
   * @type {SuperArray<T>}
   */
  protected items: SuperArray<T>;
  /**
   * The amount of items in the queue.
   * @public
   * @type {number}
   */
  public size: number;
  /**
   * The internal boolean to check if it should loop.
   * @private
   * @type {boolean}
   */
  private isLooped: boolean;
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

  public [inspect.custom](depth: number, options: InspectOptionsStylized) {
    options.colors = true;
    options.depth = depth;
    options.compact = this.size < 15;
    
    if(this.size === 0) {
      return 'MusicQueue(0)';
    }

    let str = `MusicQueue(${this.size})${inspect(this.items, options).replace(/SuperArray\(\d+\)/, '')}`
    
    return str;
  }
  
  /**
   * @public
   * @constructor
   * @param {?SuperArray<T>} items 
   */
  public constructor(items?: Array<T>) {
    super();

    this.size = items?.length || 0;
    this.maxSize = 100; // Might change later
    this.items = new SuperArray<T>(items);
  }

  public toggleLoop(): void {
    const looped = this.isLooped;

    if(typeof looped === "undefined" || looped === null) {
      this.isLooped = false;
    }

    this.isLooped = !looped;
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
   * Clears the queue of all data.
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
