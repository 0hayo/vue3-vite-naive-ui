export interface AlarmLogsParams {
  pageNum: number
  pageSize: number
  beginDate?: string
  endDate?: string
}

export interface Result<T> {
  code: number
  msg: string
  result: T
}

export interface ResultList<T> {
  list: Array<T>
  pageNum: number
  pageSize: number
  total: number
}

export interface WarningObj {
  beginTime: string
  deviceId: string
  endTime: string
  id: string
  type: string
}

export interface StatisticsParams {
  beginDate: string
  endDate: string
}

export interface StatisticsResult {
  dt: Array<StatisticsEqArrObj>
  radar: Array<StatisticsEqArrObj>
  sonar: Array<StatisticsEqArrObj>
}

export interface StatisticsEqArrObj {
  num: number
}

export interface StatisticsChart {
  name: string
  type: string
  data: Array<number>
}