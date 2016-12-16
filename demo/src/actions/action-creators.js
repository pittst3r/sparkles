import { ADD_ITEM, } from 'actions/action-types';

export function addItem(description) {
  return {
    type: ADD_ITEM,
    description,
  };
}
