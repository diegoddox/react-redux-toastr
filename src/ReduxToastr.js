import React,
  {Component, PropTypes}    from 'react';
import {connect}            from 'react-redux';
import {bindActionCreators} from 'redux';
import classnames           from 'classnames';

import ToastrBox            from './ToastrBox';
import * as tActions        from './actions';
import {EE}                 from './toastrEmitter';
import config               from './config';

import {checkPositionName, isMobile}  from './utils.js';

const mapStateToProps = (state) => ({
  toastrs: state.toastr
});

export class ReduxToastr extends Component {
  static displayName = 'ReduxToastr'

  static propTypes = {
    toastrs: PropTypes.array,
    position: PropTypes.string,
    newestOnTop: PropTypes.bool,
    timeOut: PropTypes.number
  }

  static defaultProps = {
    position: 'top-right',
    newestOnTop: true
  }

  constructor(props) {
    super(props);
    this.actions = bindActionCreators(tActions, this.props.dispatch);
    config.set('newestOnTop', this.props.newestOnTop);
    this.handleRemoveToastr = this.handleRemoveToastr.bind(this);
  }

  componentDidMount() {
    const onAddToastr = (toastr) => {
      this.actions.addToastrAction(toastr);
    };

    const onCleanToastr = () => {
      if (this.props.toastrs.length) {
        this.actions.clean();
      }
    };

    EE.on('add/toastr', onAddToastr);
    EE.on('clean/toastr', onCleanToastr);
  }

  componentWillUnmount() {
    EE.removeListener('add/toastr');
    EE.removeListener('clean/toastr');
  }

  handleRemoveToastr(id) {
    this.actions.remove(id);
  }

  render() {
    const toastrPosition = checkPositionName(this.props.position);
    const classes = classnames('redux-toastr', toastrPosition, {mobile: isMobile});

    return (
      <div className={classes}>
        {this.props.toastrs.map((toastr) => {
          return (
            <ToastrBox
              key={toastr.id}
              toastr={toastr}
              timeOut={this.props.timeOut}
              remove={this.handleRemoveToastr}/>
          );
        })}
      </div>
    );
  }
}

export default connect(mapStateToProps)(ReduxToastr);