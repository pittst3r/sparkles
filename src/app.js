import Environment from 'environment';
import {
  UpdatableReference,
} from 'glimmer-object-reference';
import DynamicScope from 'dynamic-scope';

export default class App {
  constructor(initialState, options = {}) {
    let defaultOptions = {
      document,
      root: null,
    };
    let parsedOptions = Object.assign({}, defaultOptions, options);

    this.env = new Environment(parsedOptions.document);
    this.root = parsedOptions.root || this.env.getDOM().createElement('div');
    this.reference = new UpdatableReference(deepCopyObject(initialState));
  }

  registerComponent(name, componentClass) {
    this.env.registerComponent(name, componentClass);
  }

  render(templateString) {
    let template = this.env.compile(templateString);

    this.env.begin();
    this.renderResult = template.render(this.reference, this.root, new DynamicScope());
    this.env.commit();
  }

  update(updater) {
    let currentState = this.reference.value();
    let newState = updater(currentState);

    this.reference.update(deepCopyObject(newState));
    this::rerender();
  }
}

function rerender() {
  this.env.begin();
  this.renderResult.rerender();
  this.env.commit();
}

function deepCopyObject(obj) {
  return JSON.parse(JSON.stringify(obj));
}
