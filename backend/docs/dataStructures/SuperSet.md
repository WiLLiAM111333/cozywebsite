# SuperSet

The SuperSet class extends from the [Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set) class in JavaScripts base library to add some extra functionality I think should've been there from the start. Below is a description of type shorthands I use in the type table below it.

---

## Typings

* **T** - The type of the values in the SuperSet
* **T[ ]** - An array of the type T
* **SuperSet\<T\>** - A SuperSet of the type T
* **name\<S\>()** - A method with a generic type of S (usually manually input but can be inferred too)
* **type | otherType** - type OR another type (`|` is an **OR** operator)

## Method return type table

| Method or Property | Default            | Empty SuperSet     |
|:-------------------|:------------------:|:------------------:|
| array              | T[ ]               | [ ]                |
| random()           | T                  | undefined          |
| find()             | T | undefined      | undefined          |
| concat()           | new SuperSet\<T\>  | SuperSet\<T\>      |
| filter()           | new SuperSet\<T\>  | SuperSet\<T\>      |
| reduce\<S\>()      | S                  | S | TypeError      |

---

# Methods and properties

## array

The `array` property returns an array of all the values in the `SuperSet`. The values in the array are put in placement order from the `SuperSet`.

```js
const set = new SuperSet([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

console.log(set); // SuperSet(10) [Set] { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 }
console.log(set.array); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]

```
---

## random

The `random` method returns a random value from the `SuperSet`.

---

## find

The `find` method finds the first value matching the callback provided. This callback has to return a boolean value to function.

```js
const set = new SuperSet([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

console.log(set.find(value => value < 2)); // 1
console.log(set.find(value => value < 10)); // 1
console.log(set.find(value => value > 5)); // 6
console.log(set.find(value => value > 30)); // undefined
```
---

## concat

The `concat` method concatenates multiple `SuperSet` or `Set`s together in parameter placement order.

```js
const set = new SuperSet([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
const otherSet = new SuperSet([11, 12]);
const thirdSet = new SuperSet([13, 14]);

console.log(set.concat(otherSet, thirdSet)); // SuperSet(14) [Set] { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14 }
console.log(set.concat(thirdSet, otherSet)); // SuperSet(14) [Set] { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 13, 14, 11, 12 }
```
---

## filter

The `filter` method returns a new `SuperSet` based off of the callback provided while the original `SuperSet` remains untouched. This callback has to return a boolean value to function.

```js
const set = new SuperSet([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

console.log(set.filter(value => value < 6)); // SuperSet(5) [Set] { 1, 2, 3, 4, 5 }
console.log(set); // SuperSet(10) [Set] { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 }
```
---

## reduce

The `reduce` method returns a single value taken from the whole `SuperSet`. It needs its initialValue (second) to work if the `SuperSet` is empty since that is what gets returned if it's empty, it will throw a `TypeError` otherwise.

```js
const set = new SuperSet([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

console.log(set.reduce((accumulator, value) => accumulator += value, 0)); // 55
```

Maths:
1 + 2 + 3 + 4 + 5 + 6 + 7 + 8 + 9 + 10 = 55

1 + 2 = 3
3 + 3 = 6
6 + 4 = 10
10 + 5 = 15
15 + 6 = 21
21 + 7 = 28
28 + 8 = 36
36 + 9 = 45
45 + 10 = 55

The reduced value is 55
