import store from '../store';
// import { useNotification, NotificationType } from 'naive-ui';

export const getToken = () => {
  return store.getters.token || sessionStorage.getItem('token') || '';
}

export const getUserInfo = () => {
  return store.getters.userInfo || JSON.parse(sessionStorage.getItem('userInfo') as string);
}

// export const notify = (type: NotificationType = 'info', content: string = '说点啥呢', meta: string = '想不出来') => {
//   const notification = useNotification()
//   notification[type]({
//     content: content,
//     meta: meta
//   })
// }

export enum TimeType {
  yyyy_mm_dd = 'yyyy-MM-dd',
  hh_mm_ss = 'hh:mm:ss',
  hh_mm = 'hh:mm',
  week = '星期几',
  all = 'all'
}

export const FormatDate = (time: number | Date, type: string = TimeType.yyyy_mm_dd) => {
  if (!time) return;
  if (typeof time === 'number') {
    time = new Date(time);
  }
  const yyyy = time.getFullYear();
  const MM = ((time.getMonth() + 101) + '').substring(1);
  const dd = ((time.getDate() + 100) + '').substring(1);
  const hh = ((time.getHours() + 100) + '').substring(1);
  const mm = ((time.getMinutes() + 100) + '').substring(1);
  const ss = ((time.getSeconds() + 100) + '').substring(1);
  const week = time.getDay();
  const weekArr = new Array("日", "一", "二", "三", "四", "五", "六");
  let returnTime;
  switch (type) {
    case TimeType.yyyy_mm_dd:
      returnTime = `${yyyy}-${MM}-${dd}`
      break;
    case TimeType.hh_mm_ss:
      returnTime = `${hh}:${mm}:${ss}`
      break;
    case TimeType.hh_mm:
      returnTime = `${hh}:${mm}`
      break;
    case TimeType.week:
      returnTime = "星期" + weekArr[week];
      break;
    case TimeType.all:
      returnTime = [
        `${yyyy}-${MM}-${dd}`,
        `${hh}:${mm}`,
        "星期" + weekArr[week]
      ];
      break;
    default:
      break;
  }
  return returnTime;
}

export const launchFullscreen = () => {
  if(isFullscreen()) {
    document.exitFullscreen && document.exitFullscreen()
  } else {
    const element = document.body;
    element.requestFullscreen && element.requestFullscreen();
  }
}

function isFullscreen() {
  return document.fullscreenElement !== null
}