import React from 'react';

const qualities = ({ color, name }) => {
  return (
    <span className={'mx-1 p-2 badge bg-' + color}>
      {name}
    </span>
  );
};

export default qualities;
