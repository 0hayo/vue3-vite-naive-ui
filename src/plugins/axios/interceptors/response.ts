import { Axios } from "axios";

export default (axiosInstance: Axios): void => {
  //  响应拦截器
  axiosInstance.interceptors.response.use(
    (response) => {
      const { responseType } = response.config;
      // 不拦截blob
      if (responseType === "blob") {
        return response;
      }
      const { code, msg } = response.data;
      // 处理失败请求
      if (code !== 200) {
        window.$message.error(msg);
        return Promise.reject(msg);
      }
      return response.data;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
};