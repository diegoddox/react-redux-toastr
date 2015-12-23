import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import classnames from 'classnames';
import ToastrBox from './ToastrBox';
import * as toastrAction from './actions';
import {EE} from './toastrEmitter';
import {checkPositionName} from './utils.js';

const mapStateToProps = (state) => ({
  toastrs: state.toastr
});

export class ReduxToastr extends Component {
  static displayName = 'ReduxToastr'

  static propTypes = {
    toastrs: PropTypes.array,
    position: PropTypes.string
  }

  static defaultProps = {
    position: 'top-right'
  }

  constructor(props) {
    super(props);
    this.actions = bindActionCreators(toastrAction, this.props.dispatch);
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

  render() {
    const posName = checkPositionName(this.props.position);
    const classes = classnames('redux-toastr', posName);

    return (
      <div className={classes}>
        {this.props.toastrs.map((toastr) => {
          return (
            <ToastrBox
              key={toastr.id}
              toastr={toastr}
              {...this.actions}/>
          );
        })}
      </div>
    );
  }
}

export default connect(mapStateToProps)(ReduxToastr);