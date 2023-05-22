import request from './request'
import { AxiosRequest } from './type'

const http = {
  /**
   * methods: 请求
   * @param url 请求地址
   * @param params 请求参数
   */
  get(url, params = null) {
    const config: AxiosRequest = {
      method: 'GET',
      url: url
    }
    if (params) config.params = params
    return request(config)
  },
  post(url, params) {
    const config: AxiosRequest = {
      method: 'POST',
      url: url
    }
    if (params) config.data = params
    return request(config)
  },
  put(url, params) {
    const config: AxiosRequest = {
      method: 'PUT',
      url: url
    }
    if (params) config.params = params
    return request(config)
  },
  delete(url, params) {
    const config: AxiosRequest = {
      method: 'DELETE',
      url: url
    }
    if (params) config.params = params
    return request(config)
  }
}
//导出
export default http
