import { REGISTER, LOGIN, LOGOUT } from '../actions/auth';

const initialState = {
  authenticated: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state, authenticated: true
      }
    case REGISTER:
      return {
        ...state, authenticated: true
      };
    case LOGOUT:
      return {
        ...state, authenticated: false
      };
    default: return state;
  }
};