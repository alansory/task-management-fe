import axiosInstance, { buildQueryString } from './api';
import {
  COMMENT_REQUEST,
  COMMENT_SUCCESS,
  COMMENT_FAILURE,
  COMMENT_DETAIL
} from "../constans";

export const isFetching = (payload) => ({
  type: COMMENT_REQUEST,
  payload: payload,
});

export const onAction = (res, type) => ({
  type: type,
  payload: res,
});

export const saveComment = (id, payloads) => {
  if(id){
    return updateComment(id, payloads)
  } else {
    return createComment(payloads)
  }
}

export const createComment = (payloads) => {
  return (dispatch) => {
    dispatch(isFetching({ type: "fetch", status: true }));
    axiosInstance
      .post(`/comments`, payloads, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        dispatch(onAction(res.data, COMMENT_DETAIL));
        dispatch(isFetching({ type: "fetch", status: false }));
      })
      .catch((err) => {
        dispatch(onAction(err.response || "Unknown error", COMMENT_FAILURE));
        dispatch(isFetching({ type: "fetch", status: false }));
      });
  };
};

export const updateComment = (id, payloads) => {
  return (dispatch) => {
    dispatch(isFetching({ type: "fetch", status: true }));
    axiosInstance
      .put(`/comments/${id}`, payloads, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        dispatch(onAction(res.data, COMMENT_DETAIL));
        dispatch(isFetching({ type: "fetch", status: false }));
      })
      .catch((err) => {
        dispatch(onAction(err.response || "Unknown error", COMMENT_FAILURE));
        dispatch(isFetching({ type: "fetch", status: false }));
      });
  };
};

export const deleteComment = (id) => {
  return (dispatch) => {
    dispatch(isFetching({ type: "fetch", status: true }));
    axiosInstance
      .delete(`/comments/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        dispatch(onAction(res.data, COMMENT_DETAIL));
        dispatch(isFetching({ type: "fetch", status: false }));
      })
      .catch((err) => {
        dispatch(onAction(err.response || "Unknown error", COMMENT_FAILURE));
        dispatch(isFetching({ type: "fetch", status: false }));
      });
  };
};


export const getCommentList = (queryParams) => {
  return (dispatch) => {
    dispatch(isFetching({ type: "fetch", status: true }));
    axiosInstance
      .get(`/comments${buildQueryString(queryParams)}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        dispatch(onAction(res.data, COMMENT_SUCCESS));
        dispatch(isFetching({ type: "fetch", status: false }));
      })
      .catch((err) => {
        dispatch(onAction(err.response || "Unknown error", COMMENT_FAILURE));
        dispatch(isFetching({ type: "fetch", status: false }));
      });
  };
};
