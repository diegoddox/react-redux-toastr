import ReactTransitionEvents from 'react/lib/ReactTransitionEvents';
import config from './config';

export function createReducer(initialState, fnMap) {
  return (state = initialState, {type, payload}) => {
    const handle = fnMap[type];
    return handle ? handle(state, payload) : state;
  };
}

function isString(obj) {
  return typeof obj === 'string';
}

export function isBrowser() {
  return typeof window !== 'undefined';
}

export function keyCode(e) {
  return (e.which) ? e.which : e.keyCode;
}

export function mapToToastrMessage(type, array) {
  const obj = {};
  obj.type = type;
  obj.position = config.position;

  obj.options = array.filter(item => typeof item === 'object')[0] || {};

  if (obj.options.hasOwnProperty('position')) {
    obj.position = obj.options.position;
  }

  if (!obj.options.hasOwnProperty('removeOnHover')) {
    obj.options.removeOnHover = type !== 'message';
  }

  if (!obj.options.hasOwnProperty('showCloseButton')) {
    obj.options.showCloseButton = true;
  }

  if (type === 'message' && !obj.options.hasOwnProperty('timeOut')) {
    obj.options.timeOut = 0;
  }

  if (isString(array[0]) && isString(array[1])) {
    obj.title = array[0];
    obj.message = array[1];
  } else if (isString(array[0]) && !isString(array[1])) {
    obj.title = array[0];
  } else {
    obj.message = array[0];
  }

  return obj;
}

export function guid() {
  const r = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  return r() + r() + r() + '-' + r() + '_' + r() + '-' + r() + '_' + r() + r() + r();
}

export function onCSSTransitionEnd(node, callback) {
  const runOnce = (e) => {
    // stopPropagation is not working in IE11 and Edge, the transitionend from the Button.js is waiting
    // on the confirm animation to end first and not the Button.js
    e.stopPropagation();
    ReactTransitionEvents.removeEndEventListener(node, runOnce);
    callback && callback(e);
  };
  ReactTransitionEvents.addEndEventListener(node, runOnce);
}

export function preventDuplication(currentData, newObject) {
  let hasDuplication = false;
  currentData.forEach((item) => {
    // Because the toastr has a unic id we will check by the title and message.
    if (item.title === newObject.title && item.message === newObject.message && item.type === newObject.type) {
      hasDuplication = true;
    }
  });
  return hasDuplication;
}

export function updateConfig(obj) {
  Object.keys(config).forEach(function(key) {
    if (obj.hasOwnProperty(key)) {
      config[key] = obj[key];
    }
  });
}
