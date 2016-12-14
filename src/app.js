import Environment from 'environment';
import {
  UpdatableReference,
} from 'glimmer-object-reference';
import DynamicScope from 'dynamic-scope';

export default class App {
  constructor(initialState, options = {}) {
    let defaultOptions = {
      document,
      rootElement: env => env.getDOM().createElement('div'),
    };
    let parsedOptions = Object.assign({}, defaultOptions, options);

    this.env = new Environment(parsedOptions.document);
    this.root = parsedOptions.rootElement(this.env);
    this.reference = new UpdatableReference(initialState);
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

    this.reference.update(newState);
    this::rerender();
  }
}

function rerender() {
  this.env.begin();
  this.renderResult.rerender();
  this.env.commit();
}
