import axios from "axios";

export const buildQueryString = (queryParams) => {
  if (!queryParams) return '';

  return '?' + Object.keys(queryParams)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(queryParams[key])}`)
    .join('&');
};

export const getToken = () => {
  const userTraits = localStorage.getItem("user_traits");
  if(userTraits){
    const userJson = JSON.parse(userTraits);
    return userJson.access_token;
  } else {
    return null;
  }
};

export const axiosInstance = axios.create({
  baseURL: "https://task-management-api-ten.vercel.app",
  headers: {
    "Cache-Control": "no-cache",
    "Pragma": "no-cache",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
