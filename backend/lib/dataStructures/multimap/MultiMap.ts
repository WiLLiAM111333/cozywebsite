import { inspect, InspectOptionsStylized } from 'util';

/**
 * TS implementation of the C++ data structure `MultiMap`.
 */
export class MultiMap<K, V> {
  /**
   * Internal array to hold the `MultiMap`'s values.
   */
  private items: Array<{ key: K, value: V }>;
  /**
   * The size of the MultiMap (the amount of key-value pairs assigned to it).
   * @public
   */
  public size: number;

  public get [Symbol.species](): typeof MultiMap {
    return MultiMap;
  }

  public get [Symbol.toStringTag](): string {
    return 'MultiMap';
  }

  public get [Symbol.isConcatSpreadable](): boolean {
    return true;
  }

  public [inspect.custom](depth: number, options: InspectOptionsStylized): string {
    if(this.size === 0) {
      return 'MultiMap(0) {  }'
    }

    let str = `MultiMap(${this.size}) {\n`;
    let counter = 0;

    for(const { key, value } of this) {
      str += `  ${inspect(key, options)} => ${inspect(value, options)}${counter < this.size - 1 ? ',' : ''}\n`
      counter++;
    }

    str += '}';

    return str
  }

  /**
   * The iterator to allow us to use for-of on the `MultiMap`.
   * ```
   * const map = new MultiMap([ ['1', 2], ['3', 4] ]);
   * 
   * for(const { key, value } of map) {
   *   console.log(key, value) // '1', 2 -> '3', 4
   * }
   * ```
   * @returns {IterableIterator<{ key: K, value: V }>}
   */
  public *[Symbol.iterator](): IterableIterator<{ key: K, value: V }> {
    for(let i = 0; i < this.items.length; i++) {
      yield this.items[i];
    }
  }

  /**
   * An iterator to get the values from the `MultiMap`.
   * @returns {IterableIterator<V>}
   */
  public *values(): IterableIterator<V> {
    for(const { key, value } of this) {
      yield value;
    }
  }

  /**
   * An iterator to get the keys from the `MultiMap`.
   * @returns {IterableIterator<K>}
   */
  public *keys(): IterableIterator<K> {
    for(const { key } of this) {
      yield key;
    }
  }

  /**
   * An iterator to get the key-value pairs from the `MultiMap`.
   * @returns {IterableIterator<{ key: K, value: V }>}
   */
  public *entries(): IterableIterator<{ key: K, value: V }> {
    for(const entry of this) {
      yield entry;
    }
  }

  /**
   * Checks if the `MultiMap` is empty.
   * @returns {Readonly<boolean>}
   */
  public get isEmpty(): Readonly<boolean> {
    return this.size < 1;
  }

  /**
   * @param {ReadonlyArray<KeyValueTuple<K, V>>} items 
   */
  public constructor(items?: ReadonlyArray<KeyValueTuple<K, V>>) {
    this.items = [];

    if(items) {
      for(let i = 0; i < items.length; i++) {
        const [ key, value ] = items[i];
        this.items[i] = { key, value };
      }
    }

    this.size = this.items.length;
  }

  /**
   * Clears the `MultiMap` of all entries.
   * @returns {void}
   */
  public clear(): void {
    this.items = [];
    this.size = 0;
  }

  /**
   * Inserts an item in the `MultiMap`.
   * @param {K} key 
   * @param {V} value 
   * @returns {void}
   */
  public insert(key: K, value: V): void {
    this.items[this.size++] = { key, value };
  }

  /**
   * Erases one or more values by a range of numbers, key or a flat number.
   * @param {[number, number]} query 
   * @returns {number}
   */
  public erase(query: [number, number]): number;
  /**
   * Erases one or more values by a range of numbers, key or a flat number.
   * @param {number} query 
   * @returns {number}
   */
  public erase(query: number): number;
  /**
   * Erases one or more values by a range of numbers, key or a flat number.
   * @param {K} query 
   * @returns {number}
   */
  public erase(query: K): number;
  /**
   * Erases one or more values by a range of numbers, key or a flat number.
   * @param {[number, number] | number} query 
   * @returns {number}
   */
  public erase(query: [number, number] | number | K): number;
  /**
   * Erases one or more values by a range of numbers, key or a flat number.
   * @param {[number, number] | number | K} query 
   * @returns {number}
   */
  public erase(query: [number, number] | number | K): number {
    let removed = 0;
    const keyType = typeof (this.keys().next().value as K);

    if(Array.isArray(query)) {
      const [ start, end ] = query;
      this.items.splice(start, end);

      removed += (end - start);
    } else if(typeof query === 'number' && keyType !== 'number') {
      this.items = this.items.filter((_, index) => {
        return query !== index;
      });

      removed++;       
    } else {
      this.items = this.items.filter(entry => {
        if(entry.key !== query) {
          return true;
        }

        removed++; 
        return false;
      });
    }

    this.size -= removed;

    return removed;
  }

  /**
   * Swaps the entries across 2 `MultiMap`
   * @param {MultiMap<K, V>} otherMM - Another `MultiMap` of the same key-value type 
   * @returns {void}
   */
  public swap(otherMM: MultiMap<K, V>): void {
    let index = 0;

    if(otherMM.isEmpty || this.isEmpty) {
      throw new RangeError('Can not swap MultiMap with an empty container');
    }
    
    const otherEntries = otherMM.entries();
    let first = true;
    
    for(const { key, value } of this) {
      const { key: otherKey, value: otherValue } = otherEntries.next().value as { key: K, value: V };

      if(first) {     
        if(typeof key !== typeof otherKey || typeof value !== typeof otherValue) {
          throw new TypeError('Can not swap MultiMap across incompatible key-value types');
        } 

        first = false;
      }

      this.items[index] = { key: otherKey, value: otherValue };
      otherMM.items[index++] = { key, value };
    }
  }

  /**
   * Extracts an entry from the `MultiMap`
   * @param {K} iKey
   * @returns {{ key: K, value: V }}
   */
  public extract(iKey: K): { key: K, value: V } | undefined {
    for(let i = 0; i < this.items.length; i++) {
      if(this.items[i]) {
        const { key } = this.items[i];
  
        if(iKey === key) {
          this.size--;
          return this.items.splice(i, 1)[0];
        }
      }
    }

    return undefined
  }

  /**
   * Merges 2 `MultiMap`s by adding every entry from the provided map to the map calling `merge()`.
   * @param {MultiMap<K, V>} otherMM 
   * @returns {void}
   */
  public merge(otherMM: MultiMap<K, V>): void {
    for(const { key, value } of otherMM) { 
      this.insert(key, value);
    }
  }

  /**
   * Counts the amount of keys matching the provided key.
   * @param {K} iKey 
   * @returns {number}
   */
  public count(iKey: K): number {
    let counter = 0;

    for(const { key } of this) {
      if(key === iKey) {
        counter++;
      }
    }

    return counter;
  }

  /**
   * Finds the first entry with the key matching the provided key.
   * @param {K} iKey 
   * @returns {{ key: K, value: V }}
   */
  public find(iKey: K): { key: K, value: V } | undefined {
    for(const { key, value } of this) {
      if(iKey === key) {
        return { key, value };
      }
    } 
    
    return undefined;
  }

  /**
   * Checks if the provided key has an entry in the `MultiMap`
   * @param {K} iKey 
   * @returns {boolean}
   */
  public contains(iKey: K): boolean {
    return this.items.some(({ key }) => key === iKey);
  }
}
