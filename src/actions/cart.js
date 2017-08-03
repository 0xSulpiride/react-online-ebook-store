import Firebase from 'firebase';
import { showSpinner, hideSpinner } from './spinner';
export const ADD = 'ADD';
export const REMOVE = 'REMOVE';
export const FETCH_CART = 'FETCH_CART';

export function fetchCart() {
  return function (dispatch) {
    const userUid = Firebase.auth().currentUser.uid;
    dispatch(showSpinner());
    return Firebase.database().ref(userUid).once('value', snapshot => {
      if (snapshot.val())
        dispatch({
          type: FETCH_CART,
          payload: snapshot.val().cart
        });
      dispatch(hideSpinner());
    });
  }
}


export function add(isbn) {
  if (!Firebase.auth().currentUser) {
    return {
      type: ADD,
      isbn
    }
  }
  const userUid = Firebase.auth().currentUser.uid;
  return dispatch => {
    dispatch(showSpinner());
    Firebase.database().ref(userUid).once('value', snapshot => {
      if (snapshot.val()) {
        Firebase.database().ref(userUid).update({
          cart: [...snapshot.val().cart, isbn]
        }, () => dispatch({
          type: ADD,
          isbn
        }));
      } else {
        Firebase.database().ref(userUid).update({
          cart: [isbn]
        }, () => dispatch({
          type: ADD,
          isbn
        }));
      }
      dispatch(hideSpinner());
    });
  }
}

export function remove(isbn) {
  if (!Firebase.auth().currentUser) {
    return {
      type: REMOVE,
      isbn
    }
  }
  const userUid = Firebase.auth().currentUser.uid;
  return dispatch => {
    dispatch(showSpinner());
    Firebase.database().ref(userUid).once('value', snapshot => {
      Firebase.database().ref(userUid).update({
        cart: snapshot.val().cart.filter(b => b !== isbn)
      }, () => dispatch({
        type: REMOVE,
        isbn
      }));
      dispatch(hideSpinner());
    });
  }
}
