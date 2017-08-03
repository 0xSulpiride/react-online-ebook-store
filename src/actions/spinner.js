export const SHOW_SPINNER = 'SHOW_SPINNER';
export const HIDE_SPINNER = 'HIDE_SPINNER';

export function showSpinner() {
  return {
    type: SHOW_SPINNER
  }
}

export function hideSpinner() {
  return {
    type: HIDE_SPINNER
  }
}