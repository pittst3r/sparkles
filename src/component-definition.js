import {
  ComponentDefinition as GlimmerComponentDefinition,
} from 'glimmer-runtime';

export default class ComponentDefinition extends GlimmerComponentDefinition {
  constructor(name, manager, componentClass) {
    super(name, manager, componentClass);
    this.layoutString = componentClass.layout;
  }
}
