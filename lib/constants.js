'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var ADD_TOASTR = exports.ADD_TOASTR = '@ReduxToastr/toastr/ADD';
var REMOVE_TOASTR = exports.REMOVE_TOASTR = '@ReduxToastr/toastr/REMOVE';
var CLEAN_TOASTR = exports.CLEAN_TOASTR = '@ReduxToastr/toastr/CLEAN';
var SHOW_CONFIRM = exports.SHOW_CONFIRM = '@ReduxToastr/confirm/SHOW';
var HIDE_CONFIRM = exports.HIDE_CONFIRM = '@ReduxToastr/confirm/HIDE';
var REMOVE_BY_TYPE = exports.REMOVE_BY_TYPE = '@ReduxToastr/toastr/REMOVE_BY_TYPE';
// before add a new transition - check its presence in src/styles/animations.scss
var TRANSITIONS = exports.TRANSITIONS = {
  in: ['bounceIn', 'bounceInDown', 'fadeIn'],
  out: ['bounceOut', 'bounceOutUp', 'fadeOut']
};