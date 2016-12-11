import {
  UpdatableReference,
} from 'glimmer-object-reference';
import {
  TestDynamicScope,
} from 'glimmer-test-helpers';
import Environment from 'environment';

const {
  module,
  test,
} = QUnit;

module('Integration | basic rendering');

test('renders a simple component', (assert) => {
  assert.expect(1);

  let context = setupContext({ message: 'Hello world', });

  context::registerComponent('cool-component', CoolComponent, '<p>{{yield}}</p>');
  context::render('<cool-component>{{message}}</cool-component>');

  assert.equal(context.root.innerHTML, '<p>Hello world</p>');
});

test('renders a component with args', (assert) => {
  assert.expect(1);

  let context = setupContext({ message: 'Hello world', });

  context::registerComponent('cool-component', CoolComponent, '<p>{{@message}}</p>');
  context::render('<cool-component @message={{message}} />');

  assert.equal(context.root.innerHTML, '<p>Hello world</p>');
});

function setupContext(context) {
  let env = new Environment(document);
  let root = env.getDOM().createElement('div');
  let reference = new UpdatableReference(context);

  return { env, root, reference, };
}

function registerComponent(...args) {
  this.env.registerComponent(...args);
}

function render(templateString) {
  let template = this.env.compile(templateString);

  this.env.begin();
  template.render(this.reference, this.root, new TestDynamicScope());
  this.env.commit();
}

class CoolComponent {
  constructor(args) {
    if (typeof args === 'object') {
      Object.assign(this, args);
    }
  }
}
