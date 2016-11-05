import {mapToToastrMessage, preventDuplication} from './utils.js';
import {toastrsCache} from './reducer';
import config from './config';
import EventEmitter from 'eventemitter3';
const emitter = new EventEmitter();

const addToToastr = (type, array) => {
  const toastr = mapToToastrMessage(type, array);
  if (config.preventDuplicates && preventDuplication(toastrsCache, toastr)) return;
  emitter.emit('add/toastr', toastr);
};

let actions = {};

['light', 'message', 'info', 'success', 'warning', 'error'].forEach(item => {
  actions[item] = (...args) => addToToastr(item, args);
});

actions.clean = () => emitter.emit('clean/toastr');

actions.confirm = (...args) => {
  emitter.emit('toastr/confirm', {
    message: args[0],
    options: args[1] || {}
  });
};

export const EE = emitter;
export const toastrEmitter = actions;

