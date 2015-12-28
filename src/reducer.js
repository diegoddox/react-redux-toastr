import {createReducer, guid}  from './utils.js';
import config from './config';
import {ADD_TOASTR, REMOVE_TOASTR, CLEAN_TOASTR} from './constants';

const initialState = [];

export default createReducer(initialState, {
  [ADD_TOASTR]: (state, payload) => {
    const newToastr = {
      id: guid(),
      type: payload.type,
      title: payload.title,
      message: payload.message,
      options: payload.options
    };

    if (!config.get('newestOnTop')) {
      return [
        ...state,
        newToastr
      ];
    }
    return [
      newToastr,
      ...state
    ];
  },
  [REMOVE_TOASTR]: (state, payload) => {
    return state.filter(toastr =>
      toastr.id !== payload.id
    );
  },
  [CLEAN_TOASTR]: () => {
    return [];
  }
});