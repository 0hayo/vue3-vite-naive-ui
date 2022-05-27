import axiosInstance from "@/plugins/axios"
import { AlarmLogsParams, Result, StatisticsParams } from '@/typings/global'


export default class EquipmentApi {
  public static getDeviceList<T>(): Promise<Result<T>> {
    return axiosInstance.get('/device/list')
  };

  public static alarmLogs<T>(params: AlarmLogsParams): Promise<Result<T>> {
    return axiosInstance.get('/statistics/alarmLogs', {
      params
    })
  }

  public static statistics<T>(params: StatisticsParams): Promise<Result<T>> {
    return axiosInstance.get('/statistics/trendAlarmLog', {
      params
    })
  }
}
