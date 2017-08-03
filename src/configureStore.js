import { createStore, applyMiddleware } from 'redux';
import reducer from './reducers';
import { routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import reduxThunk from 'redux-thunk';
import * as authActions from './actions/auth';

export const history = createHistory();

export function configureStore(initialState) {
  const store = createStore(
    reducer,
    initialState,
    applyMiddleware(reduxThunk, routerMiddleware(history))
  );

  store.dispatch(authActions.verifyAuth());
  
  return store;
}