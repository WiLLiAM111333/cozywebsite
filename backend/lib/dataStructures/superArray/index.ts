/**
 * @description A class to handle custom array methods directly on the class itself
 * @exports
 * @class
 * @extends [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
 */
export class SuperArray<T> extends Array<T> {
  public static isSuperArray(arr: ArrayLike<unknown>) {
    return arr instanceof SuperArray;
  }

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

  /**
   * Returns a section of an array.
   * @param start The beginning of the specified portion of the array.
   * @param end The end of the specified portion of the array. This is exclusive of the element at the index 'end'.
   */
  public slice(start?: number, end?: number): SuperArray<T> {
    return new SuperArray<T>(super.slice(start, end));
  }

  /**
   * Combines two or more arrays.
   * @param items Additional items to add to the end of array1.
  */
  public concat(...items: Array<ConcatArray<T>>): SuperArray<T>;
  /**
   * Combines two or more arrays.
   * @param items Additional items to add to the end of array1.
  */
  public concat(...items: Array<(ConcatArray<T> | T)>): SuperArray<T> {
    return new SuperArray<T>(super.concat(...items));
  }

  /**
   * Removes elements from an array and, if necessary, inserts new elements in their place, returning the deleted elements.
   * @param start The zero-based location in the array from which to start removing elements.
   * @param deleteCount The number of elements to remove.
   * @param items Elements to insert into the array in place of the deleted elements.
   */
  public splice(start: number, deleteCount?: number): SuperArray<T>;
  /**
   * Removes elements from an array and, if necessary, inserts new elements in their place, returning the deleted elements.
   * @param start The zero-based location in the array from which to start removing elements.
   * @param deleteCount The number of elements to remove.
   * @param items Elements to insert into the array in place of the deleted elements.
   */
  public splice(start: number, deleteCount: number, ...items: Array<T>): SuperArray<T> {
    return new SuperArray<T>(super.splice(start, deleteCount, ...items));
  }

  /**
   * Calls a defined callback function on each element of an array, and returns an array that contains the results.
   * @param callbackfn A function that accepts up to three arguments. The map method calls the callbackfn function one time for each element in the array.
   * @param thisArg An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
   */
  public map<U>(callbackfn: (value: T, index: number, array: SuperArray<T>) => U, thisArg?: any): SuperArray<U> {
    return new SuperArray<U>(super.map<U>(callbackfn))
  }

  /**
   * Returns the elements of an array that meet the condition specified in a callback function.
   * @param predicate A function that accepts up to three arguments. The filter method calls the predicate function one time for each element in the array.
   * @param thisArg An object to which the this keyword can refer in the predicate function. If thisArg is omitted, undefined is used as the this value.
   */
  public filter<S extends T>(predicate: (value: T, index: number, array: SuperArray<T>) => value is S, thisArg?: any): SuperArray<S>;
  /**
   * Returns the elements of an array that meet the condition specified in a callback function.
   * @param predicate A function that accepts up to three arguments. The filter method calls the predicate function one time for each element in the array.
   * @param thisArg An object to which the this keyword can refer in the predicate function. If thisArg is omitted, undefined is used as the this value.
   */
  public filter(predicate: (value: T, index: number, array: SuperArray<T>) => unknown, thisArg?: any): SuperArray<T> {
    return new SuperArray(super.filter(predicate, thisArg));
  }

  /**
   * @description Returns a random value of the array
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
    if(n >= this.length || n <= 0) {
      return this;
    }

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
    if(n >= this.length || n <= 0) {
      return this;
    }

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
   * @description Returns the last value in the array without removing it unlike [Array.pop()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/pop)
   * @public
   * @method
   * @returns {T}
   */
  public last(): T {
    return this[this.length - 1];
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
