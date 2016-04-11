import {combineReducers} from 'redux';
import {reducer as toastrReducer} from './../src/';
export default combineReducers({
  toastr: toastrReducer
});
