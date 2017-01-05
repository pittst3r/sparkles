export default class ToDoList {
  static get layout() {
    return `
      <ul>
        {{#each @items key="description" as |item|}}
          <to-do-item @item={{item}} />
        {{/each}}
      </ul>
    `;
  }
}
