import {
  TASK_REQUEST,
  TASK_SUCCESS,
  TASK_FAILURE,
  TASK_DETAIL
} from "../constans"

const initialState = {
  isFetching: false,
  data: [],
  paging: null,
  detail: null,
  error: null
};

const onFetching = (lastState,payload) => {
  if(payload.type==='fetch')
    return { ...lastState, isFetching:payload.status}
  return { ...lastState, isFetching:false}
}

const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case TASK_REQUEST: return onFetching(state, action.payload)
    case TASK_SUCCESS:{
      const { data, paging }=action.payload;
      return {
        ...state, data: [...data], paging,  isFetching:false, error:null
      }
    }
    case TASK_FAILURE: {
      const { errors }=action.payload;
      return {
        ...state, data:null, isFetching:false, error:errors
      }
    }
    case TASK_DETAIL: {
      const { data }=action.payload;
      return {
        ...state, detail: data, isFetching:false, error:null
      }
    }
    default:
      return state;
  }
};
export default taskReducer;