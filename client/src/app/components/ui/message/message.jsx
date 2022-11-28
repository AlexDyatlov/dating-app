import React from 'react';
import PropTypes from 'prop-types';

const Message = ({ length }) => {
  const renderMessage = (number) => {
    const lastOne = Number(number.toString().slice(-1));

    if (number > 4 && number < 15) return 'человек тусанет';
    if ([2, 3, 4].indexOf(lastOne) >= 0) return 'человека тусанут';
    if (lastOne === 1) return 'человек тусанет';

    return 'человек тусанет';
  };

  return (
    <h2>
      <span className={'badge ' + (length > 0 ? 'bg-primary' : 'bg-danger')}>
        {length > 0
          ? `${length + ' ' + renderMessage(length)} с тобой сегодня`
          : 'Никто с тобой не тусанет'}
      </span>
    </h2>
  );
};

Message.propTypes = {
  length: PropTypes.number.isRequired
};

export default Message;
