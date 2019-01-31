import config from './config';

function whichAnimationEvent() {
  let t;
  const el = document.createElement('fakeelement');

  const transitions = {
    animation: 'animationend',
    oanimation: 'oanimationend',
    MSAnimation: 'MSAnimationEnd',
    webkitAnimation: 'webkitAnimationEnd'
  };

  for (t in transitions) {
    if (el.style[t] !== undefined) {
      return transitions[t];
    }
  }
}

function createNewEvent(eventName) {
  var event;
  if (typeof (Event) === 'function') {
    event = new Event(eventName);
  } else {
    event = document.createEvent('Event');
    event.initEvent(eventName, true, true);
  }
  return event;
}

function isString(obj) {
  if (typeof obj == 'string') {
    return true;
  }
  return false;
}

export function toastrWarn(message) {
  if (process.env.NODE_ENV === 'production') {
    return null;
  }
  console.warn(`[react-redux-toastr] ${message}`);
}

export function createReducer(initialState, fnMap) {
  return (state = initialState, {type, payload}) => {
    const handle = fnMap[type];
    return handle ? handle(state, payload) : state;
  };
}

export function isBrowser() {
  if (typeof window !== 'undefined') {
    return true;
  }
  return false;
}

export function keyCode(e) {
  return (e.which) ? e.which : e.keyCode;
}

export function mapToToastrMessage(type, array) {
  const obj = {};
  obj.type = type;
  obj.position = config.position;

  obj.options = array.filter(item => typeof item == 'object')[0] || {};

  if (obj.options.hasOwnProperty('position')) {
    obj.position = obj.options.position;
  }

  if (!obj.options.hasOwnProperty('removeOnHover')) {
    obj.options.removeOnHover = true;
    if (type === 'message') {
      obj.options.removeOnHover = false;
    }
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
  if (!node) {
    return;
  }
  // if css animation is failed - dispatch event manually
  const animationEnd = whichAnimationEvent();
  const timeoutId = setTimeout(function() {
    const e = createNewEvent(animationEnd);
    toastrWarn('The toastr box was closed automatically, please check \'transitionOut\' prop value');
    node.dispatchEvent(e);
  }, config.maxAnimationDelay);

  const runOnce = (e) => {
    clearTimeout(timeoutId);
    // stopPropagation is not working in IE11 and Edge, the transitionend from the Button.js is waiting
    // on the confirm animation to end first and not the Button.js
    e.stopPropagation();
    node.removeEventListener(animationEnd, runOnce);
    callback && callback(e);
  };
  node.addEventListener(animationEnd, runOnce);
}

export function preventDuplication(currentData, newObjec) {
  let hasDuplication = false;
  currentData.forEach((item) => {
    // If the toastr options implicitly specify not to prevent duplicates then skip
    if (item.options && item.options.preventDuplicates === false) return;
    // Because the toastr has a unic id we will check by the title and message.
    if (item.title === newObjec.title && item.message === newObjec.message && item.type === newObjec.type) {
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

export function _bind(strinOrAray, scope) {
  let array = strinOrAray;
  if (!Array.isArray(strinOrAray)) {
    array = strinOrAray.split(' ');
  }
  return array.map(item=> scope[item] = scope[item].bind(scope));
}
