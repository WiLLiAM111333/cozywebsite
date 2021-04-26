# MusicQueue

The `MusicQueue` class is used in music commands and the dashboard that connects them together.

When I reference the return type table by `T` I mean the generic type of `MusicQueue<T>` (the type of data in the queue)

The table below shows the return type of each method

| Method          | Default         | Empty Queue     |
|:----------------|:---------------:|:---------------:|
| toggleLoop      | void            | void            |
| enqueue         | void            | void            |
| clear           | void            | void            |
| skip            | void            | void            |
| shuffle         | void            | void            |
| dequeue         | T               | undefined       |
| first           | T               | undefined       |

---

## toggleLoop

Toggles the private property `isLooped` between true and false to control if the queue is looped or not.

---

## enqueue

Adds an item to the end of the queue. This fails quietly if the queue is full (controlled by the `maxSize` property).

```js
const queue = new MusicQueue([
  'song one', 'song two',
  'song three', 'song four',
  'song five', 'song six',
]);

console.log(queue); /*
MusicQueue(6) [
  'song one',
  'song two',
  'song three',
  'song four',
  'song five',
  'song six'
]
*/

queue.enqueue('song seven');

console.log(queue); /*
MusicQueue(6) [
  'song one',
  'song two',
  'song three',
  'song four',
  'song five',
  'song six',
  'song seven'
]
*/
```
---

## dequeue

Removes the first element in the queue.

```js
const queue = new MusicQueue([
  'song one', 'song two',
  'song three', 'song four',
  'song five', 'song six',
]);

console.log(queue); /*
MusicQueue(6) [
  'song one',
  'song two',
  'song three',
  'song four',
  'song five',
  'song six'
]
*/

console.log(queue.dequeue()) // 'song one';

const queue = new MusicQueue([
  'song one', 'song two',
  'song three', 'song four',
  'song five', 'song six',
]);

console.log(queue); /*
MusicQueue(6) [
  'song two',
  'song three',
  'song four',
  'song five',
  'song six'
]
*/
```
---

## first

Accesses the first item in the queue without deleting it unlike `dequeue`.

```js
const queue = new MusicQueue([
  'song one', 'song two',
  'song three', 'song four',
  'song five', 'song six',
]);

console.log(queue.first()); // 'song one'

console.log(queue); /*
MusicQueue(6) [
  'song one',
  'song two',
  'song three',
  'song four',
  'song five',
  'song six'
]
*/
```
---

## clear

Clears the queue of all items.

```js
const queue = new MusicQueue([
  'song one', 'song two',
  'song three', 'song four',
  'song five', 'song six',
]);

queue.clear();

console.log(queue); // MusicQueue(0)
```
---

## skip

Skips a set amount of items in the queue.

```js
const queue = new MusicQueue([
  'song one', 'song two',
  'song three', 'song four',
  'song five', 'song six',
]);

queue.skip(3);

console.log(queue); /*
MusicQueue(3) [
  'song four',
  'song five',
  'song six'
]
*/
```
---

## shuffle

Shuffles the playlist.

```js
const queue = new MusicQueue([
  'song one', 'song two',
  'song three', 'song four',
  'song five', 'song six',
]);

queue.shuffle();

console.log(queue); /*
MusicQueue(6) [
  'song three',
  'song four',
  'song two',
  'song one',
  'song five',
  'song six'
]
*/
```
