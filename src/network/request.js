import axios from 'axios'

export function request(config) {
    const instance = axios.create({
      baseURL: 'http://152.136.185.210:7878/api/m5',
      timeout: 5000
    })

    // .then(res => {
    //   resolve(res)
    // }).catch(err => {
    //   reject(err)
    // })
    instance.interceptors.request.use(config=>{
      // console.log(config);
      return config
      //1.比如config中一些信息不符合服务器的要求
  
      //2.比如每次发送网络请求时，都希望在界面中显示一个请求的图标
  
      //3.某些网络请求(比如登录（token)，必须携带一些特殊的信息
  
  },err=>{
      console.log(err);
  })
    //响应式拦截
    instance.interceptors.response.use(res=>{
      return res.data
    },err=>{
      console.log(err);
    })
    return instance(config)
}


//axios 的拦截器



//响应拦截
// axios.interceptors.response.use(res=>{
//     console.log(res);
// },err=>{
//     console.log(err);
// })



// export function request(config, success, failure) {
//   const instance = axios.create({
//     baseURL: 'http://123.207.32.32:8080',
//     timeout: 5000
//   })
//   //发送真正的网络请求
//   instance(config).then(
//     res => {
//       console.log(res);
//       success(res)
//     }
//   ).catch(err => {
//     console.log(err);
//     failure(err)
//   })
// }
