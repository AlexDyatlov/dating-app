import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import api from '../../api';

import User from '../user/user';
import Pagination from '../pagination/pagination';
import GroupList from '../groupList/groupList';
import Message from '../message/message';
import { paginate } from '../../utils/paginate';

const Users = ({ users: allUsers, ...rest }) => {
  const pageSize = 2;
  const [currentPage, setCurrentPage] = useState(1);
  const [profession, setProfession] = useState();
  const [selectedProf, setSelectedProf] = useState();

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  const handleProfessionSelect = (item) => {
    setSelectedProf(item);
  };

  useEffect(() => {
    api.professions.fetchAll().then((data) => setProfession(data));
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedProf]);

  const filteredUsers = selectedProf
    ? allUsers.filter((user) => user.profession === selectedProf)
    : allUsers;

  const count = filteredUsers.length;
  const userCrop = paginate(filteredUsers, currentPage, pageSize);
  const clearFilter = () => {
    setSelectedProf(undefined);
  };

  return (
    <div className="d-flex">
      {profession &&
        <div className="d-flex flex-column flex-shrink-0 p-3">
          <GroupList
            selectedItem={selectedProf}
            items={profession}
            onItemSelect={handleProfessionSelect}
          />
          <button className="btn btn-secondary mt-2" onClick={clearFilter}>Очистить</button>
        </div>
      }
      <div className="d-flex flex-column w-100">
        <Message length={count} />
        {count > 0 && (
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Имя</th>
                <th scope="col">Качества</th>
                <th scope="col">Профессия</th>
                <th scope="col">Встретился, раз</th>
                <th scope="col">Оценка</th>
                <th scope="col">Избранное</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {userCrop.map((user) => (
                <User {...user} {...rest} key={user._id} />
              ))}
            </tbody>
          </table>
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
};

Users.propTypes = {
  users: PropTypes.arrayOf(PropTypes.any.isRequired)
};

export default Users;
