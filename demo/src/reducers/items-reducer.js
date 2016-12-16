import { ADD_ITEM, } from 'actions/action-types';

export default function itemsReducer(state, action) {
  if (state === undefined) {
    return [];
  }

  switch (action.type) {
  case ADD_ITEM:
    return addItem(state, action);
  default:
    return state;
  }
}

function addItem(state, { description, }) {
  return state.concat([description,]);
}
