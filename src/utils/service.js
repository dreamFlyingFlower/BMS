import axios from 'axios';
import { Message } from 'element-ui';
import store from '@/store';
import {showFullScreenLoading,tryHideFullScreenLoading} from './loading';

/**
 * process是node的一个全局变量,哪里都可以用,如果是全局配置可写在config的dev.env.js和prod.env.js中
 * 这是开发环境和生成环境的配置文件
 */
// 创建一个实例
const service = axios.create({
  baseURL: process.env.API_ROOT, //请求后台接口的基础url
  timeout: process.env.TIME_OUT  //请求超时时间
});

// 设置请求头contenttype,使用restful接口;当使用post请求时,数据需要用data:data,其他可直接使用params
axios.defaults.headers.post['Content-Type'] = 'application/json';

// 请求拦截
service.interceptors.request.use(
  config => {
    // 全局请求遮罩层
    showFullScreenLoading();
    if (store.getters.token) {
      // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
      config.headers['X-Token'] = sessionStorage.getItem("SET_TOKEN");
    }
    return config;
  },
  error => {
    console.log(error);
    Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  response => {
    tryHideFullScreenLoading();
    // 请求失败
    let resp = response.data;
    if (resp.code !== 1) {
      Message({
        message: resp.message,
        type: 'error',
        duration: 3000
      });
      // -9998:非法的token; -9997:其他客户端登录了;  -9996:Token 过期了;
      if (resp.code === -9998 || resp.code === -9997 || resp.code === -9996) {
        this.$router.push("/login");
      }
      // return Promise.resolve(response.message);
    } else {
      return response.data;
    }
  },
  error => {
    tryHideFullScreenLoading();
    console.log('err' + error);
    Message({
      message: error.message,
      type: 'error',
      duration: 3000
    })
    // return Promise.reject(error);
  }
);

export default service;
