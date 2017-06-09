import axios from 'axios';
import Qs from 'qs';
import NProgress from 'nprogress';

// 每一个地址前都需要/api来进行反向代理的识别
let base = '/api';

function middlePromiseFun(url, params={}, type="post"){
  return   new Promise((resolve, reject) => {
      NProgress.start()
      axios({
          method: type,
          url: url,
          timeout: 30000,
          data: Qs.stringify(params)//开发模式下,需要进行反向代理。若不加，则开发模式proxy代理情况下无法传递参数
      }).then(response => {
          NProgress.done()
          resolve(response.data)
      }, err => {
          NProgress.done()
          reject(err)
      })
  })
}

export const requestLogin = (params) => {
  return middlePromiseFun(`${base}/self ajax address`)
}
export const getMovies = (params) => {
  return middlePromiseFun(`${base}/in_theaters`, params, "get")
}





