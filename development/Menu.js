import React from 'react';
import {toastr} from './../src/';
import loremIpsum from 'lorem-ipsum';
import Avatar from './Avatar';

export default class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(type, avatar) {
    let options = {};

    let message = loremIpsum({count: 1});

    if (avatar) {
      options.icon = (<Avatar />);
      options.progressBar = true;
    }

    if (type == 'message') {
      message = loremIpsum({count: 19});
      options.component = () => (<div>hej</div>);
    }

    if (type == 'light') {
      const icon = 'warning';
      options.icon = icon;
      options.status = icon;
      options.progressBar = true;
      options.component = () => (<div>hej</div>);
    }

    toastr[type](loremIpsum(), message, options);
  }

  render() {
    return (
        <ul className="menu">
          <li className="success" onClick={() => this.handleClick('success')}>
            <span className="icon-check"/>
          </li>
          <li className="warning" onClick={() => this.handleClick('warning')}>
            <span className="icon-exclamation-triangle"/>
          </li>
          <li className="info" onClick={() => this.handleClick('info')}>
            <span className="icon-info-circle"/>
          </li>
          <li className="error" onClick={() => this.handleClick('error')}>
            <span  className="icon-bug"/>
          </li>
          <li className="success" onClick={() => this.handleClick('success', true)}>
            <span className="icon-check"/>
            <span className="icon-person"/>
          </li>
          <li className="info" onClick={() => toastr.info('Lets prevent duplication', 'You can prevent duplications')}>
            <span className="icon-double-diamonds"/>
          </li>
          <li className="light" onClick={() => this.handleClick('light')}>
            <span className="icon-light"/>
          </li>
          <li className="message" onClick={() => this.handleClick('message')}>
            <span className="icon-email-envelope"/>
          </li>
      </ul>
    );
  }
}
