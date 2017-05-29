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

export class ReduxToastr extends React.PureComponent {
  static displayName = 'ReduxToastr';

  static propTypes = {
    toastr: PropTypes.object,
    options: PropTypes.object,
    position: PropTypes.string,
    newestOnTop: PropTypes.bool,
    timeOut: PropTypes.number,
    confirmOptions: PropTypes.shape({
      okText: PropTypes.string,
      cancelText: PropTypes.string,
      onOk: PropTypes.func,
      onCancel:PropTypes.func,
      onChangeNote: PropTypes.func,
      enableNote: PropTypes.bool,
      requiredNote: PropTypes.bool,
      notePlaceholder: PropTypes.string,
      noteLabel: PropTypes.string,
    }),
    progressBar: PropTypes.bool,
    transitionIn: PropTypes.oneOf(TRANSITIONS.in),
    transitionOut: PropTypes.oneOf(TRANSITIONS.out),
    preventDuplicates: PropTypes.bool
  };

  static defaultProps = {
    position: 'top-right',
    newestOnTop: true,
    timeOut: 5000,
    progressBar: false,
    transitionIn: TRANSITIONS.in[0],
    transitionOut: TRANSITIONS.out[0],
    preventDuplicates: false,
    confirmOptions: {
      okText: 'ok',
      cancelText: 'cancel',
      enableNote: false,
    }
  };

  toastrFired = {};

  constructor(props) {
    super(props);
    updateConfig(props);

    this._addToMemory = ::this._addToMemory
    this._handleAttentionOnClick = ::this._handleAttentionOnClick
  }

  componentDidMount() {
    const {add, showConfirm, clean, removeByType} = this.props;
    EE.on('toastr/confirm', showConfirm);
    EE.on('add/toastr', add);
    EE.on('clean/toastr', clean);
    EE.on('removeByType/toastr', removeByType);
  }

  componentWillUnmount() {
    EE.removeListener('toastr/confirm');
    EE.removeListener('add/toastr');
    EE.removeListener('clean/toastr');
    EE.removeListener('removeByType/toastr');
    this.toastrFired = {};
  }

  _addToMemory(id) {
    this.toastrFired[id] = true;
  }

  _handleAttentionOnClick(e){
    this.props.remove(e.target.dataset.removeId)
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
              ...item.options
            }
          };

          return (
            <span key={item.id}>
              <ToastrBox
                inMemory={this.toastrFired}
                addToMemory={this._addToMemory}
                item={mergedItem}
                {...this.props}
              />
              {item.options && item.options.attention &&
                <div data-remove-id={item.id} onClick={this._handleAttentionOnClick} className="toastr-attention" />
              }
            </span>
          );
        });
    }
  }

  _renderToastrs() {
    return (
      <span>
        <div className="top-left">
          {this._renderToastrForPosition('top-left')}
        </div>
        <div className="top-right">
          {this._renderToastrForPosition('top-right')}
        </div>
        <div className="top-center">
          {this._renderToastrForPosition('top-center')}
        </div>
        <div className="bottom-left">
          {this._renderToastrForPosition('bottom-left')}
        </div>
        <div className="bottom-right">
          {this._renderToastrForPosition('bottom-right')}
        </div>
        <div className="bottom-center">
          {this._renderToastrForPosition('bottom-center')}
        </div>
      </span>
    );
  }

  render() {
    const {className, toastr} = this.props;
    return (
      <span className={cn('redux-toastr', className)} aria-live="assertive">
        {toastr.confirm &&
          <ToastrConfirm
            confirm={toastr.confirm}
            {...this.props}
          />
        }
        {this._renderToastrs()}
      </span>
    );
  }
}

export default connect(
  state => ({
    toastr: state.toastr ? state.toastr : state.get('toastr')
  }),
  actions
)(ReduxToastr);
