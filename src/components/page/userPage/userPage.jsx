import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import api from '../../../api';
import QualitiesList from '../../ui/qualities';

const UserPage = ({ userId }) => {
  const history = useHistory();
  const [user, setUser] = useState();

  useEffect(() => {
    api.users.getById(userId).then((data) => setUser(data));
  }, []);

  const handleEditUser = () => {
    history.push(`/users/${userId}/edit`);
  };

  if (user) {
    return (
      <>
        <h1>{user.name}</h1>
        <h2>Профессия: {user.profession.name}</h2>
        <QualitiesList qualities={user.qualities} />
        <div>completedMeetings: {user.completedMeetings}</div>
        <h2>Rate: {user.rate}</h2>
        <button onClick={handleEditUser}>Редактировать</button>
      </>
    );
  }

  return <h1>Loading</h1>;
};

UserPage.propTypes = {
  userId: PropTypes.string.isRequired
};

export default UserPage;
