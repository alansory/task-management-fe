import {
  AUTH_REQUEST,
  AUTH_SUCCESS,
  AUTH_FAILURE,
  LOGOUT
} from "../constans"

const initialState = {
  isFetching: false,
  data: null,
  error: null
};

const onFetching = (lastState,payload) => {
  if(payload.type==='fetch')
    return { ...lastState, isFetching:payload.status}
  return { ...lastState, isFetching:false}
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_REQUEST: return onFetching(state, action.payload)
    case AUTH_SUCCESS:{
      const { data }=action.payload;
      return {
        ...state, data: {...state.data, ...data}, isFetching:false, error:null
      }
    }
    case AUTH_FAILURE: {
      const { errors }=action.payload;
      return {
        ...state, data:null, isFetching:false, error:errors
      }
    }
    case LOGOUT: {
      return {
        ...state, data: null, isFetching:false, error:null
      }
    }
    default:
      return state;
  }
};
export default authReducer;