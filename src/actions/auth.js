import Firebase from 'firebase';

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
    Firebase.auth().createUserWithEmailAndPassword(credentials.email, credentials.password)
      .then(response => {
        dispatch(authUser());
      })
      .catch(error => {
        console.log(error);
        dispatch(authError(error));
      });
  }
}

export function login(credentials) {
  console.log('login', credentials);
  return function (dispatch) {
    Firebase.auth().signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(response => {
        dispatch(authUser());
      })
      .catch(error => {
        dispatch(authError(error));
      });
  }
}

export function verifyAuth() {
  return function (dispatch) {
    Firebase.auth().onAuthStateChanged(user => {
      if (user) {
        dispatch(authUser());
      } else {
        dispatch(logout());
      }
    });
  }
}

export function logout() {
  return function (dispatch) {
    Firebase.auth().signOut()
      .then(() => {
        dispatch({
          type: SIGN_OUT_USER
        })
      });
  }
}

export function authUser() {
  return {
    type: AUTH_USER
  }
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  }
}
