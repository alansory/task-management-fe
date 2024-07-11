import axios from "axios";
import {
  LOAD_ARTICLES, 
  DETAIL_ARTICLES, 
  NEWS_FETCHING, 
  ARTICLE_COUNT_KEY, 
  LAST_RESET_KEY 
} from "../constans";

export const isFetching = (payload) => ({
  type: NEWS_FETCHING,
  payload: payload,
});

export const onSuccess = (res, type) => ({
  type: type,
  payload: res,
});

const buildQueryString = (queryParams) => {
  return Object.keys(queryParams)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(queryParams[key])}`)
    .join('&');
};

export const getNewsList = (page = 1, per_page=16) => {
  const queryParams = {
    page,
    per_page,
  };
  return (dispatch) => {
    dispatch(isFetching({ type: "fetch", status: true }));
    axios
      .get(`/api/posts?${buildQueryString(queryParams)}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        dispatch(onSuccess(res.data, LOAD_ARTICLES));
        dispatch(isFetching({ type: "fetch", status: false }));
      })
      .catch((err) => {
        dispatch(isFetching({ type: "fetch", status: false }));
      });
  };
};


export const getNewsDetail = (slug) => {
  return (dispatch) => {
    dispatch(isFetching({ type: "fetch", status: true }));
    axios
      .get(`/api/posts/${slug}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        dispatch(onSuccess(res.data, DETAIL_ARTICLES));
        dispatch(isFetching({ type: "fetch", status: false }));
      })
      .catch((err) => {
        dispatch(isFetching({ type: "fetch", status: false }));
      });
  };
};

export const getArticleCount = () => {
  const lastReset = localStorage.getItem(LAST_RESET_KEY);
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  if (lastReset) {
    const lastResetDate = new Date(lastReset);
    const lastResetMonth = lastResetDate.getMonth();
    const lastResetYear = lastResetDate.getFullYear();

    if (lastResetMonth !== currentMonth || lastResetYear !== currentYear) {
      // It's a new month, reset the count
      localStorage.setItem(ARTICLE_COUNT_KEY, '0');
      localStorage.setItem(LAST_RESET_KEY, now.toISOString());
      return 0;
    }
  } else {
    // First time visiting
    localStorage.setItem(LAST_RESET_KEY, now.toISOString());
    localStorage.setItem(ARTICLE_COUNT_KEY, '0');
    return 0;
  }

  return parseInt(localStorage.getItem(ARTICLE_COUNT_KEY), 10);
};

export const incrementArticleCount = () => {
  const count = getArticleCount();
  localStorage.setItem(ARTICLE_COUNT_KEY, (count + 1).toString());
};


