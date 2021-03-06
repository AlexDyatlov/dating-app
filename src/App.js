import React, { useState } from 'react';

import Message from './components/message/message';
import Users from './components/users/users';

import api from './api';

function App() {
  const usersArr = api.users.fetchAll();
  const [users, setUsers] = useState(usersArr);

  const handleDeleteUser = (userId) => {
    setUsers(users.filter((user) => user._id !== userId));
  };

  const handleToggleBookMark = (id) => {
    setUsers(
      users.map((user) =>
        user._id === id
          ? {
            ...user,
            bookmark: !user.bookmark
          }
          : user
      )
    );
  };

  return (
    <>
      <Message length={users.length} />
      <Users
        onDeleteUser={handleDeleteUser}
        onToggleBookMark={handleToggleBookMark}
        users={users}
      />
    </>
  );
}

export default App;
