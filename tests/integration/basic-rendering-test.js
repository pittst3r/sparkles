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

  class YieldingComponent {
    static get layout() {
      return '<p>{{yield}}</p>';
    }
  }

  context::registerComponent('cool-component', YieldingComponent);
  context::render('<cool-component>{{message}}</cool-component>');

  assert.equal(context.root.innerHTML, '<p>Hello world</p>');
});

test('renders a component with args', (assert) => {
  assert.expect(1);

  let context = setupContext({ message: 'Hello world', });

  class ArgsComponent {
    static get layout() {
      return '<p>{{@message}}</p>';
    }
  }

  context::registerComponent('cool-component', ArgsComponent);
  context::render('<cool-component @message={{message}} />');

  assert.equal(context.root.innerHTML, '<p>Hello world</p>');
});

test('updates with changes', (assert) => {
  assert.expect(2);

  let context = setupContext({ message: 'Hello world', });

  class ArgsComponent {
    static get layout() {
      return '<p>{{@message}}</p>';
    }
  }

  context::registerComponent('cool-component', ArgsComponent);
  context::render('<cool-component @message={{message}} />');

  assert.equal(context.root.innerHTML, '<p>Hello world</p>');

  context::update({ message: 'Hello world!' });

  assert.equal(context.root.innerHTML, '<p>Hello world!</p>');
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
  this.renderResult = template.render(this.reference, this.root, new TestDynamicScope());
  this.env.commit();
}

function update(newReferenceContent) {
  this.reference.update(newReferenceContent);
  this.env.begin();
  this.renderResult.rerender();
  this.env.commit();
}
