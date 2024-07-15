import {
  COMMENT_REQUEST,
  COMMENT_SUCCESS,
  COMMENT_FAILURE,
  COMMENT_DETAIL
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

const commentReducer = (state = initialState, action) => {
  switch (action.type) {
    case COMMENT_REQUEST: return onFetching(state, action.payload)
    case COMMENT_SUCCESS:{
      const { data, paging }=action.payload;
      return {
        ...state, data: [...data], paging,  isFetching:false, error:null
      }
    }
    case COMMENT_DETAIL:{
      const { data }=action.payload;
      return {
        ...state, detail: data,  isFetching:false, error:null
      }
    }
    case COMMENT_FAILURE: {
      const { errors }=action.payload;
      return {
        ...state, data:null, isFetching:false, error:errors
      }
    }
    default:
      return state;
  }
};
export default commentReducer;