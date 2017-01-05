import {
  ADD_ITEM,
  COMPLETE_ITEM,
  DELETE_ITEM,
} from 'actions/action-types';

export function addItem(description) {
  return {
    type: ADD_ITEM,
    description,
  };
}

export function completeItem(item) {
  return {
    type: COMPLETE_ITEM,
    item,
  };
}

export function deleteItem(item) {
  return {
    type: DELETE_ITEM,
    item,
  };
}
