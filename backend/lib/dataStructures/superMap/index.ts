import { SuperArray } from "../superArray";
import { inspect, InspectOptionsStylized } from 'util';

/**
 * Simple class exntension of `Map` with extra methods. 
 * @exports
 * @class
 * @extends [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)
 */
export class SuperMap<K, V> extends Map<K, V> {
  /**
   * Cache array to hold the values of the map. This gets set to `null` as soon as
   * `set()` or `delete()` gets called
   * @private
   * @type {SuperArray<V>}
   */
  private _array: SuperArray<V>;
  /**
   * Cache array to hold the keys of the map. This gets set to `null` as soon as
   * `set()` or `delete()` gets called
   * @private
   * @type {SuperArray<V>}
   */
  private _keyArray: SuperArray<K>;
  /**
   * Cache array to hold the key-value pairs of the map. This gets set to `null` as soon as
   * `set()` or `delete()` gets called
   * @private
   * @type {SuperArray<V>}
   */
  private _entryArray: SuperArray<[K, V]>;

  /**
   * @public
   * @constructor
   * @param {readonly (readonly [K, V])[] | Iterable<readonly [K, V]>} entries 
   */
  public constructor(entries?: readonly (readonly [K, V])[] | Iterable<readonly [K, V]>) {
    super(entries);
  }

  public [inspect.custom](depth: number, options: InspectOptionsStylized) {
    let str = `SuperMap(${this.size}) {\n`;
    let counter = 0;

    for(const [key, value] of this.entries()) {
      str += `  ${inspect(key, options)} => ${inspect(value, options)}${counter < this.size - 1 ? ',' : ''}\n`
      counter++;
    }

    str += '}';

    return str
  }

  /**
   * Identical to [Map.set()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/set)
   * other than setting the cache-arrays to null
   * @public
   * @method
   * @param {K} key 
   * @param {V} value 
   * @returns {this}
   */
  public set(key: K, value: V): this {
    this.nullifyCacheArrays();
    return super.set(key, value);
  }

  /**
   * Identical to [Map.delete()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/set)
   * other than setting the cache-arrays to null
   * @public
   * @method
   * @param {K} key 
   * @returns {boolean}
   */
  public delete(key: K): boolean {
    this.nullifyCacheArrays();
    return super.delete(key);
  }

  /**
   * Returns the first value in the map. It will return undefined if the map is empty.
   * @public
   * @method
   * @returns {V | undefined}
   */
  public first(): V | undefined {
    return this.values().next().value;
  }

  /**
   * Returns the first key in the map. It will return undefined if the map is empty.
   * @public
   * @method
   * @returns {K | undefined}
   */
  public firstKey(): K | undefined {
    return this.keys().next().value;
  }

  /**
   * Returns the first key-value pair in the map. It will return undefined if the map is empty.
   * @public
   * @method
   * @returns {[K, V] | undefined}
   */
  public firstEntry(): [K, V] | undefined {
    return this.entries().next().value;
  }

  /**
   * Returns a new [SuperArray](../../../docs/dataStructures/superArray.md)
   * containing the values of the map.
   * @public
   * @method
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
   * Returns a new [SuperArray](../../../docs/dataStructures/superArray.md)
   * containing the keys of the map.
   * @public
   * @method
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
   * Returns a new [SuperArray](../../../docs/dataStructures/superArray.md)
   * containing the key-value pairs of the map.
   * @public
   * @method
   * @returns {SuperArray<[K, V]>}
   */
  public toEntryArray(): SuperArray<[K, V]> {
    if(!this._entryArray || this._entryArray.length !== this.size) {
      const arr = new SuperArray<[K, V]>();;
      let count = 0;

      for(const entry of this.entries()) {
        arr[count++] = entry;
      }

      this._entryArray = arr;
    }

    return this._entryArray;
  }

  /**
   * Returns the last value of the map. It will return undefined if the map is empty.
   * @public
   * @method
   * @returns {V | undefined}
   */
  public last(): V | undefined {
    return this.toArray().last();
  }

  /**
   * Returns the last key of the map. It will return undefined if the map is empty.
   * @public
   * @method
   * @returns {K | undefined}
   */
  public lastKey(): K | undefined {
    return this.toKeyArray().last()
  }

  /**
   * Returns the last key-value pair of the map. It will return undefined if the map is empty.
   * @public
   * @method
   * @returns {[K, V] | undefined}
   */
  public lastEntry(): [K, V] | undefined {
    return this.toEntryArray().last()
  }

  /**
   * Returns a random value of the map. It will return undefined if the map is empty.
   * @public
   * @method
   * @returns {V | undefined}
   */
  public random(): V | undefined {
    return this.toArray().random();
  }

  /**
   * Returns a random key of the map. It will return undefined if the map is empty.
   * @public
   * @method
   * @returns {K | undefined}
   */
  public randomKey(): K | undefined {
    return this.toKeyArray().random();
  }

  /**
   * Returns a random key-value pair of the map. It will return undefined if the map is empty.
   * @public
   * @method
   * @returns {[K, V] | undefined}
   */
  public randomEntry(): [K, V] | undefined {
    return this.toEntryArray().random();
  }

  /**
   * Deletes the first entry of the map and returns its value. 
   * It will return undefined if the map is empty.
   * @public
   * @method
   * @returns {V | undefined}
   */
  public shift(): V | undefined {
    const key = this.firstKey();
    const value = super.get(key);
    this.delete(key);

    return value;
  }

  /**
   * Deletes the first entry of the map and returns its key. 
   * It will return undefined if the map is empty.
   * @public
   * @method
   * @returns {K | undefined}
   */
  public shiftKey(): K | undefined {
    const key = this.firstKey();
    this.delete(key);

    return key;
  }

  /**
   * Deletes the first entry of the map and returns its key-value pair. 
   * It will return undefined if the map is empty.
   * @public
   * @method
   * @returns {[K, V] | undefined}
   */
  public shiftEntry(): [K, V] | undefined {
    const entry = this.firstEntry();
    this.delete(entry[0]);

    return entry;
  }

  /**
   * Deletes the last entry of the map and returns its value. 
   * It will return undefined if the map is empty.
   * @public
   * @method
   * @returns {V | undefined}
   */
  public pop(): V | undefined {
    const key = this.lastKey();
    const value = super.get(key);
    
    this.delete(key);

    return value;
  }

  /**
   * Deletes the last entry of the map and returns its key. 
   * It will return undefined if the map is empty.
   * @public
   * @method
   * @returns {K | undefined}
   */
  public popKey(): K | undefined {
    const key = this.lastKey();
    this.delete(key);

    return key;
  }

  /**
   * Deletes the last entry of the map and returns its key-value pair. 
   * It will return undefined if the map is empty.
   * @public
   * @method
   * @returns {[K, V] | undefined}
   */
  public popEntry(): [K, V] | undefined {
    const entry = this.lastEntry();
    this.delete(entry[0]);

    return entry;
  }

  /**
   * Identical to [Array.concat()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat).
   * It also works with a tuple with the length of 2 as long as it matches the type parameters of
   * K and V (key and value).
   * @param {...Array<Map<K, V> | SuperMap<K, V> | [K, V]>} values 
   * @returns {SuperMap<K, V>}
   */
  public concat(...values: Array<Map<K, V> | SuperMap<K, V> | [K, V]>): SuperMap<K, V> {
    const newMap = new SuperMap<K, V>(this.entries())

    for(const value of values) {
      // Works with SuperMap and Map as SuperMap is an instance of Map
      if(value instanceof Map) {
        for(const [key, val] of value.entries()) {
          newMap.set(key, val);
        }
      } else {
        // value is of type key-value tuple ( [K, V] )
        newMap.set(value[0], value[1]);
      }
    }

    return newMap;
  }

  /**
   * Identical to [Array.every()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every)
   * @public
   * @method
   * @param {(value: V, key: K) => boolean} fn
   * @returns {boolean} 
   */
  public every(fn: (value: V, key: K) => boolean): boolean;
  /**
   * Identical to [Array.every()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every)
   * @public
   * @method
   * @param {(value: V, key: K, map: this) => boolean} fn
   * @returns {boolean} 
   */
  public every(fn: (value: V, key: K, map: this) => boolean): boolean;
  /**
   * Identical to [Array.every()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every)
   * @public
   * @method
   * @param {(value: V, key?: K, map?: this) => boolean} fn
   * @param {?S} thisArg
   * @returns {boolean} 
   */
  public every<S>(fn: (value: V, key?: K, map?: this) => boolean, thisArg: S): boolean;
  /**
   * Identical to [Array.every()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every)
   * @public
   * @method
   * @param {(value: V, key?: K, map?: this) => boolean} fn
   * @param {?unknown} thisArg
   * @returns {boolean} 
   */
  public every(fn: (value: V, key?: K, map?: this) => boolean, thisArg?: unknown): boolean {
    if(typeof thisArg !== 'undefined') {
      fn = fn.bind(thisArg);
    }

    for(const [k, v] of this.entries()) {
      if(!fn(v, k, this)) {
        return false;
      }
    }

    return true;
  }

  /** 
   * Identical to [Array.filter()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) 
   * @public
   * @method
   * @param {(value: V, key: K) => boolean}
   * @returns {SuperMap<K, V>}
   */
  public filter(fn: (value: V, key: K) => boolean): SuperMap<K, V>;
  /** 
   * Identical to [Array.filter()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) 
   * @public
   * @method
   * @param {(value: V, key: K, map: this) => boolean}
   * @returns {SuperMap<K, V>}
   */
  public filter(fn: (value: V, key: K, map: this) => boolean): SuperMap<K, V>;
  /** 
   * Identical to [Array.filter()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) 
   * @public
   * @method
   * @param {fn: (value: V, key?: K, map?: this) => boolean}
   * @param {S} thisArg
   * @returns {SuperMap<K, V>}
   */
  public filter<S>(fn: (value: V, key?: K, map?: this) => boolean, thisArg: S): SuperMap<K, V>;
  /** 
   * Identical to [Array.filter()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) 
   * @public
   * @method
   * @param {(value: V, key?: K, map?: this) => boolean}
   * @param {?unknown} thisArg
   * @returns {SuperMap<K, V>}
   */
  public filter(fn: (value: V, key?: K, map?: this) => boolean, thisArg?: unknown): SuperMap<K, V> {
    const newMap = new SuperMap<K, V>()
    
    if(typeof thisArg !== 'undefined') {
      fn = fn.bind(thisArg);
    }

    for(const [k, v] of this.entries()) {
      if(fn(v, k, this)) {
        newMap.set(k, v);
      }
    } 

    return newMap;
  }

  /**
   * Identical to [Array.find()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find)
   * @public
   * @method
   * @param {(value: V, key: K) => boolean} fn
   * @returns {V | undefined} 
   */
  public find(fn: (value: V, key: K) => boolean): V | undefined;
  /**
   * Identical to [Array.find()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find)
   * @public
   * @method
   * @param {(value: V, key: K, map: this) => boolean} fn
   * @returns {V | undefined} 
   */
  public find(fn: (value: V, key: K, map: this) => boolean): V | undefined;
  /**
   * Identical to [Array.find()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find)
   * @public
   * @method
   * @param {(value: V, key?: K, map?: this) => boolean} fn
   * @param {S} thisArg
   * @returns {V | undefined} 
   */
  public find<S>(fn: (value: V, key?: K, map?: this) => boolean, thisArg: S): V | undefined;
  /**
   * Identical to [Array.find()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find)
   * @public
   * @method
   * @param {(value: V, key?: K, map?: this) => boolean} fn
   * @param {?unknown} thisArg
   * @returns {V | undefined} 
   */
  public find(fn: (value: V, key?: K, map?: this) => boolean, thisArg?: unknown): V | undefined {
    if(typeof thisArg !== 'undefined') {
      fn = fn.bind(thisArg);
    }

    for(const [k, v] of this.entries()) {
      if(fn(v, k, this)) {
        return v;
      }
    }
  }

  /**
   * Identical to [Array.find()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find)
   * @public
   * @method
   * @param {(value: V, key: K) => boolean} fn
   * @returns {V | undefined} 
   */
  public findKey(fn: (value: V, key: K) => boolean): K | undefined;
  /**
   * Identical to [Array.find()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find)
   * @public
   * @method
   * @param {(value: V, key: K, map: this) => boolean} fn
   * @returns {K | undefined} 
   */
  public findKey(fn: (value: V, key: K, map: this) => boolean): K | undefined;
  /**
   * Identical to [Array.find()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find)
   * @public
   * @method
   * @param {(value: V, key?: K, map?: this) => boolean} fn
   * @param {S} thisArg
   * @returns {K | undefined} 
   */
  public findKey<S>(fn: (value: V, key?: K, map?: this) => boolean, thisArg: S): K | undefined;
  /**
   * Identical to [Array.find()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find)
   * @public
   * @method
   * @param {(value: V, key?: K, map?: this) => boolean} fn
   * @param {?unknown} thisArg
   * @returns {K | undefined} 
   */
  public findKey(fn: (value: V, key?: K, map?: this) => boolean, thisArg?: unknown): K | undefined {
    if(typeof thisArg !== 'undefined') {
      fn = fn.bind(thisArg);
    }

    for(const [k, v] of this.entries()) {
      if(fn(v, k, this)) {
        return k;
      }
    }
  }


  /**
   * Identical to [Array.find()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find)
   * @public
   * @method
   * @param {(value: V, key: K) => boolean} fn
   * @returns {[K, V] | undefined} 
   */
  public findEntry(fn: (value: V, key: K) => boolean): [K, V] | undefined;
  /**
   * Identical to [Array.find()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find)
   * @public
   * @method
   * @param {(value: V, key: K, map: this) => boolean} fn
   * @returns {[K, V] | undefined} 
   */
  public findEntry(fn: (value: V, key: K, map: this) => boolean): [K, V] | undefined;
  /**
   * Identical to [Array.find()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find)
   * @public
   * @method
   * @param {(value: V, key?: K, map?: this) => boolean} fn
   * @param {S} thisArg
   * @returns {[K, V] | undefined} 
   */
  public findEntry<S>(fn: (value: V, key?: K, map?: this) => boolean, thisArg: S): [K, V] | undefined;
  /**
   * Identical to [Array.find()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find)
   * @public
   * @method
   * @param {(value: V, key?: K, map?: this) => boolean} fn
   * @param {?unknown} thisArg
   * @returns {[K, V] | undefined} 
   */
  public findEntry(fn: (value: V, key?: K, map?: this) => boolean, thisArg?: unknown): [K, V] | undefined {
    if(typeof thisArg !== 'undefined') {
      fn = fn.bind(thisArg);
    }

    for(const [k, v] of this.entries()) {
      if(fn(v, k, this)) {
        return [k, v];
      }
    }
  }
  /**
   * Identical to [Array.some()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some)
   * @public
   * @method
   * @param {(value: V, key: K) => boolean} fn
   * @returns {boolean}
   */
  public some(fn: (value: V, key: K) => boolean): boolean;
  /**
   * Identical to [Array.some()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some)
   * @public
   * @method
   * @param {(value: V, key?: K, map?: this) => boolean} fn
   * @param {S} thisArg
   * @returns {boolean}
   */
  public some<S>(fn: (value: V, key?: K, map?: this) => boolean, thisArg: S): boolean;
  /**
   * Identical to [Array.some()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some)
   * @public
   * @method
   * @param {(value: V, key?: K, map?: this) => boolean} fn
   * @param {?unknown} thisARg
   * @returns {boolean}
   */
  public some(fn: (value: V, key?: K, map?: this) => boolean, thisArg?: unknown): boolean {
    if(typeof thisArg !== 'undefined') {
      fn = fn.bind(thisArg);
    }

    for(const [key, value] of this.entries()) {
      if(fn(value, key, this)) {
        return true;
      }
    }

    return false;
  }

  /**
   * Identical to [Array.reduce()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce)
   * @public
   * @method
   * @param {(accumulator: S, value: V, key?: K, map?: this) => S} fn 
   * @param {?S} initialValue 
   * @returns {S}
   */
  public reduce<S>(fn: (accumualtor: S, value: V, key?: K, map?: this) => S, initialValue?: S): S {
    let accumulator!: S;

    if(typeof initialValue !== 'undefined') {
      accumulator = initialValue;
      
      for(const [key, value] of this.entries()) {
        accumulator = fn(accumulator, value, key, this);
      }

      return accumulator;
    }

    let first = true;

    for(const [key, value] of this.entries()) {
      if(first) {
        accumulator = (value as unknown) as S;
        first = false;
        
        continue;
      }

      accumulator = fn(accumulator, value, key, this);
    }

    if(first) {
      throw new TypeError('Reduce of empty SuperMap with no initial value');
    }

    return accumulator;
  }

  /**
   * Internal use only. Nullifies the cache-arrays.
   * @private
   * @method
   * @returns {void}
   */
  private nullifyCacheArrays(): void {
    this._array = null;
    this._keyArray = null;
    this._entryArray = null;
  }
}
