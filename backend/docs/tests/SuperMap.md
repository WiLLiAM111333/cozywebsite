# SuperMap Unit Test Documentation

## Table of contents

* **Array Methods**
  - [SuperMap#toArray()](#SuperMap#toArray) 
  - [SuperMap#toKeyArray()](#SuperMap#toKeyArray)
  - [SuperMap#toEntryArray()](#SuperMap#toEntryArray)
* **First Methods**
  - [first()](#SuperMap#first)
  - [firstKey()](#SuperMap#firstKey)
  - [firstEntry()](#SuperMap#firstEntry)
* **Last Methods**
  - [last()](#SuperMap#last)
  - [lastKey()](#SuperMap#lastKey)
  - [lastEntry()](#SuperMap#lastEntry)
* **Shift Methods**
  - [shift()](#SuperMap#shift)
  - [shiftKey()](#SuperMap#shiftKey)
  - [shiftEntry()](#SuperMap#shiftEntry)
* **Pop Methods**
  - [pop()](#SuperMap#pop)
  - [popKey()](#SuperMap#popKey)
  - [popEntry()](#SuperMap#popEntry)
## Array methods

The array methods are tested to ensure that everything is indexed to the array in the `SuperMap`'s placement order. It tests `SuperMap#toArray()`, `SuperMap#toKeyArray()` and `SuperMap#toEntryArray()`. 

### **Root of the test in the top-level scope of the describe function**

First in the test suite it creates a new `SuperMap` as `map` and places the entries where the first index is the key and the second is the value using `SuperMap#set(key, value): this`:
```js
const map = new SuperMap()

map.set('1', 2);
map.set('3', 4);
map.set('5', 6);
```

---

### **SuperMap#toArray**

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

### **SuperMap#toKeyArray**

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

### **SuperMap#toEntryArray**

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

### **SuperMap#first**

The test passes if `map.first()` is the first value in the `SuperMap` in placement order.

Test:

```js
it('Should return the first value in the SuperMap using first()', done => {  
  expect(map.first()).toEqual(2); // The most simple of tests can sometimes be the best ones :)

  done();
});
```

### **SuperMap#firstKey**

The test passes if `map.firstKey()` is the first key in the `SuperMap` in placement order.

Test:

```js
it('Should return the first key in the SuperMap using firstKey()', done => {  
  expect(map.firstKey()).toEqual('1'); // The most simple of tests can sometimes be the best ones :)

  done();
});
```

### **SuperMap#firstEntry**

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

### **SuperMap#last**

The test passses if `map.last()` is the last value in the `SuperMap` in placement order.

Test:

```js
it('Should return the last value in the SuperMap using last()', done => {  
  expect(map.last()).toEqual(6); // Simple tests for simple operations

  done();
});
```

### **SuperMap#lastKey**

The test passses if `map.lastKey()` is the last key in the `SuperMap` in placement order.

Test:

```js
it('Should return the last key in the SuperMap using lastKey()', done => {  
  expect(map.lastKey()).toEqual('5'); // Simple tests for simple operations

  done();
});
```
### **SuperMap#lastEntry**

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

### **SuperMap#shift**

The test passes if `map.shift()` is equal to `2`, `map.first()` is equal to `4` and `map.size` is equal to `2`. Explanation through comments in the test:

```js
it('Should return the first value in the SuperMap and delete the entry using shift()', done => {  
  expect(map.shift()).toEqual(2); // Returns the first value in the map and removes that entry.
  expect(map.first()).toEqual(4); // The first value is now 4.
  expect(map.size).toEqual(2); // And since size was 3 originally, it is now 2 as one entry was removed.

  done();
});
```

### **SuperMap#shiftKey**

The test passes if `map.shiftKey()` is equal to `'3'`, `map.firstKey()` is equal to `'5'` and `map.size` is equal to `1`. Explanation through comments in the test:

```js
it('Should return the first key in the SuperMap and delete the entry using shift()', done => {  
  expect(map.shiftKey()).toEqual('3'); // Returns the first key in the map and removes that entry.
  expect(map.firstKey()).toEqual('5'); // The first key is now '5'.
  expect(map.size).toEqual(1); // And since size was 3 originally, it is now 1 as two entries were removed.

  done();
});
```

### **SuperMap#shiftEntry**

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

### **SuperMap#pop**

The test passes if `map.pop()` is equal to `6`, `map.last()` is equal to `4` and `map.size` is equal to `2`. Explanation through comments in the test:

```js
it('Should return the last value in the SuperMap and delete the entry using pop()', done => {  
  expect(map.pop()).toEqual(6); // Returns the last value in the map and removes that entry.
  expect(map.last()).toEqual(4); // The last value in the map is now 4 as the one after that was removed.
  expect(map.size).toEqual(2); // Since size was 3 originally, it is now 2 as one entry has been removed.

  done();
});
```

### **SuperMap#popKey**

The test passes if `map.popKey()` is equal to `'3'`, `map.lastKey()` is equal to `'1'` and `map.size` is equal to `1`. Explanation through comments in the test:

```js
it('Should return the last key in the SuperMap and delete the entry using pop()', done => {  
  expect(map.popKey()).toEqual('3'); // Returns the last key in the map and removes that entry.
  expect(map.lastKey()).toEqual('1'); // The last key in the map is now '1' as the one after that was removed.
  expect(map.size).toEqual(2); // Since size was 3 originally, it is now 1 as two entries have been removed.

  done();
});
```

### **SuperMap#popEntry**

The test passes if `map.popEntry()` is equal to `['1', 2]`, `map.lastEntry()` is equal to `undefined` and `map.size` is equal to `0`. Explanation through comments in the test:

```js
it('Should return the last entry in the SuperMap and delete the entry using pop()', done => {  
  expect(map.popEntry()).toEqual(['1', 2]); // Returns the last entry tuple in the map and removes that entry.
  expect(map.lastEntry()).toEqual(undefined); // The last entry tuple in the map is now undefined as the only one left was removed with `map.popKey()` in the last test.
  expect(map.size).toEqual(2); // Since size was 3 originally, it is now 0 as three entries have been removed.

  done();
});
```

TODO:

* Write and document test for the `SuperMap` constructor
* `SuperMap.concat()`
* `SuperMap.every()`
* `SuperMap.filter()`
* `SuperMap.find()`
* `SuperMap.reduce()`
* `SuperMap.some()`
