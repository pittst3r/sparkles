export default class ToDoList {
  static get layout() {
    return `
      <ul>
        {{#each @items key="@index" as |item|}}
          <li>{{item}}</li>
        {{/each}}
      </ul>
      <add-item-form />
    `;
  }
}
