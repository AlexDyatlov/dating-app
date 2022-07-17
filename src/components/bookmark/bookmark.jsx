import React from 'react';

const bookmark = ({ handleToggleBookMark, bookmark, _id }) => {
  return (
    <button onClick={() => handleToggleBookMark(_id)}>
      <i className={'bi bi-bookmark' + (bookmark ? '-fill' : '')}></i>
    </button>
  );
};

export default bookmark;