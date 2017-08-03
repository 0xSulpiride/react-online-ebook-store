import { combineReducers } from 'redux';
import cart from './cart';
import shop from './shop';
import avatar from './avatar'

export default combineReducers({ cart, shop, avatar });