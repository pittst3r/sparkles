import { createStore, combineReducers, } from 'redux';
import items from 'reducers/items-reducer';

const toDoList = combineReducers({
  items,
});

const store = createStore(
  toDoList,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
