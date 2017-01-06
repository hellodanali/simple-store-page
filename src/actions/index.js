import axios from 'axios';

export const FETCH_DATA = 'FETCH_DATA';
export const UPDATE_CART = 'UPDATE_CART';
export const DELETE_ITEM = 'DELETE_ITEM';

export function fetchData () {
  const request = axios.get('https://sneakpeeq-sites.s3.amazonaws.com/interviews/ce/feeds/store.js');
  return { 
    type: FETCH_DATA,
    payload: request
  }
}

export function updateCart(item) {
  return {
    type: UPDATE_CART,
    item: item
  }
}

export function deleteItem(item) {
  return {
    type: DELETE_ITEM,
    item: item
  }
}
