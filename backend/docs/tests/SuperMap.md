# SuperMap Unit Test Documentation

## Table of contents

* **Array Methods**
  - [toArray()](#toArray) 
  - [toKeyArray()](#toKeyArray)
  - [toEntryArray()](#toEntryArray)
* **First Methods**
  - [first()](#first)
  - [firstKey()](#firstKey)
  - [firstEntry()](#firstEntry)
* **Last Methods**
  - [last()](#last)
  - [lastKey()](#lastKey)
  - [lastEntry()](#lastEntry)
* **Shift Methods**
  - [shift()](#shift)
  - [shiftKey()](#shiftKey)
  - [shiftEntry()](#shiftEntry)
* **Pop Methods**
  - [pop()](#pop)
  - [popKey()](#popKey)
  - [popEntry()](#popEntry)
* **Constructor**
  - [Key-Value Tuples](#Key-Value-Tuples)
  - [Map](#Map)
  - [SuperMap](#SuperMap)
* **[concat()](#Concat)**
  
## Array methods

The array methods are tested to ensure that everything is indexed to the array in the `SuperMap`'s placement order. It tests `toArray()`, `toKeyArray()` and `toEntryArray()`. 

### **Root of the test in the top-level scope of the describe function**

First in the test suite it creates a new `SuperMap` as `map` and places the entries where the first index is the key and the second is the value using `set(key, value): this`:

```js
const map = new SuperMap()

map.set('1', 2);
map.set('3', 4);
map.set('5', 6);
```

---

### **toArray**

It initalizes a variable called `arr = map.toArray()` which is now expected to be an array of values in the `SuperMap` in placement order of the map which would be `[2, 4, 6]`. It then passes if `arr` is indeed `[2, 4, 6]` and `arr.length` is equal to `map.size`.

Test with comments line by line:

```js
it('Should return an array of values in the SuperMap using toArray()', done => {  
  const arr = map.toArray(); // Initializes new array including the values of the map in placement order [2, 4, 6]
  
  expect(arr.length).toEqual(map.size); // Checks if the array has done any funky behaviour and caused bugs
  expect(arr).toEqual([2, 4, 6]); // Checks if the array is in placement order

  done();
});
```

### **toKeyArray**

It initalizes a variable called `arr = map.toKeyArray()` which is now expected to be an array of keys in the `SuperMap` in placement order of the map which would be `['1', '3', '5']`. It then passes if `arr` is indeed `['1', '3', '5']` and `arr.length` is equal to `map.size`.

Test with comments line by line:

```js
it('Should return an array of keys in the SuperMap using toKeyArray()', done => {
  const arr = map.toKeyArray(); // Initializes new array including the values of the map in placement order ['1', '3', '5']

  expect(arr.length).toEqual(map.size); // Checks if the array has done any funky behaviour and caused bugs
  expect(arr).toEqual(['1', '3', '5']); // Checks if the array is in placement order
  
  done();
});
```

### **toEntryArray**

It initalizes a variable called `arr = map.toEntryArray()` which is now expected to be an array of tuples by the length of 2 with the type of `[K, V]` with **K** being the type of the `key` in the map and **V** being in the type of the `value` in the map. These are put in placement order of the map which would be `[ ['1', 2], ['3', 4], ['5', 6] ]`. It then passes if `arr` is indeed `[ ['1', 2], ['3', 4], ['5', 6] ]` and `arr.length` is equal to `map.size`.

Test with comments line by line:

```js
it('Should return an array-nested tuple of entries in the SuperMap using toEntryArray()', done => {
  const arr = map.toEntryArray(); // Initializes new array including the entry tuples of the map in placement order [ ['1', 2], ['3', 4], ['5', 6] ]

  expect(arr.length).toEqual(map.size); // Checks if the array has done any funky behaviour and caused bugs
  expect(arr).toEqual([ ['1', 2], ['3', 4], ['5', 6] ]); // Checks if the array is in placement order
  
  done();
});
```

---

## First methods

The first methods consist of `first()`, `firstKey()` and `firstEntry()`. These methods return the first value in the `SuperMap` in placement order.

The test suite starts out by initializing a new `SuperMap` as `map` and adding 3 values to it in the top-level scope of the jest `describe` function:

```js
const map = new SuperMap()
  
map.set('1', 2);
map.set('3', 4);
map.set('5', 6);
```

### **first**

The test passes if `map.first()` is the first value in the `SuperMap` in placement order.

Test:

```js
it('Should return the first value in the SuperMap using first()', done => {  
  expect(map.first()).toEqual(2); // The most simple of tests can sometimes be the best ones :)

  done();
});
```

### **firstKey**

The test passes if `map.firstKey()` is the first key in the `SuperMap` in placement order.

Test:

```js
it('Should return the first key in the SuperMap using firstKey()', done => {  
  expect(map.firstKey()).toEqual('1'); // The most simple of tests can sometimes be the best ones :)

  done();
});
```

### **firstEntry**

The test passes if the `map.firstEntry()` tuple is equal to the first key-value tuple in the `SuperMap` in placement order.

Test:

```js
it('Should return the first entry in the SuperMap using firstEntry()', done => {
  expect(map.firstEntry()).toEqual(['1', 2]); // The most simple of tests can sometimes be the best ones :)
  
  done();
});
```

---

## Last methods

The last methods consist of `last()`, `lastKey()` and `lastEntry()`. These methods return the last value, key or entry in the `SuperMap` in placement order.

The test suite starts of by initializing a new `SuperMap` as `map` and adding 3 entries to it:

```js
const map = new SuperMap()

map.set('1', 2);
map.set('3', 4);
map.set('5', 6);
```

### **last**

The test passses if `map.last()` is the last value in the `SuperMap` in placement order.

Test:

```js
it('Should return the last value in the SuperMap using last()', done => {  
  expect(map.last()).toEqual(6); // Simple tests for simple operations

  done();
});
```

### **lastKey**

The test passses if `map.lastKey()` is the last key in the `SuperMap` in placement order.

Test:

```js
it('Should return the last key in the SuperMap using lastKey()', done => {  
  expect(map.lastKey()).toEqual('5'); // Simple tests for simple operations

  done();
});
```
### **lastEntry**

The test passses if `map.lastEntry()` is the last key-value tuple in the `SuperMap` in placement order.

Test:

```js
it('Should return the last entry in the SuperMap using lastEntry()', done => {  
  expect(map.lastEntry()).toEqual(['5', 6]); // Simple tests for simple operations

  done();
});
```

---

## Shift methods

The shift methods are identical to [Array.prototype.shift()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/shift) except it can return a key, value or entry tuple. These methods are mainly used when we want to use the first value in the map only once as it gets deleted. I test the return value aswell as the first expected value with `first()`, `firstKey()` and `firstEntry()` aswell as the map size afterwards. This is to control that it does indeed return the FIRST expected value and then deletes it from the map.

The test suite starts off by initializing a `SuperMap` as `map` and sets the following values:

```js
const map = new SuperMap()

map.set('1', 2);
map.set('3', 4);
map.set('5', 6);
```

*The same map is used for all 3 tests so it gets reduced an index every time the next jest `it` function runs.*

### **shift**

The test passes if `map.shift()` is equal to `2`, `map.first()` is equal to `4` and `map.size` is equal to `2`. Explanation through comments in the test:

```js
it('Should return the first value in the SuperMap and delete the entry using shift()', done => {  
  expect(map.shift()).toEqual(2); // Returns the first value in the map and removes that entry.
  expect(map.first()).toEqual(4); // The first value is now 4.
  expect(map.size).toEqual(2); // And since size was 3 originally, it is now 2 as one entry was removed.

  done();
});
```

### **shiftKey**

The test passes if `map.shiftKey()` is equal to `'3'`, `map.firstKey()` is equal to `'5'` and `map.size` is equal to `1`. Explanation through comments in the test:

```js
it('Should return the first key in the SuperMap and delete the entry using shift()', done => {  
  expect(map.shiftKey()).toEqual('3'); // Returns the first key in the map and removes that entry.
  expect(map.firstKey()).toEqual('5'); // The first key is now '5'.
  expect(map.size).toEqual(1); // And since size was 3 originally, it is now 1 as two entries were removed.

  done();
});
```

### **shiftEntry**

The test passes if `map.shiftEntry()` is equal to `['5', 6]`, `map.firstEntry()` is equal to `undefined` and `map.size` is equal to `0`. Explanation through comments in the test:

```js
it('Should return the first entry in the SuperMap and delete the entry using shift()', done => {  
  expect(map.shiftEntry()).toEqual(['5', 6]); // Returns the first entry in the map and removes it.
  expect(map.firstEntry()).toEqual(undefined); // The entry key is now undefined as the only one left was removed with the other 2 shift methods calls.
  expect(map.size).toEqual(0); // And since size was 3 originally, it is now 0 as three entries were removed.

  done();
});
```

---

## Pop methods

The pop methods are identical to [Array.prototype.pop()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/pop) except they can return a key, value or entry tuple.

At the start of the test-suite it initializes a new `SuperMap` as `map` in the top-scope of the jest `describe` function aswell as adding the following values to it:

```js
const map = new SuperMap()

map.set('1', 2);
map.set('3', 4);
map.set('5', 6);
```

### **pop**

The test passes if `map.pop()` is equal to `6`, `map.last()` is equal to `4` and `map.size` is equal to `2`. Explanation through comments in the test:

```js
it('Should return the last value in the SuperMap and delete the entry using pop()', done => {  
  expect(map.pop()).toEqual(6); // Returns the last value in the map and removes that entry.
  expect(map.last()).toEqual(4); // The last value in the map is now 4 as the one after that was removed.
  expect(map.size).toEqual(2); // Since size was 3 originally, it is now 2 as one entry has been removed.

  done();
});
```

### **popKey**

The test passes if `map.popKey()` is equal to `'3'`, `map.lastKey()` is equal to `'1'` and `map.size` is equal to `1`. Explanation through comments in the test:

```js
it('Should return the last key in the SuperMap and delete the entry using pop()', done => {  
  expect(map.popKey()).toEqual('3'); // Returns the last key in the map and removes that entry.
  expect(map.lastKey()).toEqual('1'); // The last key in the map is now '1' as the one after that was removed.
  expect(map.size).toEqual(2); // Since size was 3 originally, it is now 1 as two entries have been removed.

  done();
});
```

### **popEntry**

The test passes if `map.popEntry()` is equal to `['1', 2]`, `map.lastEntry()` is equal to `undefined` and `map.size` is equal to `0`. Explanation through comments in the test:

```js
it('Should return the last entry in the SuperMap and delete the entry using pop()', done => {  
  expect(map.popEntry()).toEqual(['1', 2]); // Returns the last entry tuple in the map and removes that entry.
  expect(map.lastEntry()).toEqual(undefined); // The last entry tuple in the map is now undefined as the only one left was removed with `map.popKey()` in the last test.
  expect(map.size).toEqual(2); // Since size was 3 originally, it is now 0 as three entries have been removed.

  done();
});
```

---

## SuperMap Constructor

The SuperMap constructor is simply using `super()` and thats it. But you can use a couple other data structures to create new elements from the constructor. The test-suite starts off by initializing a new array of key-value tuples to be used 
for creating `SuperMap`s and testing:

```js
const values = [
  ['1', 2],
  ['3', 4],
  ['5', 6]
]
```
### **Key-Value-Tuples**

It creates a new `SuperMap` from the key-value tuples and checks that it indexes it in the proper placement order.

```js
it('Should instantiate a new SuperMap from an array of key-value tuples', done => {
  const map = new SuperMap(values); // Creates a new SuperMap with the array of key-value tuples

  expect(map.size).toEqual(3); // Checks that the map size is the same as the amount of key-value tuples in the array "values"
  expect(map.toEntryArray()).toEqual(values); // Checks that it got put in properly in placement order
  expect(map.toArray()).toEqual(values.map(arr => arr[1])); // Checks that it got put in properly in placement order
  expect(map.toKeyArray()).toEqual(values.map(arr => arr[0])); // Checks that it got put in properly in placement order

  done();
});
```

### **Map**

Creates a new `SuperMap` from an existing `Map` which is intantiated with the key-value tuple `values` from the top-level scope of the jest describe function.

```js
it('Should instantiate a new SuperMap from an existing Map', done => {
  const map = new Map(values); // Intantiates a new Map from the key-value tuple "values"
  const superMap = new SuperMap(map); // Instantiates a new SuperMap from the Map "map"

  expect(superMap.size).toEqual(3); // Checks that the size is valid
  expect(superMap.size).toEqual(map.size); // Checks that the size is valid

  expect(superMap.toEntryArray()).toEqual(values); // Checks that the placement order is right
  expect(superMap.toArray()).toEqual(values.map(arr => arr[1])); // Checks that the placement order is right
  expect(superMap.toKeyArray()).toEqual(values.map(arr => arr[0])); // Checks that the placement order is right

  expect(superMap.get('1')).toEqual(map.get('1')); // Checks that all key-value pairs are the same
  expect(superMap.get('3')).toEqual(map.get('3')); // Checks that all key-value pairs are the same
  expect(superMap.get('5')).toEqual(map.get('5')); // Checks that all key-value pairs are the same

  // Polyfill for Map
  expect(superMap.toArray()).toEqual([...map.values()]); // Checks the iterator's placement order
  expect(superMap.toKeyArray()).toEqual([...map.keys()]); // Checks the iterator's placement order
  expect(superMap.toEntryArray()).toEqual([...map.entries()]); // Checks the iterator's placement order

  done();
});
```

### **SuperMap**

Creates a new `SuperMap` from an existing `SuperMap` which is intantiated with the key-value tuple `values` from the top-level scope of the jest describe function.

```js
it('Should instantiate a new SuperMap from an existing SuperMap', done => {
  const map1 = new SuperMap(values); // Intantiates a new SuperMap from the key-value tuple "values"
  const map2 = new SuperMap(map1); // Instantiates a new SuperMap from the SuperMap "map1"

  expect(map2.size).toEqual(3); // Checks that the size is valid
  expect(map2.size).toEqual(map1.size); // Checks that the size is valid
  
  expect(map2.toEntryArray()).toEqual(values); // Checks that the placement order is right
  expect(map2.toArray()).toEqual(values.map(arr => arr[1])); // Checks that the placement order is right
  expect(map2.toKeyArray()).toEqual(values.map(arr => arr[0])); // Checks that the placement order is right

  expect(map2.get('1')).toEqual(map1.get('1')); // Checks that all key-value pairs are the same
  expect(map2.get('3')).toEqual(map1.get('3')); // Checks that all key-value pairs are the same
  expect(map2.get('5')).toEqual(map1.get('5')); // Checks that all key-value pairs are the same

  expect(map2.toArray()).toEqual(map1.toArray()); // Checks the iterator's placement order
  expect(map2.toKeyArray()).toEqual(map1.toKeyArray()); // Checks the iterator's placement order
  expect(map2.toEntryArray()).toEqual(map1.toEntryArray()); // Checks the iterator's placement order

  done();
})
```

## Concat 

The concat method is tested to make sure that placement order is maintained aswell as all values transferring properly.

```js

```

TODO:

* `SuperMap.every()`
* `SuperMap.filter()`
* `SuperMap.find()`
* `SuperMap.reduce()`
* `SuperMap.some()`
