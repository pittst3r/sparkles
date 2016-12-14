import {
  UpdatableReference,
} from 'glimmer-object-reference';
import {
  compileLayout,
} from 'glimmer-runtime';
import ComponentLayoutCompiler from 'component-layout-compiler';

export default class ComponentManager {
  prepareArgs(_definition, evaluatedArgs) {
    return evaluatedArgs;
  }

  create(_env, definition, evaluatedArgs) {
    let klass = definition.ComponentClass;

    return new klass(evaluatedArgs.named.value());
  }

  getDestructor() {
    return null;
  }

  layoutFor(definition, component, env) {
    let layout = env.compiledLayouts[definition.name];

    if (layout) {
      return layout;
    }

    layout = compileLayout(new ComponentLayoutCompiler(definition.layoutString), env);
    env.compiledLayouts[definition.name] = layout;

    return layout;
  }

  getSelf(component) {
    return new UpdatableReference(component);
  }

  getTag(/* component */) {
    return null;
  }

  didCreateElement(component, element) {
    component.element = element;
  }

  didRenderLayout(component, bounds) {
    component.bounds = bounds;
  }

  didCreate() {}

  update(component, attrs) {
    component.attrs = attrs.named.value();
  }

  didUpdateLayout() {}

  didUpdate() {}
}
