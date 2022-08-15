import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import BookMark from '../bookmark/bookmark';
import QualitiesList from '../qualitiesList/qualitiesList';
import Table from '../table/table';

const UsersTable = ({
  users,
  onSort,
  selectedSort,
  onToggleBookMark,
  onDeleteUser
}) => {
  const columns = {
    name: {
      path: 'name',
      name: 'Имя',
      component: (user) => <Link key={user._id} to={`users/${user._id}`}>{user.name}</Link>
    },
    qualities: {
      name: 'Качества',
      component: (user) => <QualitiesList qualities={user.qualities} />
    },
    professions: { path: 'profession.name', name: 'Профессия' },
    completedMeetings: { path: 'completedMeetings', name: 'Встретился, раз' },
    rate: { path: 'rate', name: 'Оценка' },
    bookmark: {
      path: 'bookmark',
      name: 'Избранное',
      component: (user) => (
        <BookMark
          onClick={() => onToggleBookMark(user._id)}
          status={user.bookmark}
        />
      )
    },
    delte: {
      component: (user) => (
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => onDeleteUser(user._id)}
        >
          delete
        </button>
      )
    }
  };

  return (
    <Table
      onSort={onSort}
      selectedSort={selectedSort}
      columns={columns}
      data={users}
    />
  );
};

UsersTable.propTypes = {
  users: PropTypes.array.isRequired,
  onSort: PropTypes.func.isRequired,
  selectedSort: PropTypes.object.isRequired,
  onToggleBookMark: PropTypes.func.isRequired,
  onDeleteUser: PropTypes.func.isRequired
};

export default UsersTable;
