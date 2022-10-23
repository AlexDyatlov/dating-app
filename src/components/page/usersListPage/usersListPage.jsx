import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import api from '../../../api';
import { paginate } from '../../../utils/paginate';
import { useUsers } from '../../../hooks/useUsers';

import Pagination from '../../common/pagination/pagination';
import GroupList from '../../common/groupList/groupList';
import Message from '../../ui/message/message';
import UsersTable from '../../ui/usersTable/usersTable';

const UsersListPage = () => {
  const pageSize = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const [profession, setProfession] = useState();
  const [selectedProf, setSelectedProf] = useState();
  const [sortBy, setSortBy] = useState({ path: 'name', order: 'asc', icon: 'up' });
  const [text, setText] = useState();

  const { users } = useUsers();

  const handleDeleteUser = (userId) => {
    // setUsers(users.filter((user) => user._id !== userId));
    console.log(userId);
  };

  const handleToggleBookMark = (id) => {
    const newArray = users.map((user) =>
      user._id === id
        ? {
          ...user,
          bookmark: !user.bookmark
        }
        : user
    );
    console.log(newArray);
  };

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  const handleSearch = ({ target }) => {
    setText(prevState => target.value);
    setSelectedProf(undefined);
    setCurrentPage(1);
  };

  const handleProfessionSelect = (item) => {
    setSelectedProf(item);
    setText('');
  };

  const handleSort = (item) => {
    setSortBy(item);
  };

  useEffect(() => {
    api.professions.fetchAll().then((data) => setProfession(data));
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedProf]);

  if (users) {
    let filteredUsers = [...users];

    if (selectedProf) {
      filteredUsers = filteredUsers.filter((user) => user.profession.name === selectedProf.name);
    };

    if (text) {
      filteredUsers = filteredUsers.filter((user) => user.name.toLowerCase().includes(text.toLowerCase()));
    };

    const count = filteredUsers.length;
    const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);
    const usersCrop = paginate(sortedUsers, currentPage, pageSize);
    const clearFilter = () => {
      setSelectedProf(undefined);
    };

    return (
      <div className="d-flex">
        {profession && (
          <div className="d-flex flex-column flex-shrink-0 p-3">
            <GroupList
              selectedItem={selectedProf}
              items={profession}
              onItemSelect={handleProfessionSelect}
            />
            <button className="btn btn-secondary mt-2" onClick={clearFilter}>
              Очистить
            </button>
          </div>
        )}
        <div className="d-flex flex-column w-100">
          <Message length={count} />
          <div className="mb-3">
            <input type="text" className="form-control" placeholder='Поиск...' onChange={handleSearch} value={text || ''}/>
          </div>
          {count > 0 && (
            <UsersTable
              users={usersCrop}
              onSort={handleSort}
              selectedSort={sortBy}
              onDeleteUser={handleDeleteUser}
              onToggleBookMark={handleToggleBookMark}
            />
          )}
          <div className="d-flex justify-content-center">
            <Pagination
              itemsCount={count}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    );
  }

  return 'loading...';
};

UsersListPage.propTypes = {
  users: PropTypes.arrayOf(PropTypes.any.isRequired)
};

export default UsersListPage;
