import {
  App,
} from 'sparkles';

let rootElement = () => document.getElementById('app-container');
let initialState = { message: 'click me', messageCase: 'lower', };
let app = new App(initialState, { rootElement, });

class CoolComponent {
  static get layout() {
    return '<button onclick={{toggle}}>{{yield}}</button>';
  }

  toggle() {
    toggle();
  }
}

function toggle() {
  app.update((state) => {
    let toggleMap = {
      'lower': ['toUpperCase', 'upper',],
      'upper': ['toLowerCase', 'lower',],
    };
    let [meth, newCase,] = toggleMap[state.messageCase];

    return {
      message: state.message[meth](),
      messageCase: newCase,
    };
  });
}

app.registerComponent('cool-component', CoolComponent);
app.render('<cool-component>{{message}}</cool-component>');
