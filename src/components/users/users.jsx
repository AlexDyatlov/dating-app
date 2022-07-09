import React, { useState } from 'react';

import api from '../../api';

const Users = () => {
  const usersArr = api.users.fetchAll();

  const [users, setUsers] = useState(usersArr);

  const handleDeleteUser = (userObj) => {
    setUsers((prevState) =>
      prevState.filter((user) => {
        return user !== userObj;
      }),
    );
  };

  const renderMessage = () => {
    return users.length !== 0 ? (
      <div className="d-inline-block px-4 py-2 mb-3 mt-1 fs-3 bg-primary text-white fw-bold rounded-3">
        {users.length} человек тусанет с тобой сегодня
      </div>
    ) : (
      <div className="d-inline-block px-4 py-2 mb-3 mt-1 fs-3 bg-danger text-white fw-bold rounded-3">Никто не тусанет с тобой сегодня</div>
    );
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
                  {user.qualities.map((label, index) => (
                    <span className={'mx-1 p-2 badge bg-' + label.color} key={index}>
                      {label.name}
                    </span>
                  ))}
                </td>
                <td>{user.profession.name}</td>
                <td>{user.completedMeetings}</td>
                <td>{user.rate} /5</td>
                <td>
                  <button type="button" className="btn btn-danger" onClick={() => handleDeleteUser(user)}>
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
      {renderMessage()}
      {renderTable()}
    </>
  );
};

export default Users;
