import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import cn from 'classnames';
import ToastrBox from './ToastrBox';
import ToastrConfirm from './ToastrConfirm';
import * as actions from './actions';
import {EE} from './toastrEmitter';
import {updateConfig} from './utils';
import {TRANSITIONS} from './constants';

export class ReduxToastr extends React.Component {
  static displayName = 'ReduxToastr';

  static propTypes = {
    toastr: PropTypes.object,
    position: PropTypes.string,
    newestOnTop: PropTypes.bool,
    timeOut: PropTypes.number,
    confirmOptions: PropTypes.object,
    progressBar: PropTypes.bool,
    transitionIn: PropTypes.oneOf(TRANSITIONS.in),
    transitionOut: PropTypes.oneOf(TRANSITIONS.out),
    preventDuplicates: PropTypes.bool,
    closeOnToastrClick: PropTypes.bool
  };

  static defaultProps = {
    position: 'top-right',
    newestOnTop: true,
    timeOut: 5000,
    progressBar: false,
    transitionIn: TRANSITIONS.in[0],
    transitionOut: TRANSITIONS.out[0],
    preventDuplicates: false,
    closeOnToastrClick: false,
    getState: (state) => state.toastr,
    confirmOptions: {
      okText: 'ok',
      cancelText: 'cancel'
    }
  };

  toastrFired = {};

  toastrPositions = [
    'top-left',
    'top-right',
    'top-center',
    'bottom-left',
    'bottom-right',
    'bottom-center'
  ];

  constructor(props) {
    super(props);
    updateConfig(props);
  }

  componentDidMount() {
    const {add, showConfirm, clean, removeByType, remove} = this.props;
    EE.on('toastr/confirm', showConfirm);
    EE.on('add/toastr', add);
    EE.on('clean/toastr', clean);
    EE.on('removeByType/toastr', removeByType);
    EE.on('remove/toastr', remove);
  }

  componentWillUnmount() {
    EE.removeListener('toastr/confirm');
    EE.removeListener('add/toastr');
    EE.removeListener('clean/toastr');
    EE.removeListener('removeByType/toastr');
    EE.removeListener('remove/toastr');
    this.toastrFired = {};
  }

  _addToMemory(id) {
    this.toastrFired[id] = true;
  }

  _renderToastrForPosition(position) {
    const {toastrs} = this.props.toastr;

    if (toastrs) {
      return toastrs
        .filter(item => item.position === position)
        .map(item => {
          const mergedItem = {
            ...item,
            options: {
              progressBar: this.props.progressBar,
              transitionIn: this.props.transitionIn,
              transitionOut: this.props.transitionOut,
              closeOnToastrClick: this.props.closeOnToastrClick,
              ...item.options
            }
          };

          return (
            <div key={item.id}>
              <ToastrBox
                inMemory={this.toastrFired}
                addToMemory={() => this._addToMemory(item.id)}
                item={mergedItem}
                {...this.props}
              />
              {item.options && item.options.attention &&
              <div
                onClick={() => {
                  if (typeof item.options.onAttentionClick === 'function') {
                    item.options.onAttentionClick(item.id);
                  } else {
                    this.props.remove(item.id);
                  }
                }}
                className="toastr-attention"/>
              }
            </div>
          );
        });
    }
  }

  _renderToastrs() {
    const {toastr} = this.props;
    const width = toastr.toastrs && toastr.toastrs[0] && toastr.toastrs[0].options && toastr.toastrs[0].options.width;
    const style = width ? {width: width} : {};
    return (
      <div>
        {this.toastrPositions.map(position => {
          return (
            <div key={position} className={position} style={style}>
              {this._renderToastrForPosition(position)}
            </div>
          );
        })}
      </div>
    );
  }

  render() {
    const {className, toastr} = this.props;
    return (
      <div className={cn('redux-toastr', className)} aria-live="assertive">
        {toastr.confirm &&
          <ToastrConfirm
            confirm={toastr.confirm}
            {...this.props}
          />
        }
        {this._renderToastrs()}
      </div>
    );
  }
}

export default connect(
  (state, ownProps) => ({
    toastr: ownProps.getState ? ownProps.getState(state) : state.toastr,
  }),
  actions
)(ReduxToastr);
