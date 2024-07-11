import axiosInstance, { buildQueryString } from './api';
import {
  TASK_REQUEST,
  TASK_SUCCESS,
  TASK_FAILURE,
  TASK_DETAIL
} from "../constans";

export const isFetching = (payload) => ({
  type: TASK_REQUEST,
  payload: payload,
});

export const onAction = (res, type) => ({
  type: type,
  payload: res,
});

export const getTaskList = (queryParams) => {
  return (dispatch) => {
    dispatch(isFetching({ type: "fetch", status: true }));
    axiosInstance
      .get(`/tasks${buildQueryString(queryParams)}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        dispatch(onAction(res.data, TASK_SUCCESS));
        dispatch(isFetching({ type: "fetch", status: false }));
      })
      .catch((err) => {
        dispatch(onAction(err.response.data || "Unknown error", TASK_FAILURE));
        dispatch(isFetching({ type: "fetch", status: false }));
      });
  };
};

export const getTaskDetail = (taskId, ...queryParams) => {
  return (dispatch) => {
    dispatch(isFetching({ type: "fetch", status: true }));
    axiosInstance
      .get(`/tasks/${taskId}${buildQueryString(queryParams)}`, 
      {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        dispatch(onAction(res.data, TASK_DETAIL));
        dispatch(isFetching({ type: "fetch", status: false }));
      })
      .catch((err) => {
        dispatch(onAction(err.response.data || "Unknown error", TASK_FAILURE));
        dispatch(isFetching({ type: "fetch", status: false }));
      });
  };
};

