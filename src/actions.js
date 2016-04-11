import {ADD_TOASTR, REMOVE_TOASTR, CLEAN_TOASTR, SHOW_CONFIRM, HIDE_CONFIRM} from './constants';
import {mapToToastrMessage} from './utils';

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

// In case the user wanna bind the actions
// we need to use the func 'mapToToastrMessage' here as well.
export function success(...toastr) {
  return {
    type: ADD_TOASTR,
    payload: mapToToastrMessage('success', toastr)
  };
}

export function info(...toastr) {
  return {
    type: ADD_TOASTR,
    payload: mapToToastrMessage('info', toastr)
  };
}

export function warning(...toastr) {
  return {
    type: ADD_TOASTR,
    payload: mapToToastrMessage('warning', toastr)
  };
}

export function error(...toastr) {
  return {
    type: ADD_TOASTR,
    payload: mapToToastrMessage('error', toastr)
  };
}

export function showConfirm(obj) {
  return {
    type: SHOW_CONFIRM,
    payload: obj
  };
}

export function hideConfirm() {
  return {
    type: HIDE_CONFIRM
  };
}
