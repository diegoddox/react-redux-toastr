import ReactTransitionEvents from 'react/lib/ReactTransitionEvents';

export function createReducer(initialState, fnMap) {
  return (state = initialState, {type, payload}) => {
    const handle = fnMap[type];
    return handle ? handle(state, payload) : state;
  };
}

export function checkPositionName(name) {
  const positions = ['top-left', 'top-right', 'bottom-left', 'bottom-right'];
  const isValidName = positions.indexOf(name);

  if (isValidName > -1) {
    return name;
  }
  return positions[1];
}

function isString(obj) {
  if (typeof obj == 'string') {
    return true;
  }
  return false;
}

export function mapToToastrMessage(type, array) {
  const obj = {};
  obj.type = type;

  obj.options = array.filter(item => typeof item == 'object')[0] || {};

  if (!obj.options.icon) {
    obj.options.icon = mapToIcon(type);
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

export function mapToIcon(type) {
  switch (type) {
    case 'info':
      return 'icon-information-circle';
    case 'success':
      return 'icon-check-1';
    case 'warning':
      return 'icon-exclamation-triangle';
    case 'error':
      return 'icon-exclamation-alert';
    default:
      return type;
  }
}

export function hasProperty(obj, property) {
  if (obj == null) {
    return false;
  }
  return typeof obj[property] !== 'undefined';
}

export function guid() {
  function r() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  }
  return r() + r() + r() + '-' + r() + '_' + r() + '-' + r() + '_' + r() + r() + r();
}

export function onCSSTransitionEnd(node, callback) {
  const runOnce = (e) => {
    e.stopPropagation();
    callback && callback(e);
    ReactTransitionEvents.removeEndEventListener(node, runOnce);
  };
  ReactTransitionEvents.addEndEventListener(node, runOnce);
}
