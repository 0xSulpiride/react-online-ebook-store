import { combineReducers } from 'redux';
import cart from './cart';
import shop from './shop';
import avatar from './avatar';
import author from './author';
import description from './description';
import auth from './auth';
import spinner from './spinner';
import { routerReducer } from 'react-router-redux';
import { reducer as FormReducer } from 'redux-form';

export default combineReducers({
  cart,
  shop,
  avatar,
  author,
  description,
  auth,
  spinner,
  router: routerReducer,
  form: FormReducer,
});