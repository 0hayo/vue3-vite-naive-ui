import { Axios } from "axios";
import { getToken } from '@/utils/index';

export default (axiosInstance: Axios): void => {
  axiosInstance.interceptors.request.use((config) => {
    if(config.headers) {
      config.headers['token'] = getToken();
    }
    return config;
  });
};