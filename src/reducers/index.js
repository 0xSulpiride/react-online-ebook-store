import { combineReducers } from 'redux';
import cart from './cart';
import shop from './shop';
import avatar from './avatar';
import author from './author';
import description from './description';
import auth from './auth';
import { routerReducer } from 'react-router-redux';
import { reducer as FormReducer } from 'redux-form';

export default combineReducers({
  cart,
  shop,
  avatar,
  author,
  description,
  auth,
  router: routerReducer,
  form: FormReducer,
});