import _ from 'lodash';
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
  const isValidName = _.contains(positions, name);

  if (isValidName) {
    return name;
  }
  return positions[0];
}

export function mapToToastrMessage(type, array) {
  const obj = {
    type: type,
    title: '',
    message: '',
    options: {}
  };

  if (array.length > 1 && _.isString(array[0]) && _.isString(array[1])) {
    obj.title = array[0];
    obj.message = array[1];

    if (array[2] && _.isObject(array[2])) {
      obj.options = applyOptions(array[2]);
    } else if (array[1] && _.isObject(array[1])) {
      obj.options = applyOptions(array[1]);
    }
  } else {
    obj.message = array[0];
  }

  function applyOptions(options) {
    if (options.icon) {
      const hasIconPrefix = options.icon.toLowerCase().match('icon-');
      if (!hasIconPrefix) {
        options.icon = 'icon-' + obj.options.icon;
      }
    }
    return options;
  }
  return obj;
}