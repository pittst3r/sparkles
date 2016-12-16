export default class ArrayIterator {
  constructor(array, keyFor) {
    this.array = array;
    this.keyFor = keyFor;
    this.position = 0;
  }

  isEmpty() {
    return this.array.length === 0;
  }

  next() {
    let { position, array, keyFor, } = this;

    if (position >= array.length) return null;

    let value = array[position];
    let key = keyFor(value, position);
    let memo = position;

    this.position++;

    return { key, value, memo, };
  }
}
