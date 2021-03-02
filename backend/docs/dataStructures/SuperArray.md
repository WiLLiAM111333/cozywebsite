# SuperArray

I stole typings and JSDOC from the typescript declaration file `lib.es5.d.ts`.
The following methods are just returning new `SuperArray`'s instead of `Array` and work the exact same way as before:

- [slice](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)
- [concat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat)
- [splice](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice)
- [map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
- [filter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)

The following methods are custom made with documentation in the code itself aswell as below with examples:

## random

The `random` method returns one or more random values from the array, this is achieved by using a TypeScript feature: [function overloading](https://www.typescriptlang.org/docs/handbook/functions.html#overloads).

| Called Method | Return Type   |
|---------------|---------------|
| `random()`    | `T`           |
| `random(2)`   | `[T, T]`      |

**Example**
```js
const array = new SuperArray([1, 2, 3, 4]);

console.log(array.random()) // 2
console.log(array.random(2)) // [3, 5]
```

---

## rotateLeft

The `rotateLeft` method returns a new `SuperArray` of the same type as the base type as the array calling it. This array will be "rotated" `n` steps to the left by pushing the first value of the array back a step into the end of the array until it has done this `n` times. This method will return the original array if `n` is either greater or equal to the arrays length or if it's **0**. Example table below:

**Example array**: `[1, 2, 3, 4]`

| Called Method    | Return Value     | 
|------------------|:----------------:|
| rotateLeft(1)    | [2, 3, 4, 1]     |
| rotateLeft(2)    | [3, 4, 1, 2]     |
| rotateLeft(3)    | [4, 1, 2, 3]     |
| rotateLeft(4)    | [1, 2, 3, 4]     |
| rotateLeft(5)    | [1, 2, 3, 4]     |
| rotateLeft(-1)   | [1, 2, 3, 4]     |

---

## rotateRight

The `rotateRight` method returns a new `SuperArray` of the same type as the base type of the array calling it. This array will be "rotated" `n` steps to the right by pushing the first last of the array back a step into the start of the array until it has done this `n` times. This method will return the original array if `n` is either greater or equal to the arrays length or if it's **0**. Example table below:

**Example array**: `[1, 2, 3, 4]`

| Called Method    | Return Value     | 
|------------------|:----------------:|
| rotateLeft(1)    | [4, 1, 2, 3]     |
| rotateLeft(2)    | [3, 4, 1, 2]     |
| rotateLeft(3)    | [2, 3, 4, 1]     |
| rotateLeft(4)    | [1, 2, 3, 4]     |
| rotateLeft(5)    | [1, 2, 3, 4]     |
| rotateLeft(-1)   | [1, 2, 3, 4]     |

---

## shuffle

Returns a new `SuperArray` of the same type as the base type of the array calling it. This array is shuffled randomly, example below:

```js
const arr = new SuperArray([1, 2, 3, 4]);

console.log(arr.shuffle()); // [2, 4, 1, 3];
```

---

## toObject

Returns an object of the array. This object is modeled to use the index of the value as the key and the value as the key-pair value. Example below:

```js
const arr = new SuperArray([1, 2, 3, 4]);

console.log(arr.toObject()); /*
  {
    '0': 1,
    '1': 2,
    '2': 3,
    '3': 4
  }
*/
```

## last

The `last` method returns the last value in the array. This can be done with `Array.pop()`, but that removes the element which you dont always want. This is simply a shortcut to `array[array.size - 1]`. Example:

```js
const arr = new SuperArray([1, 2, 3, 4]);

console.log(arr.last()) // 4
console.log(arr) // [1, 2, 3, 4]

console.log(arr.pop()) // 4
console.log(arr) // [1, 2, 3]

/*
  As you can see `pop()` returns and deletes the last value in the array. This is not always what you want so you can use `last()` to get the last value without deleting it.
*/
```

---
