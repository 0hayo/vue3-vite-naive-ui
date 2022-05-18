import axios, { Axios } from "axios";
import responseInterceptor from "./interceptors/response";
import requestInterceptor from "./interceptors/request";

const apiUrl = localStorage.getItem('apiUrl') || '127.0.0.1';

// 创建axios实例
const axiosInstance: Axios = axios.create({
  // baseURL: process.env.VUE_APP_BASE_API_PATH,
  baseURL: `http://${apiUrl}:80/admin/api`,
  timeout: 10000,
  withCredentials: true,
});

// 请求拦截器
requestInterceptor(axiosInstance);
// 响应拦截器
responseInterceptor(axiosInstance);

export default axiosInstance;