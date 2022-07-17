import React from 'react';

import Qualities from '../qualities/qualities';

const user = (props) => {
  const { name, _id, qualities, profession, completedMeetings, rate } = props;
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
        <button type="button" className="btn btn-danger" onClick={() => props.handleDeleteUser(_id)}>
          delete
        </button>
      </td>
    </tr>
  );
};

export default user;
