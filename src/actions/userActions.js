import axiosInstance, { buildQueryString } from './api';
import {
  USER_REQUEST,
  USER_SUCCESS,
  USER_FAILURE
} from "../constans";

export const isFetching = (payload) => ({
  type: USER_REQUEST,
  payload: payload,
});

export const onAction = (res, type) => ({
  type: type,
  payload: res,
});

export const getUserList = (queryParams) => {
  return (dispatch) => {
    dispatch(isFetching({ type: "fetch", status: true }));
    axiosInstance
      .get(`/users${buildQueryString(queryParams)}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        dispatch(onAction(res.data, USER_SUCCESS));
        dispatch(isFetching({ type: "fetch", status: false }));
      })
      .catch((err) => {
        dispatch(onAction(err.response.data || "Unknown error", USER_FAILURE));
        dispatch(isFetching({ type: "fetch", status: false }));
      });
  };
};

