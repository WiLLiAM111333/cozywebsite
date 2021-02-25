/*






WORK IN PROGRESS







*/

/**
 * @description A class to handle custom array methods directly on the class itself
 * @exports
 * @class
 * @extends [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
 */
export class SuperArray<T> extends Array<T> {
  /**
   * @public
   * @constructor
   * @param {Array<T>} values 
   */
  public constructor(values?: Array<T>) {
    // I never use the Array constructor anyways so who cares
    super(undefined);
    
    if(values) {
      for(let i = 0; i < values.length; i++) {
        this[i] = values[i]
      }
    }
  }

  public slice(start?: number, end?: number): SuperArray<T> {
    return new SuperArray<T>(super.slice(start, end));
  }

  /**
   * @description 
   * @public
   * @method
   * @param {?number} amount
   * @returns {T | SuperArray<T>}
   */
  public random(): T;
  public random(amount: number): SuperArray<T>;
  public random(amount?: number): T | SuperArray<T> {
    if(amount) {
      const arr = new SuperArray<T>();

      for(let i = 0; i < amount; i++) {
        arr[i] = this[Math.floor(Math.random() * this.length)];
      }

      return arr;
    }

    return this[Math.floor(Math.random() * this.length)];
  }

  /**
   * @description Rotates the array to the left by `n` steps and returns a new `SuperArray`.
   * @publioc
   * @method
   * @param {Number} n The amount of steps to rotate the array with
   * @returns {SuperArray<T>} 
   */
  public rotateLeft(n: number): SuperArray<T> {
    return new SuperArray([...this.slice(n, this.length), ...this.slice(0, n)]);
  }

  /**
   * @description Rotates the array to the right by `n` steps and returns a new `SuperArray`
   * @public
   * @method
   * @param {Number} n The amount of steps to rotate the array with 
   * @returns {SuperArray<T>}
   */
  public rotateRight(n: number): SuperArray<T> {
    return new SuperArray<T>([...this.slice(-n), ...this.slice(0, -n)]);
  }

  /**
   * @description Shuffles and returns a new `SuperArray`
   * @public
   * @method
   * @returns {SuperArray<T>}
   */
  public shuffle(): SuperArray<T> {
    return new SuperArray<T>(this.sort(() => .5 - Math.random()));
  }

  /**
   * @description Returns a new object of the array. It does not flatten it, so the nesting stays the same. 
   * @public
   * @method
   * @returns {{ [key: Number]: T }}
   */
  public toObject(): { [key: number]: T } {
    return this.reduce((obj: { [key: number]: T }, value: T, index: number): { [key: number]: T } => {
      obj[index] = value;
      return obj;
    }, {});
  }
}
