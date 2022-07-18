import React from 'react';

const bookmark = ({ status, ...rest }) => {
  return (
    <button {...rest}>
      <i className={'bi bi-bookmark' + (status ? '-heart-fill' : '')}></i>
    </button>
  );
};

export default bookmark;