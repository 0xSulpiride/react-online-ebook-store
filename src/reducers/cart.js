import { cart } from '../actions';
const initialState = [];

export default function (state = initialState, action) {
  switch (action.type) {
    case cart.ADD:
      return [...state, action.isbn];
    case cart.REMOVE:
      return state.filter(b => b !== action.isbn);
    default: return state;
  }
}