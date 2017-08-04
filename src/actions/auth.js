import Firebase from 'firebase';
import { fetchCart } from './cart';
import { showSpinner, hideSpinner } from './spinner';
export const REGISTER = 'REGISTER';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const AUTH_ERROR = 'AUTH_ERROR';
export const AUTH_USER = 'AUTH_USER';
export const SIGN_OUT_USER = 'SIGN_OUT_USER';

var config = {
  apiKey: "AIzaSyAb5BRM-IJxB_5oK9uCwZQAr9L7G1lGmQk",
  authDomain: "web-store-8b9fe.firebaseapp.com",
  databaseURL: "https://web-store-8b9fe.firebaseio.com",
  projectId: "web-store-8b9fe",
  storageBucket: "web-store-8b9fe.appspot.com",
  messagingSenderId: "929046991794"
};


Firebase.initializeApp(config);

export function register(credentials) {
  return function (dispatch) {
    dispatch(showSpinner());
    return Firebase.auth().createUserWithEmailAndPassword(credentials.email, credentials.password)
      .then(response => {
        dispatch(authUser(credentials.email));
        dispatch(hideSpinner());
      })
      .catch(error => {
        dispatch(authError(error));
        dispatch(hideSpinner());
      });
  }
}

export function login(credentials) {
  return function (dispatch) {
    dispatch(showSpinner());
    return Firebase.auth().signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(response => {
        dispatch(authUser(credentials.email));
        dispatch(fetchCart());
        dispatch(hideSpinner());
      })
      .catch(error => {
        dispatch(authError(error));
        dispatch(hideSpinner());
      });
  }
}

export function verifyAuth() {
  return function (dispatch) {
    dispatch(showSpinner());
    return Firebase.auth().onAuthStateChanged(user => {
      if (user) {
        dispatch(authUser(user.email));
        dispatch(fetchCart());
      } else {
        dispatch(logout());
      }
    });
  }
}

export function logout() {
  return function (dispatch) {
    return Firebase.auth().signOut()
      .then(() => {
        dispatch({
          type: SIGN_OUT_USER
        });
        dispatch(hideSpinner());
      });
  }
}

export function authUser(email) {
  return {
    type: AUTH_USER,
    email
  }
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  }
}
