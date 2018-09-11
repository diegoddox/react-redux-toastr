import React from 'react';

// fake i18n formatting
const formatMessage = x => x.split('').reverse().join('');

export default class CustomComponent extends React.Component {
  componentDidMount() {
    console.log('CustomComponent is here.', this.props.text);
  }

  render() {
    return (
      <div>
        { formatMessage(this.props.text) }
      </div>
    )
  }
}
