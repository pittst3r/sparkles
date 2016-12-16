import {
  App,
} from 'sparkles';
import store from 'store';

let root = document.getElementById('app-container');

const app = new App(store.getState(), { root, });

export default app;
