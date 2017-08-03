import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from './configureStore';
import { ConnectedRouter } from 'react-router-redux';
import { history } from './configureStore';
import App from './containers/App';
import './index.css';

const store = configureStore();

// store.subscribe(() => {
//   console.log('store', store.getState());
// })

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter >
  </Provider>,
  document.getElementById('root')
);