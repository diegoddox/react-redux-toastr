import React from 'react';

const styles = {
  width: '70px',
  height: '70px',
  overflow: 'hidden',
  borderRadius: '50%',
  border: '2px solid white',
  margin: 'auto'
};

export default () => (
  <div className="toastr-avatar" style={styles}>
    <img src="./assets/jesus.jpg" alt="avatar" style={{maxWidth: '105%'}}/>
  </div>
);
