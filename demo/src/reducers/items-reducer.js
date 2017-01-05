import {
  ADD_ITEM,
  COMPLETE_ITEM,
  DELETE_ITEM,
} from 'actions/action-types';

export default function itemsReducer(state, action) {
  if (state === undefined) {
    return [];
  }

  switch (action.type) {
  case ADD_ITEM:
    return addItem(state, action);
  case COMPLETE_ITEM:
    return completeItem(state, action);
  case DELETE_ITEM:
    return deleteItem(state, action);
  default:
    return state;
  }
}

function addItem(state, { description, }) {
  let item = {
    description,
    completed: false,
  };
  return state.concat([item,]);
}

function completeItem(state, { item, }) {
  let newState = new Array(...state);
  let indexOf = newState.map(item => item.description).indexOf(item.description);

  newState.splice(indexOf, 1, {
    description: item.description,
    completed: true,
  });

  return newState;
}

function deleteItem(state, { item, }) {
  let newState = new Array(...state);
  let indexOf = newState.map(item => item.description).indexOf(item.description);

  newState.splice(indexOf, 1);

  return newState;
}
