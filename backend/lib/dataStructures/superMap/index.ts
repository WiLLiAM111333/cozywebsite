/*






WORK IN PROGRESS







*/

export class SuperMap<K, V> extends Map<K, V> {
  private _array: Array<V>;
  private _keyArray: Array<K>;
  private _entryArray: Array<[K, V]>;

  // Refactor to SuperMapConstructor interface with an overloaded "new" function
  public constructor(entries: readonly (readonly [K, V])[] | Iterable<readonly [K, V]>) {
    super(entries);
  }

  public first(): V | undefined {
    return this.values().next().value;
  }

  public firstKey(): K | undefined {
    return this.keys().next().value;
  }

  public firstEntry(): [K, V] | undefined {
    return this.entries().next().value;
  }

  public toArray(): Array<V> {
    if(!this._array || this._array.length !== this.size) {
      const arr = [];
      let count = 0;
  
      for(const value of this.values()) {
        arr[count] = value;
        count++;
      }

      this._array = arr;
      return this._array;
    }

    return this._array;
  }

  public toKeyArray(): Array<K> {
    if(!this._keyArray || this._keyArray.length !== this.size) {
      const arr = [];
      let count = 0;

      for(const key of this.keys()) {
        arr[count] = key;
        count++;
      }
      
      this._keyArray = arr;
      return this._keyArray;
    }

    return this._keyArray;
  }

  public toEntryArray(): Array<[K, V]> {
    if(!this._entryArray || this._entryArray.length !== this.size) {
      const arr = [];
      let count = 0;

      for(const entry of this.entries()) {
        arr[count] = entry;
        count++;
      }

      this._entryArray = arr;
      return this._entryArray;
    }

    return this._entryArray;
  }

  public last(): V | undefined {
    return this.toArray()[this.size - 1];
  }

  public lastKey(): K | undefined {
    return this.toKeyArray()[this.size - 1];
  }

  public lastEntry(): [K, V] | undefined {
    return this.toEntryArray()[this.size - 1];
  }

  public random(): V | undefined {
    return this.toArray()[Math.floor(Math.random() * this.size)];
  }

  public randomKey(): K | undefined {
    return this.toKeyArray()[Math.floor(Math.random() * this.size)];
  }

  public randomEntry(): [K, V] | undefined {
    return this.toEntryArray()[Math.floor(Math.random() * this.size)];
  }

  public shift(): V | undefined {
    const key = this.firstKey();
    const value = super.get(key);
    super.delete(key);

    return value;
  }

  public shiftKey(): K | undefined {
    const key = this.firstKey();
    super.delete(key);

    return key;
  }

  public shiftEntry(): [K, V] | undefined {
    const entry = this.firstEntry();
    super.delete(entry[0]);

    return entry;
  }

  public pop(): V | undefined {
    const key = this.lastKey();
    const value = super.get(key);
    super.delete(key);

    return value;
  }

  public popKey(): K | undefined {
    const key = this.lastKey();
    super.delete(key);

    return key;
  }

  public popEntry(): [K, V] | undefined {
    const entry = this.lastEntry();
    super.delete(entry[0]);

    return entry;
  }
}
