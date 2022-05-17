/* eslint-disable no-undef */
// import { Modal, notification } from 'antd';
// import Config from "./config";

const WEBSOCKET_URL = '192.168.1.155'

class WebSocketHelper {
  private static instance: WebSocketHelper;
  private static serverInstance: WebSocketHelper;
  private ws: WebSocket = null!;
  private connectTimer: NodeJS.Timeout = null!;
  private heartBeatTimer: NodeJS.Timeout = null!;
  private waitHeartBeatTimer: NodeJS.Timeout = null!;
  private readonly heartBeatTime: number = 5000;
  private readonly reconnectTime: number = 5000;
  private readonly reconnectMaxNum: number = 10;
  private url: string = null!;

  public constructor(url: string = WEBSOCKET_URL) {
    this.url = url;
    // this.start();
  };

  public static getInstance(): WebSocketHelper {
    if (!this.instance) {
      this.instance = new WebSocketHelper();
    };
    return this.instance;
  };

  public static getServerInstance(url?: string): WebSocketHelper {
    if (!this.serverInstance) {
      this.serverInstance = new WebSocketHelper(url);
    };
    return this.serverInstance;
  };

  // public static close() {
  //   this.instance?.close();
  //   this.instance = null!;
  // };

  public start() {
    console.log('websocket start');
    if(this.ws) {
      // notification.warning({
      //   message: '提示',
      //   description: '连接已开启！',
      //   duration: Config.NOTIFICATION_DURATION
      // });
      return;
    };

    try {
      this.ws = new WebSocket(this.url);
      this.ws.onclose = (event) => {
        this.onclose(event);
      };
      this.ws.onerror = (event) => {
        this.onerror(event);
      };
      // this.ws.onmessage = (event) => {
      //   this.onmessage(event);
      // };
      this.ws.onopen = (event) => {
        this.onopen(event);
      };
    } catch (error: any) {
      console.log(error.message);
    };
    return this;
  };

  public onclose(event: CloseEvent) {
    console.log('websocket onclose');
    this.ws = null!;
    // notification.warning({
    //   message: '提示',
    //   description: '连接已关闭！',
    //   duration: Config.NOTIFICATION_DURATION
    // });
  };

  public onerror(event: Event) {
    console.log('websocket onerror');
    // Modal.destroyAll();
    // Modal.confirm({
    //   title: '提示',
    //   content: '与服务器断开连接！',
    //   okText: '重新连接',
    //   onOk: () => {
    //     this.reconnect();
    //   }
    // });
  };

  // public onmessage(event: MessageEvent<any>) {
  //   console.log('websocket onmessage');
  //   const message = JSON.parse(event.data);
  //   switch (message?.type) {
  //     case "heartBeat":
  //       // this.heartCheck();
  //       break;
  //     default:
  //       break;
  //   };
  // };

  public onopen(event: Event) {
    console.log('websocket onopen');
    this.connectTimer && clearInterval(this.connectTimer);
    // notification.warning({
    //   message: '提示',
    //   description: '连接成功！',
    //   duration: Config.NOTIFICATION_DURATION
    // });
    // 心跳检测
    // this.heartCheck();
  };

  public clearTimer() {
    this.heartBeatTimer && clearInterval(this.heartBeatTimer);
    this.waitHeartBeatTimer && clearInterval(this.waitHeartBeatTimer);
    this.connectTimer && clearInterval(this.connectTimer);
  };

  public close() {
    console.log('websocket close');
    this.clearTimer();
    this.ws && this.ws.close();
    this.ws = null!;
  };

  public reconnect() {
    console.log('websocket reconnect');
    if (!this.ws || this.ws.readyState === WebSocket.CLOSED || this.ws.readyState === WebSocket.CONNECTING) {
      let reconnectNum = 1;
      this.connectTimer && clearInterval(this.connectTimer);
      this.connectTimer = setInterval(() => {
        console.log(`Disconnect from the server, begin reconnect at ${reconnectNum}`);
        this.start();
        reconnectNum = reconnectNum + 1;
        if (reconnectNum > this.reconnectMaxNum) {
          this.connectTimer && clearInterval(this.connectTimer);
          this.connectTimer = null!;
        }
      }, this.reconnectTime);
    }
  };

  public heartCheck(str: string = "heartBeat") {
    console.log('websocket heartCheck');
    this.clearTimer();
    this.heartBeatTimer = setTimeout(() => {
      this.ws?.send(str);
      this.waitHeartBeatTimer = setTimeout(() => {
        if (this.ws?.readyState !== WebSocket.OPEN) {
          this.ws?.close();
        }
      }, this.heartBeatTime);
    }, this.heartBeatTime);
  };

  public send(data: any) {
    console.log('send', data);
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws?.send(JSON.stringify(data));
    } else {
      // notification.warning({
      //   message: '提示',
      //   description: '正在连接中，请稍后再试！',
      //   duration: Config.NOTIFICATION_DURATION
      // });
    }
  };

  public getMessage(callback: Function) {
    console.log('websocket getMessage');
    if(!this.ws) return;
    this.ws.onmessage = (event: MessageEvent<any>) => {
      const message = JSON.parse(event.data);
      console.log('msg', message);
      // if (message?.type === "heartBeat") {
      //   // this.heartCheck();
      //   return;
      // }
      callback && callback(message);
    };
  };

  public getStatus() {
    return this.ws?.readyState;
  };
};

export default WebSocketHelper;


