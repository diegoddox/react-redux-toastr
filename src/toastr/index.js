import ReduxToastr from './ReduxToastr';
import * as ReduxToastrActions from './actions';
import ReduxToastrReducer from './reducer';
import {toastrEmitter} from './toastrEmitter';

export default ReduxToastr;
export const actions = ReduxToastrActions;
export const reducer = ReduxToastrReducer;
export const toastr = toastrEmitter;
