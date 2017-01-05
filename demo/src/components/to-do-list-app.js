export default class ToDoListApp {
  static get layout() {
    return `
      <to-do-list @items={{@items}} />
      <add-item-form />
    `;
  }
}
