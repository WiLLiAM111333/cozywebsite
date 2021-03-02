# SuperMap

I stole the typings for the array inspired methods from the typescript declaration file `lib.es5.d.ts`.

I will be referring to "the cache-arrays" throughout this documentation. They are simple private fields for internal caching of the arrays from the methods `toArray()`, `toKeyArray()` and `toEntryArray()` to make it more efficient to just use `SuperMap.toArray()` in a loop or some re-occuring code since it just accesses it if it exists and the map hasnt been changed since it was last accessed.

Below you will see a list of types and their descriptions. The table below uses those types instead of the full explanation of them to keep it compact and clean.

**Types**
*All arrays are [SuperArray](./SuperArray.md)'s except for the tuple types.*
  - `K`, the type of the maps key values (generic `K` in `SuperMap<K, V>`).
  - `V`, the type of the maps values (generic `V` in `SuperMap<K, V>`).
  - `[K, V]`, a tuple of both generics. This can never be longer than 2 elements.
  - `K[]`, an array of the generic type `K` in SuperMap.
  - `V[]`, an array of the generic type `V` in SuperMap.
  - `[K, V][]`, an array of tuples of both generic types in SuperMap.
  - `[]`, an empty SuperArray.

| method        | default       | empty map     |
|:--------------|:-------------:|:-------------:|
| delete        | boolean       | false         |
| first         | V             | undefined     |
| firstKey      | K             | undefined     |
| firstEntry    | [K, V]        | undefined     |
| toArray       | `V[]`         | `[]`          |
| toKeyArray    | `K[]`         | `[]`          |
| toEntryArray  | `[K, V][]`    | `[]`          |
| last          | V             | undefined     |
| lastKey       | K             | undefined     |
| lastEntry     | [K, V]        | undefined     |
| random        | V             | undefined     |
| randomKey     | K             | undefined     |
| randomEntry   | [K, V]        | undefined     |
| shift         | V             | undefined     |
| shiftKey      | K             | undefined     |
| shiftEntry    | [K, V]        | undefined     |
| pop           | V             | undefined     |
| popKey        | K             | undefined     |
| popEntry      | [K, V]        | undefined     |
| concat        | SuperMap      | SuperMap      |
| every         | boolean       | true          |
| filter        | SuperMap      | SuperMap      |
| find          | V             | undefined     |
| findKey       | K             | undefined     |
| findEntry     | [K, V]        | undefined     |
| some          | boolean       | false         |
| reduce        | S             | S | TypeError |

## set

This method is identical to [Map.set()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/set). The only difference is that it nullifies the cache-arrays.

---

## delete

This method is identical to [Map.delete()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/delete). The only difference is that it nullifies the cache-arrays.

---

## first

The `first` method returns the first value of the map. Example:

```js
const map = new SuperMap();

map.set('1', 2); // First entry in the map. 2 is the value
map.set('3', 4);
map.set('5', 6);

console.log(map.first()); // 2
```
---

## firstKey

The `firstKey` method returns the first key of the map. Example:

```js
const map = new SuperMap();

map.set('1', 2); // First entry in the map. '1' is the key
map.set('3', 4);
map.set('5', 6);

console.log(map.firstKey()); // '1'
```
---

## firstEntry

The `firstEntry` method returns the first entry in the map. Example:

```js
const map = new SuperMap();

map.set('1', 2); // First entry in the map. '1' is the key and 2 is the value, so ['1', 2] is the entry tuple. 
map.set('3', 4);
map.set('5', 6);

console.log(map.firstEntry()); // ['1', 2]
```
---

## toArray

The `toArray` method returns an array of the values in the map sorted by original insertion order. This array is cached internally in the SuperMap in a property called `SuperMap._array`. The internally cached array gets set to `null` if you call the method `set()` or `delete()` since the array is no longer valid. Example:

```js
const map = new SuperMap();

map.set('1', 2);
map.set('3', 4);
map.set('5', 6);

console.log(map.toArray()); // [2, 4, 6]
```
---

## toKeyArray

The `toKeyArray` method returns an array of the keys in the map sorted by original insertion order. This array is cached internally in the SuperMap in a property called `SuperMap._keyArray`. The internally cached array gets set to `null` if you call the method `set()` or `delete()` since the array is no longer valid. Example:

```js
const map = new SuperMap();

map.set('1', 2);
map.set('3', 4);
map.set('5', 6);

console.log(map.toKeyArray()); // ['1', '3', '5']
```
---

## toEntryArray

The `toEntryArray` method returns an array of the entries in the map in a 2d array with the inner array being a tuple of key-value pairs. This array is sorted by original insertion order. This array is cached internally in the SuperMap in a property called `SuperMap._keyArray`. The internally cached array gets set to `null` if you call the method `set()` or `delete()` since the array is no longer valid. Example:

```js
const map = new SuperMap();

map.set('1', 2);
map.set('3', 4);
map.set('5', 6);

console.log(map.toKeyArray()); // ['1', '3', '5']
```
---

## last

The `last` method returns the last value of the map. Example:

```js
const map = new SuperMap();

map.set('1', 2);
map.set('3', 4);
map.set('5', 6);

console.log(map.last()); // 6
```
---

## lastKey

The `lastKey` method returns the last key in the map. Example:

```js
const map = new SuperMap();

map.set('1', 2);
map.set('3', 4);
map.set('5', 6);

console.log(map.lastKey()); // '5'
```
---

## lastEntry

The `lastEntry` method returns the last key-value pair as an entry tuple in the map. Example:

```js
const map = new SuperMap();

map.set('1', 2);
map.set('3', 4);
map.set('5', 6);

console.log(map.lastEntry()); // ['5', 6] 
```
---

## random

The `random` method returns a random value of the map. Example: 

```js
const map = new SuperMap();

map.set('1', 2);
map.set('3', 4);
map.set('5', 6);

console.log(map.random()); // 4
console.log(map.random()); // 4
console.log(map.random()); // 2
console.log(map.random()); // 2
console.log(map.random()); // 6
```
---

## randomKey

The `randomKey` method returns a key value of the map. Example: 

```js
const map = new SuperMap();

map.set('1', 2);
map.set('3', 4);
map.set('5', 6);

console.log(map.randomKey()); // '1'
console.log(map.randomKey()); // '1'
console.log(map.randomKey()); // '5'
console.log(map.randomKey()); // '3'
console.log(map.randomKey()); // '1'
```
---

## randomEntry

The `randomEntry` method returns a random key-value pair tuple of the map. Example: 

```js
const map = new SuperMap();

map.set('1', 2);
map.set('3', 4);
map.set('5', 6);

console.log(map.randomEntry()); // ['3', 4]
console.log(map.randomEntry()); // ['3', 4]
console.log(map.randomEntry()); // ['1', 2]
console.log(map.randomEntry()); // ['1', 2]
console.log(map.randomEntry()); // ['5', 6]
```
---

## shift

Identical to [Array.shift()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/shift). Example:

```js
const map = new SuperMap();

map.set('1', 2);
map.set('3', 4);
map.set('5', 6);
map.set('7', 8);

console.log(map.shift()); // 2
console.log(map) /* 
SuperMap(3) [Map] {
  '3' => 4,
  '5' => 6,
  '7' => 8
}
Here we can see that the first value has been deleted in insertion order. 
The entries' value was also returned in the map.shift() value above this as visible 
by the console.log comment.
*/
```
---

## shiftKey

Identical to [Array.shift()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/shift) except it returns the key of the shifted entry rather than the value. Example:

```js
const map = new SuperMap();

map.set('1', 2);
map.set('3', 4);
map.set('5', 6);
map.set('7', 8);

console.log(map.shiftKey()); // '1'
console.log(map) /* 
SuperMap(3) [Map] {
  '3' => 4,
  '5' => 6,
  '7' => 8
}
Here we can see that the first entry has been deleted in insertion order. 
The entries' key was also returned in the map.shift() value above this as visible 
by the console.log comment.
*/
```
---

## shiftEntry

Identical to [Array.shift()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/shift) except it returns the entry of the shifted entry rather than the value. Example:

```js
const map = new SuperMap();

map.set('1', 2);
map.set('3', 4);
map.set('5', 6);
map.set('7', 8);

console.log(map.shiftEntry()); // ['1', 2]
console.log(map) /* 
SuperMap(3) [Map] {
  '3' => 4,
  '5' => 6,
  '7' => 8
}
Here we can see that the first entry has been deleted in insertion order. 
The entries' key-pair tuple was also returned in the map.shift() value above this as visible 
by the console.log comment.
*/
```
---

## pop

Identical to [Array.pop()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/pop). Example:

```js
const map = new SuperMap();

map.set('1', 2);
map.set('3', 4);
map.set('5', 6);
map.set('7', 8);

console.log(map.pop()); // 8
console.log(map) /*
SuperMap(3) [Map] {
  '1' => 2,
  '3' => 4,
  '5' => 6
}
Here we can see that the last entry has been deleted in insertion order.
The entries' value was also returned in the map.pop() value above as visible
by the console.log comment.
*/
```
---

## popKey

Identical to [Array.pop()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/pop) except it returns the key of the popped entry rather than the value. Example:

```js
const map = new SuperMap();

map.set('1', 2);
map.set('3', 4);
map.set('5', 6);
map.set('7', 8);

console.log(map.popKey()); // '7'
console.log(map) /*
SuperMap(3) [Map] {
  '1' => 2,
  '3' => 4,
  '5' => 6
}
Here we can see that the last entry has been deleted in insertion order.
The entries' key was also returned in the map.pop() value above as visible
by the console.log comment.
*/
```
---

## popEntry

Identical to [Array.pop()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/pop) except it returns the entry of the popped entry rather than the value. Example:

```js
const map = new SuperMap();

map.set('1', 2);
map.set('3', 4);
map.set('5', 6);
map.set('7', 8);

console.log(map.pop()); // ['7', 8]
console.log(map) /*
SuperMap(3) [Map] {
  '1' => 2,
  '3' => 4,
  '5' => 6
}
Here we can see that the last entry has been deleted in insertion order.
The entries' key-value tuple was also returned in the map.pop() value above as visible
by the console.log comment.
*/
```
---

## concat

Identical to [Array.concat()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat). It also works with a tuple with the length of 2 as long as it matches the type parameters of K and V (key and value). This will always return a new `SuperMap`. 

**Eligable parameter types to concatenate the map with:**
  - SuperMap<K, V> (of the same type in both key and value)
  - Map<K, V> (of the same type in both key and value)
  - [K, V] (key-value tuple of the same type)

The example below uses all 3 allowed methods of concatenating into a new `SuperMap`, you can choose to only use 1 or all 3 if you'd so like.

```js
const map = new SuperMap();

map.set('1', 2);
map.set('3', 4);
map.set('5', 6);

const map2 = new SuperMap();

map2.set('7', 8);

const map3 = new Map();

map3.set('9', 10);

console.log(map); /*
SuperMap(3) [Map] {
  '1' => 2,
  '3' => 4,
  '5' => 6
}

But hello... It didnt work? It did work, the concat method just creates a new SuperMap, so make sure
to assign a variable to hold this new SuperMap, the results are seen below!
*/

console.log(map.concat(map2, map3, ['11', 12])); /*
SuperMap(6) [Map] {
  '1' => 2,
  '3' => 4,
  '5' => 6,
  '7' => 8,
  '9' => 10,
  '11' => 12
}

As we can see here, the base map is simply copied over to a new SuperMap, then the entries from
`map2` get assigned to this new map, the the same thing with map3 and then it takes the key-value pair 
entry tuple and puts it in the new map.
*/
```
---

## The following methods will get their documentation shortly
  - `every()`
  - `filter()`
  - `find()`
  - `findKey()`
  - `findEntry()`
  - `some()`
  - `reduce()`
