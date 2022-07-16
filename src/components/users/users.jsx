import React, { useState } from 'react';

import api from '../../api';

const Users = () => {
  const usersArr = api.users.fetchAll();

  const [users, setUsers] = useState(usersArr);

  const handleDeleteUser = (userId) => {
    setUsers(users.filter((user) => user._id !== userId));
  };

  const renderMessage = (number) => {
    const lastOne = Number(number.toString().slice(-1));

    if (number > 4 && number < 15) return 'человек тусанет';
    if ([2, 3, 4].indexOf(lastOne) >= 0) return 'человека тусанут';
    if (lastOne === 1) return 'человек тусанет';

    return 'человек тусанет';
  };

  const renderTable = () => {
    return (
      users.length !== 0 && (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Имя</th>
              <th scope="col">Качества</th>
              <th scope="col">Профессия</th>
              <th scope="col">Встретился, раз</th>
              <th scope="col">Оценка</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <th scope="row">{user.name}</th>
                <td>
                  {user.qualities.map((label) => (
                    <span className={'mx-1 p-2 badge bg-' + label.color} key={label._id}>
                      {label.name}
                    </span>
                  ))}
                </td>
                <td>{user.profession.name}</td>
                <td>{user.completedMeetings}</td>
                <td>{user.rate} /5</td>
                <td>
                  <button type="button" className="btn btn-danger" onClick={() => handleDeleteUser(user._id)}>
                    delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )
    );
  };

  return (
    <>
      <h2>
        <span className={'badge ' + (users.length > 0 ? 'bg-primary' : 'bg-danger')}>
          {users.length > 0 ? `${users.length + ' ' + renderMessage(users.length)} с тобой сегодня` : 'Никто с тобой не тусанет'}
        </span>
      </h2>
      {renderTable()}
    </>
  );
};

export default Users;
