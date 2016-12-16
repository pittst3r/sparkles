import EmptyIterator from 'empty-iterator';
import ArrayIterator from 'array-iterator';
import {
  UpdatableReference,
} from 'glimmer-object-reference';

const EMPTY_ITERATOR = new EmptyIterator();

export default class Iterable {
  constructor(ref, keyFor) {
    this.tag = ref.tag;
    this.ref = ref;
    this.keyFor = keyFor;
  }

  iterate() {
    let { ref, keyFor, } = this;
    let iterable = ref.value();

    if (Array.isArray(iterable)) {
      return iterable.length > 0 ? new ArrayIterator(iterable, keyFor) : EMPTY_ITERATOR;
    } else {
      throw new Error(`Don't know how to {{#each ${iterable}}}`);
    }
  }

  valueReferenceFor(item) {
    return new UpdatableReference(item.value);
  }

  updateValueReference(reference, item) {
    reference.update(item.value);
  }

  memoReferenceFor(item) {
    return new UpdatableReference(item.memo);
  }

  updateMemoReference(reference, item) {
    reference.update(item.memo);
  }
}
