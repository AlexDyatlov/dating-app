import React from 'react';

import Qualities from '../qualities/qualities';
import Bookmark from '../bookmark/bookmark';

const user = (props) => {
  const {
    _id,
    name,
    qualities,
    profession,
    completedMeetings,
    rate,
    bookmark,
    handleDeleteUser,
    handleToggleBookMark,
  } = props;

  return (
    <tr>
      <th scope="row">{name}</th>
      <td>
        {qualities.map((label) => (
          <Qualities name={label.name} color={label.color} key={label._id} />
        ))}
      </td>
      <td>{profession.name}</td>
      <td>{completedMeetings}</td>
      <td>{rate} /5</td>
      <td>
        <Bookmark handleToggleBookMark={handleToggleBookMark} bookmark={bookmark} _id={_id} />
      </td>
      <td>
        <button type="button" className="btn btn-danger" onClick={() => handleDeleteUser(_id)}>
          delete
        </button>
      </td>
    </tr>
  );
};

export default user;
