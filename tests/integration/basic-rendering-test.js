import {
  UpdatableReference,
} from 'glimmer-object-reference';
import {
  TestEnvironment,
  TestDynamicScope,
} from 'glimmer-test-helpers';

const {
  module,
  test,
} = QUnit;

module('basic rendering');

test('renders a simple component', (assert) => {
  assert.expect(1);

  let context = setupContext({ message: 'Hello world' });

  context::registerComponent('cool-component', undefined, '<p>{{yield}}</p>');
  context::render('<cool-component>{{message}}</cool-component>');

  assert.equal(context.root.innerHTML, '<p>Hello world</p>');
});

function setupContext(context) {
  let env = new TestEnvironment();
  let root = env.getDOM().createElement('div');
  let reference = new UpdatableReference(context);

  return { env, root, reference, };
}

function registerComponent(...args) {
  this.env.registerBasicComponent(...args);
}

function render(templateString) {
  let template = this.env.compile(templateString);

  this.env.begin();
  template.render(this.reference, this.root, new TestDynamicScope());
  this.env.commit();
}
