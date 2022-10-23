import React from 'react';
import PropTypes from 'prop-types';

import { useQualities } from '../../../hooks/useQuality';

const Qualities = ({ id }) => {
  const { isLoading, getQuality } = useQualities();
  const quality = getQuality(id);

  if (!isLoading) {
    return (
      <span className={'mx-1 p-2 badge bg-' + quality.color}>
        {quality.name}
      </span>
    );
  } else {
    return 'Loading...';
  }
};

Qualities.propTypes = {
  id: PropTypes.string
};

export default Qualities;
