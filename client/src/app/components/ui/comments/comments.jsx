import React, { useEffect } from 'react';
import { orderBy } from 'lodash';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import CommentsList, { AddCommentForm } from '../../common/comments';
import {
  getComments,
  getCommentsLoadingStatus,
  loadCommentsList,
  createNewComment,
  deleteComment
} from '../../../store/comments';

const Comments = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadCommentsList(userId));
  }, [userId]);
  const isLoading = useSelector(getCommentsLoadingStatus());
  const comments = useSelector(getComments());

  const handleSubmit = (data) => {
    dispatch(createNewComment({ ...data, pageId: userId }));
  };

  const handleRemoveComment = (id) => {
    dispatch(deleteComment(id));
  };

  const sortedComments = orderBy(comments, ['created_at'], 'desc');

  return (
    <>
      <div className="card mb-2">
        {' '}
        <div className="card-body">
          <AddCommentForm onSubmit={handleSubmit} />
        </div>
      </div>
      <div className="card mb-3">
        <div className="card-body">
          <h2>Comments</h2>
          <hr />
          {!isLoading
            ? <CommentsList
              comments={sortedComments}
              onRemove={handleRemoveComment}
            />
            : 'Loading...'
          }
        </div>
      </div>
    </>
  );
};

export default Comments;
