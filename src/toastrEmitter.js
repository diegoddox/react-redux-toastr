import {mapToToastrMessage} from './utils.js';
import EventEmitter from 'eventemitter3';
const emitter = new EventEmitter();

export const EE = emitter;
export const toastrEmitter = {
  info: (...args) => {
    addToToastr('info', args);
  },
  success: (...args) => {
    addToToastr('success', args);
  },
  warning: (...args) => {
    addToToastr('warning', args);
  },
  error: (...args) => {
    addToToastr('error', args);
  },
  clean: () => {
    cleanToastr();
  }
};

function addToToastr(type, array) {
  emitter.emit('add/toastr', mapToToastrMessage(type, array));
}

function cleanToastr() {
  emitter.emit('clean/toastr');
}