import {
  Environment as GlimmerEnvironment,
  DOMChanges,
  DOMTreeConstruction,
  templateFactory,
} from 'glimmer-runtime';
import {
  precompile,
} from 'glimmer-compiler';
import ComponentManager from 'component-manager';
import ComponentDefinition from 'component-definition';

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
  }

  registerComponent(name, componentClass, layout) {
    let manager = new ComponentManager();
    let definition = new ComponentDefinition(name, manager, componentClass, layout);

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
}
