import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { useSelector } from 'react-redux';

import { paginate } from '../../../utils/paginate';
import { useUser } from '../../../hooks/useUsers';
import { useAuth } from '../../../hooks/useAuth';

import Pagination from '../../common/pagination/pagination';
import GroupList from '../../common/groupList/groupList';
import Message from '../../ui/message/message';
import UsersTable from '../../ui/usersTable/usersTable';
import { getProfessions, getProfessionsLoadingStatus } from '../../../store/professions';

const UsersListPage = () => {
  const pageSize = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProf, setSelectedProf] = useState();
  const [sortBy, setSortBy] = useState({ path: 'name', order: 'asc', icon: 'up' });
  const [text, setText] = useState('');
  const professions = useSelector(getProfessions());
  const professionLoading = useSelector(getProfessionsLoadingStatus());
  const { users } = useUser();
  const { currentUser } = useAuth();

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
    setCurrentPage(1);
  }, [selectedProf]);

  if (users) {
    function filterUsers(data) {
      const filteredUsers = text
        ? data.filter(
          (user) =>
            user.name.toLowerCase().indexOf(text.toLowerCase()) !== -1
        )
        : selectedProf
          ? data.filter(
            (user) =>
              JSON.stringify(user.profession) === JSON.stringify(selectedProf)
          )
          : data;
      return filteredUsers.filter((u) => u._id !== currentUser._id);
    }
    const filteredUsers = filterUsers(users);
    const count = filteredUsers.length;
    const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);
    const usersCrop = paginate(sortedUsers, currentPage, pageSize);
    const clearFilter = () => {
      setSelectedProf(undefined);
    };

    return (
      <div className="d-flex">
        {professions && !professionLoading && (
          <div className="d-flex flex-column flex-shrink-0 p-3">
            <GroupList
              selectedItem={selectedProf}
              items={professions}
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
            <input
              type="text"
              className="form-control"
              placeholder="Поиск..."
              onChange={handleSearch}
              value={text}
            />
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
