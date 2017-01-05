import app from 'app';
import AddItemForm from 'components/add-item-form';
import ToDoItem from 'components/to-do-item';
import ToDoList from 'components/to-do-list';
import ToDoListApp from 'components/to-do-list-app';

app.registerComponent('add-item-form', AddItemForm);
app.registerComponent('to-do-item', ToDoItem);
app.registerComponent('to-do-list', ToDoList);
app.registerComponent('to-do-list-app', ToDoListApp);
