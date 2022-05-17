import axiosInstance from "@/plugins/axios"

export default class userApi {
  public static login(userName, password): Promise<any> {
    return axiosInstance.post('/login', {username: userName, password})
  };
}
