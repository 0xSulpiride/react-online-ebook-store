import { createStore } from 'redux';
import reducer from './reducers';

export default function() {
  return createStore(reducer);
}