import axiosInstance, { buildQueryString } from './api';
import {
  TASK_REQUEST,
  TASK_SUCCESS,
  TASK_FAILURE,
  TASK_DETAIL,
  TASK_DELETE
} from "../constans";

export const isFetching = (payload) => ({
  type: TASK_REQUEST,
  payload: payload,
});

export const onAction = (res, type) => ({
  type: type,
  payload: res,
});

export const saveTask = (id, payloads) => {
  if(id){
    return updateTask(id, payloads)
  } else {
    return createTask(payloads)
  }
}

export const createTask = (payloads) => {
  return (dispatch) => {
    dispatch(isFetching({ type: "submit", status: true }));
    axiosInstance
      .post(`/tasks`, payloads, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        dispatch(onAction(res.data, TASK_DETAIL));
        dispatch(isFetching({ type: "submit", status: false }));
      })
      .catch((err) => {
        dispatch(onAction(err.response.data || "Unknown error", TASK_FAILURE));
        dispatch(isFetching({ type: "submit", status: false }));
      });
  };
};

export const updateTask = (id, payloads) => {
  return (dispatch) => {
    dispatch(isFetching({ type: "submit", status: true }));
    axiosInstance
      .put(`/tasks/${id}`, payloads, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        dispatch(onAction(res.data, TASK_DETAIL));
        dispatch(isFetching({ type: "submit", status: false }));
      })
      .catch((err) => {
        dispatch(onAction(err.response.data || "Unknown error", TASK_FAILURE));
        dispatch(isFetching({ type: "submit", status: false }));
      });
  };
};

export const deleteTask = (id) => {
  return (dispatch) => {
    dispatch(isFetching({ type: "submit", status: true }));
    axiosInstance
      .delete(`/tasks/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        dispatch(onAction(res.data, TASK_DELETE));
        dispatch(isFetching({ type: "submit", status: false }));
      })
      .catch((err) => {
        dispatch(onAction(err.response.data || "Unknown error", TASK_FAILURE));
        dispatch(isFetching({ type: "submit", status: false }));
      });
  };
};


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

