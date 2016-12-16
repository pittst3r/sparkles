import app from 'app';
import store from 'store';
import 'components';

app.render('<to-do-list @items={{items}} />');
store.subscribe(() => {
  app.update(() => store.getState());
});
