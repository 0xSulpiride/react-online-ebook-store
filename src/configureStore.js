import { createStore, applyMiddleware } from 'redux';
import reducer from './reducers';
import { routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import thunk from 'redux-thunk';

export const history = createHistory();

export function configureStore(initialState) {
  return createStore(
    reducer,
    initialState,
    applyMiddleware(thunk, routerMiddleware(history))
  );
}