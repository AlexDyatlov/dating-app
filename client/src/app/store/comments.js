import { createAction, createSlice } from '@reduxjs/toolkit';

import commentService from '../services/commentService';

const commentsSlice = createSlice({
  name: 'comments',
  initialState: {
    entities: null,
    isLoading: true,
    error: null
  },
  reducers: {
    commentsRequested: (state) => {
      state.isLoading = true;
    },
    commentsReceived: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    commentsRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    commentsCreated: (state, action) => {
      state.entities.push(action.payload);
    },
    commentsRemoved: (state, action) => {
      state.entities = state.entities.filter((c) => c._id !== action.payload);
    }
  }
});

const { reducer: commentsReducer, actions } = commentsSlice;
const {
  commentsRequested,
  commentsReceived,
  commentsRequestFailed,
  commentsCreated,
  commentsRemoved
} = actions;

const commentCreateRequested = createAction('comments/commentsCreateRequested');
const createCommentFailed = createAction('comments/createCommentFailed');
const commentDeleteRequested = createAction('comments/commentDeleteRequested');
const deleteCommentFailed = createAction('comments/deleteCommentFailed');

export const loadCommentsList = (userId) => async (dispatch) => {
  dispatch(commentsRequested());
  try {
    const { content } = await commentService.getComments(userId);
    dispatch(commentsReceived(content));
  } catch (error) {
    dispatch(commentsRequestFailed(error.message));
  }
};

export const createNewComment = (payload) => async (dispatch, getState) => {
  dispatch(commentCreateRequested());
  try {
    const { content } = await commentService.createComment(payload);
    dispatch(commentsCreated(content));
  } catch (error) {
    dispatch(createCommentFailed(error.message));
  }
};

export const deleteComment = (commentId) => async (dispatch) => {
  dispatch(commentDeleteRequested());
  try {
    const { content } = await commentService.removeComment(commentId);
    if (!content) {
      dispatch(commentsRemoved(commentId));
    }
    dispatch(commentsRemoved(content));
  } catch (error) {
    dispatch(deleteCommentFailed(error.message));
  }
};

export const getComments = () => (state) => state.comments.entities;
export const getCommentsLoadingStatus = () => (state) =>
  state.comments.isLoading;

export default commentsReducer;
