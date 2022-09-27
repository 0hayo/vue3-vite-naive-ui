import axiosInstance from "@/plugins/axios"
import { AlarmLogsParams, Result, StatisticsParams, EqLogsParams } from '@/typings/global'


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

  public static exceptionLogs<T>(params: EqLogsParams): Promise<Result<T>> {
    return axiosInstance.get('/statistics/exceptionLogs', {
      params
    })
  }
}
