import {ADD_TOASTR, REMOVE_TOASTR, CLEAN_TOASTR} from './constants';

export function addToastrAction(toastr) {
  return {
    type: ADD_TOASTR,
    payload: toastr
  };
}

export function clean() {
  return {
    type: CLEAN_TOASTR
  };
}

export function remove(id) {
  return {
    type: REMOVE_TOASTR,
    payload: {
      id
    }
  };
}