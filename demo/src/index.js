import app from 'app';
import store from 'store';
import 'components';

app.render('<to-do-list-app @items={{items}} />');
store.subscribe(() => {
  app.update(() => store.getState());
});
