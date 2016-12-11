import Environment from 'environment';

const {
  module,
  test,
} = QUnit;

module('Unit | Environment');

test('#compile', (assert) => {
  assert.expect(1);

  let env = new Environment(document);
  let template = env.compile('<div>foo</div>');

  assert.equal(typeof template.render, 'function');
});

test('#registerComponent', (assert) => {
  assert.expect(1);

  let env = new Environment(document);
  let name = 'foo';
  let templateString = '<div>{{thing}}</div>';
  let component;

  env.registerComponent(name, ComponentMock, templateString);
  component = env.getComponentDefinition([name,]);

  assert.ok(component);
});

test('#hasComponentDefinition', (assert) => {
  assert.expect(2);

  let env = new Environment(document);
  let name = 'foo';

  assert.notOk(env.hasComponentDefinition([name,]));

  env.registerComponent(name, ComponentMock, '');

  assert.ok(env.hasComponentDefinition([name,]));
});

test('#getComponentDefinition', (assert) => {
  let env = new Environment(document);
  let name = 'foo';
  let templateString = '<div>{{thing}}</div>';
  let component;

  env.registerComponent(name, ComponentMock, templateString);
  component = env.getComponentDefinition([name,]);

  assert.ok(component);
});

class ComponentMock {
}
