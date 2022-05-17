import { CONFIG, KEY_GET, SERVER_URL, SERVER_PORT, API_PATH } from '@/common/constant/event';
import { sendSync } from '@/render/utils/IpcRendererUtils';

export default class Config {
  public static SERVER_URL = sendSync<string>(CONFIG, {
    key: KEY_GET,
    name: SERVER_URL
  });
  public static SERVER_PORT: string = sendSync<string>(CONFIG, {
    key: KEY_GET,
    name: SERVER_PORT
  });
  public static API_PATH: string = sendSync<string>(CONFIG, {
    key: KEY_GET,
    name: API_PATH
  });
  public static TIME_OUT: number = 10000;
  public static WEBSOCKET_URL: string = ''

  public static getAxiosUrl() {
    return `http://${this.SERVER_URL}:${this.SERVER_PORT + this.API_PATH}`;
  }
};
