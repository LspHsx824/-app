import axios from "axios";
import store from "../store";
import { setItem, getItem } from "../utils/storage";


import {
  Toast
} from "vant";

import router from "../router/index";

const request = axios.create({
  baseURL: "http://www.liulongbin.top:8000",
  // baseURL:"http://toutiao.itheima.net"
});

const refreshRequest = axios.create({
  baseURL: "http://www.liulongbin.top:8000",
});


// 请求拦截器
// http request 拦截器
request.interceptors.request.use(
  function (config) {
    const {
      user
    } = store.state;
    if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  async (err) => {
    return Promise.reject(err);
  }
);

// Add a response interceptor  响应拦截器 处理 用户 token 过期问题
request.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {

    const status = error.response.status; // 响应状态码

    if (status === 400) {
      Toast.fail("客户端请求参数异常");
    } else if (status === 401) {
      // token 无效
      const {
        user
      } = store.state;

      if (!user || !user.token) {
        return redirectLogin();
      }
      // 拿到 refresh_token 获取新的 token 更新到容器中
      // const { refresh_token } = user
      console.log(333);

      try {
        const {
          data
        } = await axios({
          method: "PUT",
          url: "http://www.liulongbin.top:8000/v1_0/authorizations",
          headers: {
            Authorization: `Bearer ${user.refresh_token}`,
          },
        });
        user.token = data.data.token
        store.commit("setUser",user)

        console.dir(error.config);
         //把 错误的请求  重新请求 、、  发送新的请求 不能使用 同一个 axios 实例
        return  refreshRequest(error.config) // 上次 错误请求 参数配置 都在 fonfig中

      } catch (err) {
        Toast.fail("获取失败，服务器异常");
        redirectLogin()
        // console.log(err);
      }
     
    } else if (status === 403) {
      // 没有权限操作
      Toast.fail("没有权限");
    } else if (status >= 500) {
      Toast.fail("服务器异常，请稍后重试");
    }

    return Promise.reject(error);
  }
);

function redirectLogin() {
  // token 和 refresh_token 都过期返回 login 页前 需要清除  user token 
  setItem("TOKEN_KEY",null)

  router.replace({
    path:"login",
    query:{
      ReturnUrl:router.currentRoute.fullPath // 当前路由地址。只读的。
    }
  });
}

export default request;