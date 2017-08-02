export const SEARCH = 'SEARCH';
export const RATE = 'RATE';

export function search(query) {
  return {
    type: SEARCH,
    query
  }
}

export function rate(isbn, rating) {
  return {
    type: RATE,
    isbn,
    rating
  }
}