import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import api from '../../api';
import Qualities from '../qualities/qualities';

const UserPage = ({ id }) => {
  const history = useHistory();
  const [user, setUser] = useState();

  useEffect(() => {
    api.users.getById(id).then((data) => setUser(data));
  }, []);

  const handleClick = () => {
    history.replace('/users');
  };

  if (user) {
    return (
      <>
        <h2>{user.name}</h2>
        <h3>Профессия: {user.profession.name}</h3>
        <div>
          {user.qualities.map(label => (
            <Qualities {...label} key={label._id} />
          ))}
        </div>
        <div>completedMeetings: {user.completedMeetings}</div>
        <h3>Rate: {user.rate}</h3>
        <button onClick={() => handleClick()}>Все пользователи</button>
      </>
    );
  }

  return <h1>Loading</h1>;
};

export default UserPage;
