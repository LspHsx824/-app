
import axios from "axios"
import store from "../store"


const request = axios.create({
    baseURL:"http://www.liulongbin.top:8000"
})

// 请求拦截器
// http request 拦截器
request.interceptors.request.use(function (config) {

    const { user } = store.state
    if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`
    }
    return config
  },
    err => {
      return Promise.reject(err)
    })

export default request
  
