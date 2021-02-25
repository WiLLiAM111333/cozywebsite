/*






WORK IN PROGRESS







*/

import { SuperArray } from "../superArray";
import { BaseQueue } from "./BaseQueue";

export class MusicQueue<T> extends BaseQueue<T> {
  protected items: Array<T>;
  public size: number;
  
  public constructor(items: SuperArray<T>) {
    super();

    this.size = 0;
    this.items = [] 

    if(items) {
      for(let i = 0; i < items.length; i++) {
        this.items[i] = items[i];
      }

      this.size = items.length;
    }
  }

  public enqueue(val: T): void {
    this.items[this.size++] = val;
  }

  public dequeue(): T | undefined {
    const val = this.items.shift();
    this.size--;

    return val;
  }

  public skip(amount: number): void {
    this.items = this.items.slice(amount, this.items.length);
    this.size -= amount;
  }
}
