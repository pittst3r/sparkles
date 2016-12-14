export default class DynamicScope {
  constructor(bucket) {
    if (bucket) {
      this.bucket = Object.assign({}, bucket);
    } else {
      this.bucket = {};
    }
  }

  get(key) {
    return this.bucket[key];
  }

  set(key, pathReference) {
    return this.bucket[key] = pathReference;
  }

  child() {
    return new DynamicScope(this.bucket);
  }
}
