import axios, { Axios } from "axios";
import responseInterceptor from "./interceptors/response";
import requestInterceptor from "./interceptors/request";

// 创建axios实例
const axiosInstance: Axios = axios.create({
  // baseURL: process.env.VUE_APP_BASE_API_PATH,
  baseURL: 'http://192.168.1.123:80/api',
  timeout: 10000,
  withCredentials: true,
});

// 请求拦截器
requestInterceptor(axiosInstance);
// 响应拦截器
responseInterceptor(axiosInstance);

export default axiosInstance;