import { addItem, } from 'actions/action-creators';
import store from 'store';

export default class ToDoList {
  static get layout() {
    return `
      <form onsubmit={{addItem}}>
        <input type="text" name="item" />
        <button>Add Item</button>
      </form>
    `;
  }

  constructor() {
    this.addItem = this::this.addItem;
  }

  addItem(e) {
    e.preventDefault();
    let formData = new FormData(e.target);
    let description = formData.get('item');

    store.dispatch(addItem(description));
    this::clearForm();
  }
}

function clearForm() {
  this.element.reset();
}
