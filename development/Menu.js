import React from 'react';
import {toastr, actions} from './../src/';
import loremIpsum from 'lorem-ipsum';
import Avatar from './Avatar';
import messageText from './messageText';
import {connect} from 'react-redux';

class Menu extends React.Component {
  constructor(props) {
    super(props);
  }

  handleClick(type) {
    let options = {};

    if (type == 'light' || type === 'error') {
      const icon = 'warning';
      options.icon = icon;
      options.status = icon;
      options.progressBar = true;
      options.position = type == 'light' ? 'bottom-left' : 'top-right';
      options.component = () => (<div>hej</div>);
    }

    toastr[type](loremIpsum(), options);
  }

  delay() {
    return new Promise(resolve => setTimeout(resolve, 900));
  }

  async updateAll() {
    const sum = 5;
    for (let i = 1; i <= sum; i++) {
      toastr.update('mycustomid', {message: `Process ${i} of ${sum}`, position: 'bottom-left'});
      await this.delay();
    }
  }

  render() {
    return (
        <ul className="menu">
          <li className="success" onClick={() => {
            toastr.success(
              'In the beginning was the word',
              'and the Word was with God, and the Word was God...',
              {
                timeOut: 10000,
                position: 'top-left',
                progressBar: true,
                width: '300px'
              }
            );
          }}>
            <span className="icon-check"/>
          </li>
          <li className="warning" onClick={() => this.handleClick('warning')}>
            <span className="icon-exclamation-triangle"/>
          </li>
          <li className="info" onClick={() => {
            toastr.info('Jesus answered, “I am the way and the truth and the life. No one comes to the Father except through Me.', {
              progressBar: true,
              position: 'bottom-right',
              timeOut: 10000,
              transitionIn: 'bounceInDown',
              transitionOut: 'bounceOutUp',
              closeOnToastrClick: true
            });
          }}>
            <span className="icon-info-circle"/>
          </li>
          <li className="error" onClick={() => this.handleClick('error')}>
            <span  className="icon-bug"/>
          </li>
          <li className="success" onClick={() => {
            toastr.success(
              'For God so loved the world',
              'that He gave His one and only Son, that everyone who believes in Him shall not perish but have eternal life. - John 3:16',
              {
                icon: (<Avatar />),
                position: 'top-center',
                attention: true,
                onAttentionClick: (id) => {
                  console.log('Attention background clicked, id: ', id);
                  toastr.remove(id);
                },
                timeOut: 0,
                transitionIn: 'fadeIn',
                transitionOut: 'fadeOut'
              });
          }}>
            <span className="icon-check"/>
            <span className="icon-person"/>
          </li>
          <li className="light" onClick={() => this.handleClick('light')}>
            <span className="icon-light"/>
          </li>
          <li className="message" onClick={() => {
            toastr.message('What can we do without love', messageText);
          }}>
            <span className="icon-email-envelope"/>
          </li>
          <li className="message" onClick={() => toastr.confirm('The confirm message')}>
            <span className="icon-check-5"/>
          </li>
          <li className="success" onClick={() => {
            this.props.dispatch(actions.add({
              id: 'mycustomid', // If not provided we will add one.
              type: 'success',
              title: 'your title',
              position: 'top-left', // This will override the global props position.
              message: 'message',
              options: {
                timeOut: 100000
              }
            }));
          }}>
            <span className="icon-check" />
          </li>
          <li className="message" onClick={async () => {
            await this.updateAll();
            toastr.remove('mycustomid');
          }}>
            <span style={{fontSize: 10}}>Update</span>
          </li>
      </ul>
    );
  }
}

export default connect()(Menu);
