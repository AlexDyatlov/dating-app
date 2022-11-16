import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import UserCard from '../../ui/userCard/userCard';
import QualitiesCard from '../../ui/qualitiesCard/qualitiesCard';
import MeetingsCard from '../../ui/meetingsCard/meetingsCard';
import Comments from '../../ui/comments/comments';
import { CommentsProvider } from '../../../hooks/useComments';
import { getUserById } from '../../../store/users';

const UserPage = ({ userId }) => {
  const user = useSelector(getUserById(userId));

  if (user) {
    return (
      <>
        <div className="container">
          <div className="row gutters-sm">
            <div className="col-md-4 mb-3">
              <UserCard user={user} />
              <QualitiesCard data={user.qualities} />
              <MeetingsCard value={user.completedMeetings} />
            </div>
            <div className="col-md-8">
              <CommentsProvider>
                <Comments />
              </CommentsProvider>
            </div>
          </div>
        </div>
      </>
    );
  }

  return <h1>Loading</h1>;
};

UserPage.propTypes = {
  userId: PropTypes.string.isRequired
};

export default UserPage;
