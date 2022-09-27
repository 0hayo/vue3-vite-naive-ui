export default class Config {
  public static TIME_OUT: number = 10000;
  public static WEBSOCKET_URL: string = ''

  public static getAxiosUrl() {
    return `http://192.168.1.193:80/admin`;
  }
};