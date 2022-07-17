import React from 'react';

import User from '../user/user';

const Users = ({ handleDeleteUser, handleToggleBookMark, users }) => {
  return (
    users.length > 0 && (
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Имя</th>
            <th scope="col">Качества</th>
            <th scope="col">Профессия</th>
            <th scope="col">Встретился, раз</th>
            <th scope="col">Оценка</th>
            <th scope="col">Избранное</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <User {...user} handleDeleteUser={handleDeleteUser} handleToggleBookMark={handleToggleBookMark} key={user._id} />
          ))}
        </tbody>
      </table>
    )
  );
};

export default Users;
