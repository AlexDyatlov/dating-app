import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { getCurrentUserId } from '../../../store/users';
import Profession from '../profession/profession';

const UserCard = ({ user }) => {
  const history = useHistory();
  const currentUserId = useSelector(getCurrentUserId());

  const handleEditUser = () => {
    history.push(history.location.pathname + '/edit');
  };

  return (
    <div className="card mb-3">
      <div className="card-body">
        {currentUserId === user._id && (
          <button
            className="position-absolute top-0 end-0 btn btn-light btn-sm"
            onClick={handleEditUser}
          >
            <i className="bi bi-gear"></i>
          </button>
        )}
        <div className="d-flex flex-column align-items-center text-center position-relative">
          <img
            src={user.image}
            className="rounded-circle shadow-1-strong me-3"
            alt="avatar"
            width="150"
          />
          <div className="mt-3">
            <h4>{user.name}</h4>
            <Profession id={user.profession} />
            <div className="text-muted">
              <i className="bi bi-caret-down-fill text-primary" role="button"></i>
              <i className="bi bi-caret-up text-secondary" role="button"></i>
              <span className="ms-2">{user.rate}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
