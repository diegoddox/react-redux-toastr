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
  const obj = {
    type: type,
    title: '',
    message: '',
    options: {}
  };

  if(!array.length) {
    console.error('REDUX-TOASTR ERROR:: The toastr method: ' + type + ' cannot be empty', array);
    return false;
  }

  const options = array.filter(hasObject)[0];
  if (options) {
    obj.options = options;
  }

  if (array.length > 1 && isString(array[0]) && isString(array[1])) {
    obj.title = array[0];
    obj.message = array[1];
  } else if (isString(array[0])){
    if (type == 'message') {
      obj.title = 'Message';
    }
    obj.message = array[0];
  } else {
    console.error('REDUX-TOASTR ERROR:: The first arguments most be a string', array);
    return false;
  }

  return obj;
}

export function mapToIcon(icon) {
  switch(icon) {
    case 'info':
      return 'icon-information-circle';
    case 'success':
      return 'icon-check-1';
    case 'warning':
      return 'icon-exclamation';
    case 'error':
      return 'icon-exclamation-alert';
    default:
      return icon;
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

export const isMobile = detectIsMobile();

function isString(obj) {
  if (typeof obj == 'string') {
    return true;
  }
  return false;
}
  

function hasObject(item) {
  return item.icon || item.timeOut || item.onShowComplete || item.onHideComplete || item.icon;
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