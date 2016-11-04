import {createReducer, guid, preventDuplication}  from './utils.js';
import config from './config';
import {ADD_TOASTR, REMOVE_TOASTR, CLEAN_TOASTR, SHOW_CONFIRM, HIDE_CONFIRM} from './constants';

const initialState = {
  toastrs: [],
  confirm: null
};

export default createReducer(initialState, {
  [ADD_TOASTR]: (state, {type, title, message, options}) => {
    const newToastr = {
      id: guid(),
      type,
      title,
      message,
      options
    };

    if (config.preventDuplicates && preventDuplication(state.toastrs, newToastr)) {
      return {
        ...state
      };
    }

    if (!config.newestOnTop) {
      return {
        ...state,
        toastrs: [
          ...state.toastrs,
          newToastr
        ]
      };
    }
    return {
      ...state,
      toastrs: [
        newToastr,
        ...state.toastrs
      ]
    };
  },
  [REMOVE_TOASTR]: (state, payload) => {
    return {
      ...state,
      toastrs: state.toastrs.filter(toastr => toastr.id !== payload.id)
    };
  },
  [CLEAN_TOASTR]: (state) => {
    return {
      ...state,
      toastrs: []
    };
  },
  [SHOW_CONFIRM]: (state, payload) => {
    return {
      ...state,
      confirm: {
        id: guid(),
        show: true,
        message: payload.message,
        options: payload.options || {}
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
