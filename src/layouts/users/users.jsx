import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import UserPage from '../../components/page/userPage';
import UsersListPage from '../../components/page/usersListPage';
import EditUserPage from '../../components/page/editUserPage/editUserPage';

import api from '../../api';

const Users = () => {
  const [user, setUser] = useState();
  const params = useParams();
  const { userId, edit } = params;

  useEffect(() => {
    api.users.getById(userId).then((data) => setUser(data));
  }, [edit]);

  if (edit) {
    if (!user) {
      return <div className='container mt-5'>
        <div className='row'>
          <div className='col-md-6 offset-md-3 shadow p-4'>
            Loading...
          </div>
        </div>
      </div>;
    }
    return <EditUserPage user={user} />;
  } else if (userId) {
    return <UserPage userId={userId} />;
  } else {
    return <UsersListPage />;
  };
};

export default Users;
