import {
  NEWS_FETCHING,
  LOAD_ARTICLES,
  DETAIL_ARTICLES
} from "../constans"

const initialState = {
  currentPage: 1,
  totalPages: 0,
  isFetching: false,
  data: [],
  detail: null,
  error: null
};

const onFetching = (lastState,payload) => {
  if(payload.type==='fetch')
    return { ...lastState, isFetching:payload.status}
  return { ...lastState, isFetching:false}
}

const newsReducer = (state = initialState, action) => {
  switch (action.type) {
    case NEWS_FETCHING: return onFetching(state, action.payload)
    case LOAD_ARTICLES:{
      const { posts, current_page, total_pages }=action.payload;
      return {
        ...state, data: [...state.data, ...posts], currentPage: current_page, totalPages: total_pages, isFetching:false, error:null
      }
    }
    case DETAIL_ARTICLES:{
      const { posts }=action.payload;
      return {
        ...state, detail:posts[0], isFetching:false, error:null
      }
    }
    default:
      return state;
  }
};
export default newsReducer;