import cuid from 'cuid';
import {createReducer}  from './utils.js';
import {ADD_TOASTR, REMOVE_TOASTR, CLEAN_TOASTR} from './constants';

const initialState = [];

export default createReducer(initialState, {
  [ADD_TOASTR]: (state, payload) => {
    return [
      ...state,
      {
        id: cuid(),
        type: payload.type,
        title: payload.title,
        message: payload.message,
        options: payload.options
      }
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