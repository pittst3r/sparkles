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
  assert.expect(2);

  let env = new Environment(document);
  let name = 'foo';
  let componentDefinition;

  env.registerComponent(name, CoolComponent);
  componentDefinition = env.getComponentDefinition([name,]);

  assert.ok(componentDefinition);
  assert.equal(componentDefinition.layoutString, '<p>foo</p>');
});

test('#hasComponentDefinition', (assert) => {
  assert.expect(2);

  let env = new Environment(document);
  let name = 'foo';

  assert.notOk(env.hasComponentDefinition([name,]));

  env.registerComponent(name, CoolComponent);

  assert.ok(env.hasComponentDefinition([name,]));
});

test('#getComponentDefinition', (assert) => {
  let env = new Environment(document);
  let name = 'foo';
  let component;

  env.registerComponent(name, CoolComponent);
  component = env.getComponentDefinition([name,]);

  assert.ok(component);
});

class CoolComponent {
  static get layout() {
    return '<p>foo</p>';
  }
}
