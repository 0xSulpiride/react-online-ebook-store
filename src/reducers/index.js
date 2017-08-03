import { combineReducers } from 'redux';
import cart from './cart';
import shop from './shop';
import avatar from './avatar';
import author from './author';
import description from './description';

export default combineReducers({ cart, shop, avatar, author, description });