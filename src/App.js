import React, { useEffect, useState } from 'react';

import Users from './components/users/users';

import api from './api';

function App() {
  const [allUsers, setUsers] = useState();

  useEffect(() => {
    api.users.fetchAll().then((data) => setUsers(data));
  }, []);

  const handleDeleteUser = (userId) => {
    setUsers(allUsers.filter((user) => user._id !== userId));
  };

  const handleToggleBookMark = (id) => {
    setUsers(
      allUsers.map((user) =>
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
    allUsers &&
    <Users
      onDeleteUser={handleDeleteUser}
      onToggleBookMark={handleToggleBookMark}
      users={allUsers}
    />
  );
}

export default App;
