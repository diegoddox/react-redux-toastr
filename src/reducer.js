import {createReducer, guid}  from './utils.js';
import config from './config';
import {
  ADD_TOASTR,
  REMOVE_TOASTR,
  CLEAN_TOASTR,
  SHOW_CONFIRM,
  HIDE_CONFIRM,
  REMOVE_BY_TYPE
} from './constants';

// We will cache data so we can check for duplicated before fire the add action.
export let toastrsCache = [];

const initialState = {
  toastrs: [],
  confirm: null
};

export default createReducer(initialState, {
  [ADD_TOASTR]: (state, {type, title, message, options, ignoreToastr}) => {
    if (ignoreToastr) {
      return state;
    }

    const newToastr = {
      id: guid(),
      type,
      title,
      message,
      options
    };

    let newState = {};
    if (!config.newestOnTop) {
      newState = {
        ...state,
        toastrs: [
          ...state.toastrs,
          newToastr
        ]
      };
    } else {
      newState = {
        ...state,
        toastrs: [
          newToastr,
          ...state.toastrs
        ]
      };
    }
    toastrsCache = newState.toastrs;
    return newState;
  },
  [REMOVE_TOASTR]: (state, id) => {
    let newState = {
      ...state,
      toastrs: state.toastrs.filter(toastr => toastr.id !== id)
    };

    toastrsCache = newState.toastrs;
    return newState;
  },
  [REMOVE_BY_TYPE]: (state, type) => {
    let newState = {
      ...state,
      toastrs: state.toastrs.filter(toastr => toastr.type !== type)
    };

    toastrsCache = newState.toastrs;
    return newState;
  },
  [CLEAN_TOASTR]: (state) => {
    toastrsCache = [];
    return {
      ...state,
      toastrs: []
    };
  },
  [SHOW_CONFIRM]: (state, {message, options}) => {
    return {
      ...state,
      confirm: {
        id: guid(),
        show: true,
        message,
        options: options || {}
      }
    };
  },
  [HIDE_CONFIRM]: (state) => {
    return {
      ...state,
      confirm: null
    };
  }
});
