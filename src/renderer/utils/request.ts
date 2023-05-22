import axios from 'axios'
import { ElMessage } from 'element-plus'

//1. 创建新的axios实例，
const instance = axios.create({
  // 公共接口
  baseURL: process.env.BASE_API,
  // 超时时间 单位是ms，这里设置了6s的超时时间
  timeout: 6000
})

// 2.请求拦截器
instance.interceptors.request.use(
  (config) => {
    // config.data = JSON.stringify(config.data)
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 3.响应拦截器
instance.interceptors.response.use(
  (response) => {
    //接收到响应数据并成功后的一些共有的处理，关闭loading等
    return response
  },
  (error) => {
    /***** 接收到异常响应的处理开始 *****/
    if (error && error.response) {
      // 1.公共错误处理
      // 2.根据响应码具体处理
      switch (error.response.status) {
        case 400:
          error.message = '错误请求'
          break
        case 401:
          error.message = '未授权，请重新登录'
          break
        case 403:
          error.message = '拒绝访问'
          break
        case 404:
          error.message = '请求错误,未找到该资源'
          window.location.href = '/NotFound'
          break
        case 405:
          error.message = '请求方法未允许'
          break
        case 408:
          error.message = '请求超时'
          break
        case 500:
          error.message = '服务器端出错'
          break
        case 501:
          error.message = '网络未实现'
          break
        case 502:
          error.message = '网络错误'
          break
        case 503:
          error.message = '服务不可用'
          break
        case 504:
          error.message = '网络超时'
          break
        case 505:
          error.message = 'http版本不支持该请求'
          break
        default:
          error.message = `连接错误${error.response.status}`
      }
    } else {
      // 超时处理
      if (JSON.stringify(error).includes('timeout')) {
        ElMessage.error({
          message: '服务器响应超时，请刷新当前页',
          offset: 300
        })
      }
      error.message = '连接服务器失败'
    }

    ElMessage.error({
      message: error.message,
      offset: 300
    })
    /***** 处理结束 *****/
    //如果不需要错误处理，以上的处理过程都可省略
    return Promise.reject(error.response)
  }
)
//4.导出文件
export default instance
