export const REGISTER = 'REGISTER';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export function register() {
  return {
    type: REGISTER
  }
}

export function login() {
  return {
    type: LOGIN
  }
}

export function logout() {
  return {
    type: LOGOUT
  }
}