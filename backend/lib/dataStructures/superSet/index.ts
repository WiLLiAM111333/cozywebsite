/**
 * @description A class extending the base Set class in JavaScript
 * @exports
 * @class 
 * @extends {Set}
 */
export class SuperSet<T> extends Set<T> {
  /**
   * @private
   * @type {this._arrayay<T>}
   */
  private _array: Array<T>;

  /**
   * @public
   * @constructor
   * @param {Iterable<T> | Array<T>} values
   */
  public constructor(values?: Iterable<T> | Array<T>) {
    super(values);
  }

  /**
   * @description An array of the values stored in the SuperSet
   * @public
   * @type {Array<T>}
   */
  public get array(): Array<T> {
    if(!this._array || this._array.length !== this.size) {
      this._array = [...this.values()];
    }

    return this._array;
  }

  /**
   * @description Returns a random element in the SuperSet. 
   * @public
   * @method
   * @returns {T} 
   */
  public random(): T | undefined {
    return this.array[Math.floor(Math.random() * this.size)];
  }

  /**
   * @description Identical to [Array.find()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find)
   * @public
   * @method
   * @param {(value: T, set: this) => boolean} fn 
   * @returns {T}
   */
  public find(fn: (value: T, set: this) => boolean): T | undefined {
    for(const value of this.values()) {
      if(fn(value, this)) {
        return value;
      }
    }

    return undefined;
  }

  /**
   * @description Identical to [Array.concat()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat)
   * @public
   * @method
   * @param {...Array<SuperSet<T> | Set<T>>} sets 
   * @returns {SuperSet<T>}
   */
  public concat(...sets: Array<SuperSet<T> | Set<T>>): SuperSet<T> {
    const newSet = new SuperSet<T>(this.values());

    for(const set of sets) {
      for(const value of set.values()) {
        newSet.add(value);
      }
    }

    return newSet;
  }

  /**
   * @description Identical to [Array.filter()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)
   * @public
   * @method
   * @param {(value: T, set: this) => boolean} fn
   * @returns {SuperSet<T>}
   */
  public filter(fn: (value: T, set: this) => boolean): SuperSet<T> {
    const newSet = new SuperSet<T>();

    for(const value of this.values()) {
      if(fn(value, this)) {
        newSet.add(value);
      }
    }

    return newSet;
  }

  /**
   * @description Identical to [Array.reduce()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce)
   * @public
   * @method
   * @param {(accumulator: S, value: V, key?: K, map?: this) => S} fn 
   * @param {?S} initialValue 
   * @returns {S}
   */
   public reduce<S>(fn: (accumualtor: S, value: T, set?: this) => S, initialValue?: S): S {
    let accumulator!: S;

    if(typeof initialValue !== 'undefined') {
      accumulator = initialValue;
      
      for(const value of this.values()) {
        accumulator = fn(accumulator, value, this);
      }

      return accumulator;
    }

    let first = true;

    for(const value of this.values()) {
      if(first) {
        accumulator = (value as unknown) as S;
        first = false;
        
        continue;
      }

      accumulator = fn(accumulator, value, this);
    }

    if(first) {
      throw new TypeError('Reduce of empty SuperSet with no initial value');
    }

    return accumulator;
  }
}
