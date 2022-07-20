import React from 'react';
import PropTypes from 'prop-types';

import Qualities from '../qualities/qualities';
import Bookmark from '../bookmark/bookmark';

const User = ({
  _id,
  name,
  qualities,
  profession,
  completedMeetings,
  rate,
  bookmark,
  onDeleteUser,
  onToggleBookMark
}) => {
  return (
    <tr>
      <td>{name}</td>
      <td>
        {qualities.map((label) => (
          <Qualities {...label} key={label._id} />
        ))}
      </td>
      <td>{profession.name}</td>
      <td>{completedMeetings}</td>
      <td>{rate} /5</td>
      <td>
        <Bookmark onClick={() => onToggleBookMark(_id)} status={bookmark} />
      </td>
      <td>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => onDeleteUser(_id)}
        >
          delete
        </button>
      </td>
    </tr>
  );
};

User.propTypes = {
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  qualities: PropTypes.arrayOf(PropTypes.object.isRequired),
  profession: PropTypes.objectOf(PropTypes.string.isRequired),
  completedMeetings: PropTypes.number.isRequired,
  rate: PropTypes.number.isRequired,
  bookmark: PropTypes.bool.isRequired,
  onDeleteUser: PropTypes.func.isRequired,
  onToggleBookMark: PropTypes.func.isRequired
};

export default User;
