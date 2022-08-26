import React from 'react';
import PropTypes from 'prop-types';

const Qualities = ({ color, name }) => {
  return <span className={'mx-1 p-2 badge bg-' + color}>{name}</span>;
};

Qualities.propTypes = {
  color: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};

export default Qualities;
