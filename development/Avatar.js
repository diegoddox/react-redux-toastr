import React from 'react';

const styles = {
  width: '70px',
  height: '70px',
  overflow: 'hidden',
  borderRadius: '50%',
  border: '2px solid white',
  margin: 'auto'
};

const imgStyle = {
  maxWidth: '105%'
};

export default () => {
  return (
    <div className="toastr-avatar" style={styles}>
      <img src="./assets/bob.jpg" style={imgStyle}/>
    </div>
  );
};
