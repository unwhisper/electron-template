import http from '@renderer/utils/http'

const API = {
  //登录二维码
  webLoginCode() {
    return http.get('Login/webLoginCode')
  },
  //登录
  webLogin(event_key) {
    let data = {
      event_key: event_key
    }
    return http.post('Login/webLogin', data)
  },
  //退出登录
  webLogout(token) {
    let data = {
      token: token
    }
    return http.post('Login/webLogout', data)
  }
}

export default API
