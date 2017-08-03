import { AUTH_USER, SIGN_OUT_USER, AUTH_ERROR } from '../actions/auth';

const initialState = {
  authenticated: false,
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTH_USER:
      return {
        ...state,
        authenticated: true,
        error: null
      }
    case AUTH_ERROR:
      return {
        ...state,
        error: action.payload.message
      };
    case SIGN_OUT_USER:
      return {
        ...state, authenticated: false
      };
    default: return state;
  }
};