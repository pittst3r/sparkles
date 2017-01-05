import {
  completeItem,
  deleteItem,
  } from 'actions/action-creators';
import store from 'store';

export default class ToDoItem {
  static get layout() {
    return `
      <li>
        {{#if @item.completed}}
          <del>{{@item.description}}</del>
        {{else}}
          {{@item.description}}
        {{/if}}
        <button onclick={{completeItem}}>complete</button>
        <button onclick={{deleteItem}}>delete</button>
      </li>
    `;
  }

  constructor(attrs) {
    this.attrs = attrs;
    this.completeItem = this::this.completeItem;
    this.deleteItem = this::this.deleteItem;
  }

  completeItem() {
    store.dispatch(completeItem(this.attrs.item));
  }

  deleteItem() {
    store.dispatch(deleteItem(this.attrs.item));
  }
}
