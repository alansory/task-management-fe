import axios from "axios";
import {
  AUTH_REQUEST,
  AUTH_SUCCESS,
  AUTH_FAILURE,
  LOGOUT
} from "../constans";

export const isFetching = (payload) => ({
  type: AUTH_REQUEST,
  payload: payload,
});

export const onAction = (res, type) => ({
  type: type,
  payload: res,
});

export const login = (email, password) => {
  const bodyRequest = {
    email,
    password,
  };
  return (dispatch) => {
    dispatch(isFetching({ type: "fetch", status: true }));
    axios
      .post(`/api/auth/login`, bodyRequest, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        window.localStorage.setItem('user_traits', JSON.stringify(res.data, res.access_token));
        dispatch(onAction(res.data, AUTH_SUCCESS));
        dispatch(isFetching({ type: "fetch", status: false }));
      })
      .catch((err) => {
        dispatch(onAction(err.response.data || "Unknown error", AUTH_FAILURE));
        dispatch(isFetching({ type: "fetch", status: false }));
      });
  };
};

export const register = (bodyRequest) => {
  return (dispatch) => {
    dispatch(isFetching({ type: "fetch", status: true }));
    axios
      .post(`/api/auth/register`, bodyRequest, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        dispatch(onAction(res.data, AUTH_SUCCESS));
        dispatch(isFetching({ type: "fetch", status: false }));
      })
      .catch((err) => {
        dispatch(onAction(err.response.data || "Unknown error", AUTH_FAILURE));
        dispatch(isFetching({ type: "fetch", status: false }));
      });
  };
};

export const logout = () => {
  return (dispatch) => {
    window.localStorage.removeItem('user_traits');
    dispatch(onAction(null, LOGOUT));
  };
};

