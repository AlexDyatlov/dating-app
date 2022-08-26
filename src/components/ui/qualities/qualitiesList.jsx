import React from 'react';
import PropTypes from 'prop-types';

import Qualities from '../qualities/qualities';

const QualitiesList = ({ qualities }) => {
  return (
    <>
      {qualities.map((label) => (
        <Qualities {...label} key={label._id} />
      ))}
    </>
  );
};

QualitiesList.propTypes = {
  qualities: PropTypes.array.isRequired
};

export default QualitiesList;
