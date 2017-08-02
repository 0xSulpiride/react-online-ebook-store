export const ADD = 'ADD';
export const REMOVE = 'REMOVE';

export function add(isbn) {
  return {
    type: ADD,
    isbn
  }
}

export function remove(isbn) {
  return {
    type: REMOVE,
    isbn
  }
}
