import Config from './Config';
import axios, { AxiosRequestConfig } from 'axios';
import { getToken } from '.';

const service = axios.create({
  baseURL: Config.getAxiosUrl(),
  timeout: Config.TIME_OUT
});

// 请求拦截器
service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    if(config.headers) {
      config.headers['token'] = getToken() || '';
      config.headers["Cache-Control"] = "no-cache";
      config.headers["Pragma"] = "no-cache";
    }
    return config;
  },
  error => {
    Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  response => {
    const data = response.data;
    if (data.code !== 200) {
      // notify('warning', data.code, data.msg);
    } else {
      return data;
    }
  },
  error => {
    return Promise.reject(error);
  }
);

export default service;