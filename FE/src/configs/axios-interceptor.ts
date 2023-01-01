import axios from 'axios';

const TIMEOUT = 1 * 60 * 1000;
axios.defaults.timeout = TIMEOUT;
axios.defaults.baseURL = process.env.REACT_APP_SERVER_API_URL;

const setupAxiosInterceptors = () => {
  const onRequestSuccess = (config) => {
    const token =
      sessionStorage.getItem('authenticationToken') ||
      sessionStorage.getItem('authenticationToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  };
  const onResponseSuccess = (response) => response;
  const onResponseError = (err) => {
    return Promise.reject(err);
  };
  axios.interceptors.request.use(onRequestSuccess);
  axios.interceptors.response.use(onResponseSuccess, onResponseError);
};

export default setupAxiosInterceptors;
