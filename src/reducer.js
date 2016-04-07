import {combineReducers} from 'redux';
import {reducer as toastrReducer} from './toastr';
export default combineReducers({
  toastr: toastrReducer
});
