import {ADD_TOASTR, REMOVE_TOASTR, CLEAN_TOASTR} from './constants';
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