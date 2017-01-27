import {
  Environment as GlimmerEnvironment,
  DOMChanges,
  DOMTreeConstruction,
  templateFactory,
} from '@glimmer/runtime';
import {
  precompile,
} from '@glimmer/compiler';
import ComponentManager from 'component-manager';
import ComponentDefinition from 'component-definition';
import Iterable from 'iterable';

export default class Environment extends GlimmerEnvironment {
  constructor(document) {
    let operations = {
      appendOperations: new DOMTreeConstruction(document),
      updateOperations: new DOMChanges(document),
    };

    super(operations);

    this._components = {};
    this._helpers = {};

    this.compiledLayouts = {};

    this.uselessAnchor = document.createElement('a');
  }

  registerComponent(name, componentClass) {
    let manager = new ComponentManager();
    let definition = new ComponentDefinition(name, manager, componentClass);

    this._components[name] = definition;
  }

  hasComponentDefinition([name,]) {
    return !!this._components[name];
  }

  getComponentDefinition([name,]) {
    return this._components[name];
  }

  compile(templateString) {
    let js = precompile(templateString);
    let factory = templateFactory(JSON.parse(js));

    return factory.create(this);
  }

  hasHelper([helperName,]) {
    return helperName.length === 1 && (helperName in this._helpers);
  }

  iterableFor(ref, evaluatedArgs) {
    let keyPath = evaluatedArgs.named.get('key').value();
    let keyFor;

    if (!keyPath) {
      throw new Error('Must specify a key for #each');
    }

    switch (keyPath) {
    case '@index':
      keyFor = (_, index) => String(index);
      break;
    case '@primitive':
      keyFor = item => String(item);
      break;
    default:
      keyFor = item => item[keyPath];
      break;
    }

    return new Iterable(ref, keyFor);
  }

  protocolForURL(url) {
    this.uselessAnchor.href = url;
    return this.uselessAnchor.protocol;
  }
}
