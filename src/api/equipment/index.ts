import axiosInstance from "@/plugins/axios"

interface Result {
  code: number
  msg: string
  result: Array<any>
}

export default class EquipmentApi {
  public static getDeviceList(): Promise<Result> {
    return axiosInstance.get('/device/list')
  };
}
