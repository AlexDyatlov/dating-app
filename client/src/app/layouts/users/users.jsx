import React from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import UserPage from '../../components/page/userPage';
import UsersListPage from '../../components/page/usersListPage';
import EditUserPage from '../../components/page/editUserPage/editUserPage';
import { getCurrentUserId } from '../../store/users';
import UsersLoader from '../../components/ui/hoc/usersLoader';

const Users = () => {
  const params = useParams();
  const { userId, edit } = params;
  const currentUserId = useSelector(getCurrentUserId());

  return (
    <>
      <UsersLoader>
        {userId
          ? edit
            ? userId === currentUserId
              ? <EditUserPage />
              : <Redirect to={`/users/${currentUserId}/edit`} />
            : <UserPage userId={userId} />
          : <UsersListPage />
        }
      </UsersLoader>
    </>
  );
};

export default Users;
