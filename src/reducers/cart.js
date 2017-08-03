import { cart } from '../actions';
import { SIGN_OUT_USER } from '../actions/auth';
const initialState = [];

export default function (state = initialState, action) {
  switch (action.type) {
    case SIGN_OUT_USER:
      return [];
    case cart.FETCH_CART: 
      return action.payload;
    case cart.ADD:
      return [...state, action.isbn];
    case cart.REMOVE:
      return state.filter(b => b !== action.isbn);
    default: return state;
  }
}