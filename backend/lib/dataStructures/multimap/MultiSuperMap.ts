import { SuperArray } from '../superArray';
import { MultiMap } from './MultiMap';
import { SuperMap } from '../superMap';

/**
 * A more JS-Styled version of MultiMap
 */
export class MultiSuperMap<K, V> extends MultiMap<K, V> {
  /**
   * Cache array to hold the values of the map. This gets set to `null` as soon as
   * `set()` or `delete()` gets called
   */
  private _array: SuperArray<V>;
  /**
   * Cache array to hold the keys of the map. This gets set to `null` as soon as
   * `set()` or `delete()` gets called
   */
  private _keyArray: SuperArray<K>;
  /**
   * Cache array to hold the key-value pairs of the map. This gets set to `null` as soon as
   * `set()` or `delete()` gets called
   */
  private _entryArray: SuperArray<{ key: K, value: V }>;

  public override get [Symbol.species](): typeof MultiSuperMap {
    return MultiSuperMap;
  }

  public override get [Symbol.toStringTag](): string {
    return 'MultiSuperMap'
  }

  /**
   * @param {ReadonlyArray<KeyValueTuple<K, V>>} items 
   */
  public constructor(items?: ReadonlyArray<KeyValueTuple<K, V>>) {
    super(items);
  }

  /**
   * Inserts an item in the `MultiMap`.
   * @param {K} key 
   * @param {V} value 
   * @returns {void}
   */
  public override insert(key: K, value: V): void {
    this.nullifyCacheArrays();
    return super.insert(key, value);
  }

  /**
   * Extracts an entry from the `MultiMap`
   * @param {K} iKey
   * @returns {{ key: K, value: V }}
   */
  public override extract(iKey: K): { key: K, value: V } {
    this.nullifyCacheArrays();
    return super.extract(iKey);
  }

  /**
   * Clears the `MultiMap` of all entries.
   * @returns {void}
   */
  public override clear(): void {
    this.nullifyCacheArrays();
    return super.clear();
  }

  /**
   * Erases one or more values by a range of numbers, key or a flat number.
   * @param {[number, number]} query 
   * @returns {number}
   */
   public override erase(query: [number, number]): number;
   /**
    * Erases one or more values by a range of numbers, key or a flat number.
    * @param {number} query 
    * @returns {number}
    */
   public override erase(query: number): number;
   /**
    * Erases one or more values by a range of numbers, key or a flat number.
    * @param {K} query 
    * @returns {number}
    */
   public override erase(query: K): number;
   /**
    * Erases one or more values by a range of numbers, key or a flat number.
    * @param {[number, number] | number} query 
    * @returns {number}
    */
   public override erase(query: [number, number] | number | K): number;
   /**
    * Erases one or more values by a range of numbers, key or a flat number.
    * @param {[number, number] | number | K} query 
    * @returns {number}
    */
   public override erase(query: [number, number] | number | K): number {
    this.nullifyCacheArrays();
    return super.erase(query);
  }

  /**
   * Returns a new [SuperArray](../../../docs/dataStructures/SuperArray.md)
   * containing the values of the map.
   * @returns {SuperArray<V>}
   */
   public toArray(): SuperArray<V> {
    if(!this._array || this._array.length !== this.size) {
      const arr = new SuperArray<V>();
      let count = 0;
  
      for(const value of this.values()) {
        arr[count++] = value;
      }

      this._array = arr;
    }

    return this._array;
  }

    /**
     * Returns a new [SuperArray](../../../docs/dataStructures/SuperArray.md)
     * containing the keys of the map.
     * @returns {SuperArray<K>}
     */
    public toKeyArray(): SuperArray<K> {
    if(!this._keyArray || this._keyArray.length !== this.size) {
      const arr = new SuperArray<K>();
      let count = 0;

      for(const key of this.keys()) {
        arr[count++] = key;
      }
      
      this._keyArray = arr;
    }

    return this._keyArray;
  }

  /**
   * Returns a new [SuperArray](../../../docs/dataStructures/SuperArray.md)
   * containing the key-value pairs of the map.
   * @returns {SuperArray<[K, V]>}
   */
  public toEntryArray(): SuperArray<{ key: K, value: V }> {
    if(!this._entryArray || this._entryArray.length !== this.size) {
      const arr = new SuperArray<{ key: K, value: V }>();
      let count = 0;

      for(const entry of this) {
        arr[count++] = entry;
      }

      this._entryArray = arr;
    }
    return this._entryArray;
  }

  /**
   * Returns the first value in the map. It will return undefined if the map is empty.
   * @returns {V | undefined}
   */
  public first(): V | undefined {
    return this.values().next().value;
  }

  /**
   * Returns the first key in the map. It will return undefined if the map is empty.
   * @returns {K | undefined}
   */
  public firstKey(): K | undefined {
    return this.keys().next().value;
  }

  /**
   * Returns the first key-value pair in the map. It will return undefined if the map is empty.
   * @returns {[K, V] | undefined}
   */
  public firstEntry(): { key: K, value: V } | undefined {
    return this.entries().next().value;
  }

  /**
   * Returns the last value of the map. It will return undefined if the map is empty.
   * @returns {V | undefined}
   */
  public last(): V | undefined {
    return this.toArray().last();
  }
  
  /**
   * Returns the last key of the map. It will return undefined if the map is empty.
   * @returns {K | undefined}
   */
  public lastKey(): K | undefined {
    return this.toKeyArray().last()
  }

  /**
   * Returns the last key-value pair of the map. It will return undefined if the map is empty.
   * @returns {[K, V] | undefined}
   */
  public lastEntry(): { key: K, value: V } | undefined {
    return this.toEntryArray().last()
  }

  /**
   * Returns a random value of the map. It will return undefined if the map is empty.
   * @returns {V | undefined}
   */
  public random(): V | undefined {
    return this.toArray().random();
  }

  /**
   * Returns a random key of the map. It will return undefined if the map is empty.
   * @returns {K | undefined}
   */
  public randomKey(): K | undefined {
    return this.toKeyArray().random();
  }

  /**
   * Returns a random key-value pair of the map. It will return undefined if the map is empty.
   * @returns {[K, V] | undefined}
   */
  public randomEntry(): { key: K, value: V } | undefined {
    return this.toEntryArray().random();
  }

  /**
   * Deletes the first entry of the map and returns its value. 
   * It will return undefined if the map is empty.
   * @returns {V | undefined}
   */
  public shift(): V | undefined {
    return this.extract(this.firstKey()).value;
  }

  /**
   * Deletes the first entry of the map and returns its key. 
   * It will return undefined if the map is empty.
   * @returns {K | undefined}
   */
  public shiftKey(): K | undefined {
    return this.extract(this.firstKey()).key;
  }

  /**
   * Deletes the first entry of the map and returns its key-value pair. 
   * It will return undefined if the map is empty.
   * @returns {[K, V] | undefined}
   */
  public shiftEntry(): { key: K, value: V } | undefined {
    return this.extract(this.firstKey());
  }

  /**
   * Deletes the last entry of the map and returns its value. 
   * It will return undefined if the map is empty.
   * @returns {V | undefined}
   */
  public pop(): V | undefined {
    return this.extract(this.lastKey()).value;
  }

  /**
   * Deletes the last entry of the map and returns its key. 
   * It will return undefined if the map is empty.
   * @returns {K | undefined}
   */
  public popKey(): K | undefined {
    return this.extract(this.lastKey()).key;
  }

  /**
   * Deletes the last entry of the map and returns its key-value pair. 
   * It will return undefined if the map is empty.
   * @returns {[K, V] | undefined}
   */
  public popEntry(): { key: K, value: V } | undefined {
    return this.extract(this.lastKey());
  }

  /**
   * Identical to [Array.concat()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat).
   * It also works with a tuple with the length of 2 as long as it matches the type parameters of
   * K and V (key and value).
   * @param {...Array<Map<K, V> | SuperMap<K, V> | [K, V]>} values 
   * @returns {SuperMap<K, V>}
   */
  public concat(...maps: Array<Map<K, V> | SuperMap<K, V> | MultiMap<K, V> | MultiSuperMap<K, V> | Array<[K, V]>>): MultiSuperMap<K, V> {
    const newMap = new MultiSuperMap<K, V>();

    for(const map of maps) {
      for(const entry of map) {
        if(Array.isArray(entry)) {
          newMap.insert(...entry);
        } else {
          const { key, value } = entry; 
          newMap.insert(key, value);
        }
      }
    }

    return newMap;
  }

  /**
   * Identical to [Array.every()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every)
   * @param {(value: V, key: K) => boolean} fn
   * @returns {boolean} 
   */
  public every(fn: (value: V, key: K) => boolean): boolean;
  /**
   * Identical to [Array.every()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every)
   * @param {(value: V, key: K, map: this) => boolean} fn
   * @returns {boolean} 
   */
  public every(fn: (value: V, key: K, map: this) => boolean): boolean;
  /**
   * Identical to [Array.every()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every)
   * @param {(value: V, key?: K, map?: this) => boolean} fn
   * @param {?S} thisArg
   * @returns {boolean} 
   */
  public every<S>(fn: (value: V, key?: K, map?: this) => boolean, thisArg: S): boolean;
  /**
   * Identical to [Array.every()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every)
   * @param {(value: V, key?: K, map?: this) => boolean} fn
   * @param {?unknown} thisArg
   * @returns {boolean} 
   */
  public every(fn: (value: V, key?: K, map?: this) => boolean, thisArg?: unknown): boolean {
    if(typeof thisArg !== 'undefined') {
      fn = fn.bind(thisArg);
    }

    for(const { key, value } of this) {
      if(!fn(value, key, this)) {
        return false;
      }
    }

    return false;
  }

  /** 
   * Identical to [Array.filter()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) 
   * @param {(value: V, key: K) => boolean}
   * @returns {SuperMap<K, V>}
   */
  public filter(fn: (value: V, key: K) => boolean): MultiSuperMap<K, V>;
  /** 
   * Identical to [Array.filter()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) 
   * @param {(value: V, key: K, map: this) => boolean}
   * @returns {SuperMap<K, V>}
   */
  public filter(fn: (value: V, key: K, map: this) => boolean): MultiSuperMap<K, V>;
  /** 
   * Identical to [Array.filter()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) 
   * @param {fn: (value: V, key?: K, map?: this) => boolean}
   * @param {S} thisArg
   * @returns {SuperMap<K, V>}
   */
  public filter<S>(fn: (value: V, key?: K, map?: this) => boolean, thisArg: S): MultiSuperMap<K, V>;
  /** 
   * Identical to [Array.filter()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) 
   * @param {(value: V, key?: K, map?: this) => boolean}
   * @param {?unknown} thisArg
   * @returns {SuperMap<K, V>}
   */
  public filter(fn: (value: V, key?: K, map?: this) => boolean, thisArg?: unknown): MultiSuperMap<K, V> {
    const newMap = new this[Symbol.species]<K, V>()
    
    if(typeof thisArg !== 'undefined') {
      fn = fn.bind(thisArg);
    }

    for(const { key, value } of this) {
      if(fn(value, key, this)) {
        newMap.insert(key, value);
      }
    } 

    return newMap;
  }

  /**
   * Identical to [Array.some()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some)
   * @param {(value: V, key: K) => boolean} fn
   * @returns {boolean}
   */
   public some(fn: (value: V, key: K) => boolean): boolean;
   /**
    * Identical to [Array.some()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some)
    * @param {(value: V, key?: K, map?: this) => boolean} fn
    * @param {S} thisArg
    * @returns {boolean}
    */
   public some<S>(fn: (value: V, key?: K, map?: this) => boolean, thisArg: S): boolean;
   /**
    * Identical to [Array.some()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some)
    * @param {(value: V, key?: K, map?: this) => boolean} fn
    * @param {?unknown} thisARg
    * @returns {boolean}
    */
   public some(fn: (value: V, key?: K, map?: this) => boolean, thisArg?: unknown): boolean {
     if(typeof thisArg !== 'undefined') {
       fn = fn.bind(thisArg);
     }
 
     for(const { key, value } of this) {
       if(fn(value, key, this)) {
         return true;
       }
     }
 
     return false;
   }

   /**
   * Identical to [Array.reduce()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce)
   * @param {(accumulator: S, value: V, key?: K, map?: this) => S} fn 
   * @param {?S} initialValue 
   * @returns {S}
   */
  public reduce<S>(fn: (accumualtor: S, value: V, key?: K, map?: this) => S, initialValue?: S): S {
    let accumulator!: S;

    if(typeof initialValue !== 'undefined') {
      accumulator = initialValue;
      
      for(const { key, value } of this) {
        accumulator = fn(accumulator, value, key, this);
      }

      return accumulator;
    }

    let first = true;

    for(const { key, value } of this) {
      if(first) {
        accumulator = (value as unknown) as S;
        first = false;
        
        continue;
      }

      accumulator = fn(accumulator, value, key, this);
    }

    if(first) {
      throw new TypeError('Reduce of empty MultiSuperMap with no initial value');
    }

    return accumulator;
  }

  /**
   * Internal use only. Nullifies the cache-arrays.
   * @returns {void}
   */
  private nullifyCacheArrays(): void {
    this._array = null;
    this._keyArray = null;
    this._entryArray = null;
  }
}
