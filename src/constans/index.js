export const API_BASE_URL = "https://www.techinasia.com/wp-json/techinasia/2.0/"
export const NEWS_FETCHING = "NEWS_FETCHING"
export const LOAD_ARTICLES = "LOAD_ARTICLES"
export const DETAIL_ARTICLES = "DETAIL_ARTICLES"
export const ARTICLE_LIMIT = 5;
export const ARTICLE_COUNT_KEY = 'articleCount';
export const LAST_RESET_KEY = 'lastReset';

export const AUTH_REQUEST = "AUTH_REQUEST";
export const AUTH_SUCCESS = "AUTH_SUCCESS";
export const AUTH_FAILURE = "AUTH_FAILURE";

export const TASK_REQUEST = "TASK_REQUEST";
export const TASK_SUCCESS = "TASK_SUCCESS";
export const TASK_DETAIL = "TASK_DETAIL";
export const TASK_FAILURE = "TASK_FAILURE";

export const USER_REQUEST = "USER_REQUEST";
export const USER_SUCCESS = "USER_SUCCESS";
export const USER_FAILURE = "USER_FAILURE";


export const LOGOUT = "LOGOUT"
export const ProjectCategory = {
  SOFTWARE: 'software',
  MARKETING: 'marketing',
  BUSINESS: 'business',
};

export const ProjectCategoryCopy = {
  [ProjectCategory.SOFTWARE]: 'Software',
  [ProjectCategory.MARKETING]: 'Marketing',
  [ProjectCategory.BUSINESS]: 'Business',
};
