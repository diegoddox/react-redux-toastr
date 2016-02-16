import ReactTransitionEvents from 'react/lib/ReactTransitionEvents';

export function createReducer(initialState, fnMap) {
  return (state = initialState, {type, payload}) => {
    const handle = fnMap[type];
    return handle ? handle(state, payload) : state;
  };
}

export function _bind(obj, ...methods) {
  methods.forEach((method) => obj[method] = obj[method].bind(obj));
}

export function checkPositionName(name) {
  const positions = ['top-left', 'top-right', 'bottom-left', 'bottom-right'];
  const isValidName = positions.indexOf(name);

  if (isValidName > -1) {
    return name;
  }
  return positions[1];
}

export function mapToToastrMessage(type, array) {
  const obj = {};
  obj.type = type;
  obj.options = {};

  const options = array.filter(item => {
    return item.icon || item.timeOut || item.onShowComplete || item.onHideComplete || item.icon;
  })[0];

  if (options) {
    obj.options = options;
  }

  console.log(obj.options.icon);
  if (!obj.options.icon) {
    obj.options.icon = mapToIcon(type);
  }

  if (isString(array[0]) && isString(array[1])) {
    obj.title = array[0];
    obj.message = array[1];
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

export function returnFuncFromObj(obj, name) {
  if (obj && hasProperty(obj, name)) {
    return obj[name] && obj[name]();
  }
}


export const isMobile = detectIsMobile();

function isString(obj) {
  if (typeof obj == 'string') {
    return true;
  }
  return false;
}

function detectIsMobile() {
  if (navigator.userAgent.match(/Android/i)
  || navigator.userAgent.match(/webOS/i)
  || navigator.userAgent.match(/iPhone/i)
  || navigator.userAgent.match(/iPad/i)
  || navigator.userAgent.match(/iPod/i)
  || navigator.userAgent.match(/BlackBerry/i)
  || navigator.userAgent.match(/Windows Phone/i)
 ) {
    return true;
  }else {
    return false;
  }
}
