import store from '@/store'
import axios from 'axios'
import { Toast } from 'vant'
const request = axios.create({
  // 接口调用基础地址：http://cba.itlike.com/public/index.php?s=/api/
  baseURL: 'http://cba.itlike.com/public/index.php?s=/api/',
  timeout: 5000
//   headers: { 'X-Custom-Header': 'foobar' }
})

// 自定义配置
// 添加请求拦截器
request.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  Toast.loading({
    message: '请求中...',
    // position: 'bottom',
    forbidClick: true,
    loadingType: 'spinner',
    duration: 0
  })

  // 只要有token在，3. 请求拦截器中，统一携带 token
  const token = store.getters.token
  if (token) {
    config.headers['Access-Token'] = token
    config.headers.platform = 'H5'
  }
  return (config)
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
request.interceptors.response.use(function (response) {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么

  const res = response.data
  console.log(res)
  if (res.status !== 200) {
    Toast(res.message)
    return Promise.reject(res.message)
  } else {
    // 清除 loading 中的效果
    Toast.clear()
  }
  return res
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  return Promise.reject(error)
})
export default request
