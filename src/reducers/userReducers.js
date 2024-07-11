import {
  USER_REQUEST,
  USER_SUCCESS,
  USER_FAILURE,
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

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_REQUEST: return onFetching(state, action.payload)
    case USER_SUCCESS:{
      const { data, paging }=action.payload;
      return {
        ...state, data: [...data], paging,  isFetching:false, error:null
      }
    }
    case USER_FAILURE: {
      const { errors }=action.payload;
      return {
        ...state, data:null, isFetching:false, error:errors
      }
    }
    default:
      return state;
  }
};
export default userReducer;