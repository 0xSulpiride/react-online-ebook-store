import { combineReducers } from 'redux';
import cart from './cart';
import shop from './shop';

export default combineReducers({ cart, shop });