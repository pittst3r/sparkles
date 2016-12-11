import ComponentManager from 'component-manager';

const {
  module,
  test,
} = QUnit;

module('Unit | ComponentManager');

test('#prepareArgs', (assert) => {
  assert.expect(1);

  let manager = new ComponentManager();
  let componentDefinition;
  let evaluatedArgs = 'whatever';

  let preparedArgs = manager.prepareArgs(componentDefinition, evaluatedArgs);

  assert.equal(preparedArgs, evaluatedArgs);
});

test('#create', (assert) => {
  assert.expect(1);

  let manager = new ComponentManager();
  let env;
  let componentDefinition = ComponentDefinitionMock;
  let evaluatedArgs = EvaluatedArgsMock;

  let component = manager.create(env, componentDefinition, evaluatedArgs);

  assert.equal(component.foo, 'bar');
});

class CoolComponent {
  constructor({ foo, }) {
    this.foo = foo;
  }
}

const EvaluatedArgsMock = {
  named: {
    value() {
      return {
        foo: 'bar',
      };
    },
  },
};

const ComponentDefinitionMock = {
  ComponentClass: CoolComponent,
};
