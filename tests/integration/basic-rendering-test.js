import App from 'app';
import $ from 'jquery';

const {
  module,
  test,
} = QUnit;

module('Integration | basic rendering');

test('renders a simple component', (assert) => {
  assert.expect(1);

  let app = new App({ message: 'Hello world', });

  class YieldingComponent {
    static get layout() {
      return '<p>{{yield}}</p>';
    }
  }

  app.registerComponent('cool-component', YieldingComponent);
  app.render('<cool-component>{{message}}</cool-component>');

  assert.equal(app.root.innerHTML, '<p>Hello world</p>');
});

test('renders a component with args', (assert) => {
  assert.expect(1);

  let app = new App({ message: 'Hello world', });

  class ArgsComponent {
    static get layout() {
      return '<p>{{@message}}</p>';
    }
  }

  app.registerComponent('cool-component', ArgsComponent);
  app.render('<cool-component @message={{message}} />');

  assert.equal(app.root.innerHTML, '<p>Hello world</p>');
});

test('renders computed properties', (assert) => {
  assert.expect(2);

  let app = new App({ message: 'Hello world', });

  class ArgsComponent {
    static get layout() {
      return '<p>{{upcasedMessage}}</p>';
    }

    constructor(attrs) {
      this.attrs = attrs;
    }

    get upcasedMessage() {
      return this.attrs.message.toUpperCase();
    }
  }

  app.registerComponent('cool-component', ArgsComponent);
  app.render('<cool-component @message={{message}} />');

  assert.equal(app.root.innerHTML, '<p>HELLO WORLD</p>');

  app.update(() => {
    return { message: 'Hello world!', };
  });

  assert.equal(app.root.innerHTML, '<p>HELLO WORLD!</p>');
});

test('rerenders with reference updates', (assert) => {
  assert.expect(2);

  let app = new App({ message: 'Hello world', });

  class ArgsComponent {
    static get layout() {
      return '<p>{{@message}}</p>';
    }
  }

  app.registerComponent('cool-component', ArgsComponent);
  app.render('<cool-component @message={{message}} />');

  assert.equal(app.root.innerHTML, '<p>Hello world</p>');

  app.update(() => {
    return { message: 'Hello world!', };
  });

  assert.equal(app.root.innerHTML, '<p>Hello world!</p>');
});

test('renders computed properties', (assert) => {
  assert.expect(2);

  let app = new App({ message: 'Hello world', });

  class ArgsComponent {
    static get layout() {
      return '<p>{{upcasedMessage}}</p>';
    }

    constructor(attrs) {
      this.attrs = attrs;
    }

    get upcasedMessage() {
      return this.attrs.message.toUpperCase();
    }
  }

  app.registerComponent('cool-component', ArgsComponent);
  app.render('<cool-component @message={{message}} />');

  assert.equal(app.root.innerHTML, '<p>HELLO WORLD</p>');

  app.update(() => {
    return { message: 'Hello world!', };
  });

  assert.equal(app.root.innerHTML, '<p>HELLO WORLD!</p>');
});

test('renders nested components', (assert) => {
  assert.expect(1);

  let app = new App({});

  class YieldingComponent {
    static get layout() {
      return '{{yield}}';
    }
  }

  class OtherComponent {
    static get layout() {
      return '<p>Hello world</p>';
    }
  }

  app.registerComponent('yielding-component', YieldingComponent);
  app.registerComponent('other-component', OtherComponent);
  app.render('<yielding-component><other-component></other-component></yielding-component>');

  assert.equal(app.root.innerHTML, '<p>Hello world</p>');
});

test('performs actions', (assert) => {
  assert.expect(2);

  let app = new App({ message: 'Hello world', });

  function updateMessage() {
    app.update(() => {
      return { message: 'Hello world!', };
    });
  }

  class CoolComponent {
    static get layout() {
      return '<button onclick={{updateMessage}}>{{@message}}</button>';
    }

    updateMessage() {
      updateMessage();
    }
  }

  app.registerComponent('cool-component', CoolComponent);
  app.render('<cool-component @message={{message}} />');

  assert.equal(app.root.innerHTML, '<button>Hello world</button>');

  $(app.root).find('button').click();

  assert.equal(app.root.innerHTML, '<button>Hello world!</button>');
});
