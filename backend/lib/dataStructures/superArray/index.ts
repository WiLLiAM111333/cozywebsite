import { inspect, InspectOptionsStylized } from 'util';

/**
 * A class to handle custom array methods directly on the class itself
 * @extends [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
 */
export class SuperArray<T> extends Array<T> {
  /**
   * Checks if the provided array is a `SuperArray`
   * @param {ArrayLike<unknown>} arr 
   * @returns {boolean}
   */
  public static isSuperArray(arr: ArrayLike<unknown>): boolean {
    return arr instanceof SuperArray;
  }

  /**
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

  public [inspect.custom](depth: number, options: InspectOptionsStylized): string {
    return inspect([...this.values()], options);
  }

  /**
   * Returns a section of an array.
   * @param {?Number} start The beginning of the specified portion of the array.
   * @param {?Number} end The end of the specified portion of the array. This is exclusive of the element at the index 'end'.
   */
  public override slice(start?: number, end?: number): SuperArray<T> {
    return new SuperArray<T>(super.slice(start, end));
  }

  /**
   * Combines two or more arrays.
   * @param {...Array<ConcatArray<T>>} items Additional items to add to the end of array1.
   * @returns {SuperArray<T>}
  */
  public override concat(...items: Array<ConcatArray<T>>): SuperArray<T>;
  /**
   * Combines two or more arrays.
   * @param {...Array<(ConcatArray<T> | T)} items Additional items to add to the end of array1.
   * @returns {SuperArray<T>}
  */
  public override concat(...items: Array<(ConcatArray<T> | T)>): SuperArray<T> {
    return new SuperArray<T>(super.concat(...items));
  }

  /**
   * Removes elements from an array and, if necessary, inserts new elements in their place, returning the deleted elements.
   * @param {Number} start The zero-based location in the array from which to start removing elements.
   * @param {Number} deleteCount The number of elements to remove.
   * @returns {SuperArray<T>}
   */
  public override splice(start: number, deleteCount?: number): SuperArray<T>;
  /**
   * Removes elements from an array and, if necessary, inserts new elements in their place, returning the deleted elements.
   * @param {Number} start The zero-based location in the array from which to start removing elements.
   * @param {Number} deleteCount The number of elements to remove.
   * @param {Array<T>} items Elements to insert into the array in place of the deleted elements.
   * @returns {SuperArray<T>}
   */
  public override splice(start: number, deleteCount: number, ...items: Array<T>): SuperArray<T> {
    return new SuperArray<T>(super.splice(start, deleteCount, ...items));
  }

  /**
   * Calls a defined callback function on each element of an array, and returns an array that contains the results.
   * @param {(value: T, index: Number, array: SuperArray<T>) => U} callbackfn A function that accepts up to three arguments. The map method calls the callbackfn function one time for each element in the array.
   * @param {?unknown} thisArg An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
   * @returns {SuperArray<U>}
   */
  public override map<U>(callbackfn: (value: T, index: number, array: SuperArray<T>) => U, thisArg?: unknown): SuperArray<U> {
    return new SuperArray<U>(super.map<U>(callbackfn, thisArg));
  }

  /**
   * Returns the elements of an array that meet the condition specified in a callback function.
   * @param {(value: T, index: number, array: SuperArray<T>) => boolean} predicate A function that accepts up to three arguments. The filter method calls the predicate function one time for each element in the array.
   * @param {?unknown} thisArg An object to which the this keyword can refer in the predicate function. If thisArg is omitted, undefined is used as the this value.
   * @returns {SuperArray<S>}
   */
  public override filter<S extends T>(predicate: (value: T, index: number, array: SuperArray<T>) => value is S, thisArg?: unknown): SuperArray<S>;
  /**
   * Returns the elements of an array that meet the condition specified in a callback function.
   * @param {(value: T, index: number, array: SuperArray<T>) => unknown} predicate A function that accepts up to three arguments. The filter method calls the predicate function one time for each element in the array.
   * @param {?unknown} thisArg An object to which the this keyword can refer in the predicate function. If thisArg is omitted, undefined is used as the this value.
   * @returns {SuperArray<T>}
   */
  public override filter(predicate: (value: T, index: number, array: SuperArray<T>) => unknown, thisArg?: unknown): SuperArray<T> {
    return new SuperArray(super.filter(predicate, thisArg));
  }

  /**
   * Returns a random value of the array
   * @returns {T | SuperArray<T>}
   */
  public random(): T;
  /**
   * Returns a random value of the array
   * @param {number} amount
   * @returns {T | SuperArray<T>}
   */
  public random(amount: number): SuperArray<T>;
  /**
   * Returns a random value of the array
   * @param {?number} amount
   * @returns {T | SuperArray<T>}
   */
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
   * Rotates the array to the left by `n` steps and returns a new `SuperArray`.
   * @param {Number} n The amount of steps to rotate the array with
   * @returns {SuperArray<T>} 
   */
  public rotateLeft(n: number): SuperArray<T> {
    if(n >= this.length || n <= 0) {
      return this;
    }

    return new SuperArray([...this.slice(n, this.length), ...this.slice(0, n)]);
  }

  /**
   * Rotates the array to the right by `n` steps and returns a new `SuperArray`
   * @param {Number} n The amount of steps to rotate the array with 
   * @returns {SuperArray<T>}
   */
  public rotateRight(n: number): SuperArray<T> {
    if(n >= this.length || n <= 0) {
      return this;
    }

    return new SuperArray<T>([...this.slice(-n), ...this.slice(0, -n)]);
  }

  /**
   * Shuffles and returns a new `SuperArray`
   * @returns {SuperArray<T>}
   */
  public shuffle(): SuperArray<T> {
    return new SuperArray<T>(this.sort(() => .5 - Math.random()));
  }

  /**
   * Returns the last value in the array without removing it unlike [Array.pop()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/pop)
   * @returns {T}
   */
  public last(): T {
    return this[this.length - 1];
  }

  /**
   * Returns a new object of the array. It does not flatten it, so the nesting stays the same. 
   * @returns {{ [key: Number]: T }}
   */
  public toObject(): { [key: number]: T } {
    return this.reduce((obj: { [key: number]: T }, value: T, index: number): { [key: number]: T } => {
      obj[index] = value;
      return obj;
    }, {});
  }
}
