const toastr = {};
toastr.newestOnTop = true;
toastr.timeOut = 4000;
toastr.transitionIn = 'bounceIn';
toastr.transitionOut = 'bounceOut';

const confirm = {};
confirm.transitionIn = 'bounceInDown';
confirm.transitionOut = 'bounceOutUp';
confirm.okText = 'ok';
confirm.cancelText = 'cancel';

const config = {
  toastr,
  confirm
};

export default config;
