import React from 'react';

import Qualities from '../qualities/qualities';
import Bookmark from '../bookmark/bookmark';

const user = ({
  _id,
  name,
  qualities,
  profession,
  completedMeetings,
  rate,
  bookmark,
  onDeleteUser,
  onToggleBookMark,
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
        <button type="button" className="btn btn-danger" onClick={() => onDeleteUser(_id)}>
          delete
        </button>
      </td>
    </tr>
  );
};

export default user;