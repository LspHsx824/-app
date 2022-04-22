import Vue from "vue";
import vueRouter from "vue-router";
import { setItem, getItem } from "../utils/storage";

import { Dialog } from "vant"

Vue.use(vueRouter);

const router = new vueRouter({
  routes: [
    {
      path: "/",
      redirect: "/index",
    },
    {
      path: "/login",
      name:"login",
      beforeEnter (to, from, next) {
        // console.log(from);
        next()
          if(getItem("TOKEN_KEY")){
              next({
                path:from.fullPath
              })
          }else{
            next()
          }
      },
      component: () => import("../views/Login/index.vue"),
    },
    {
      path: "/index",
      redirect: "/index/home",
      component: () => import("../views/index.vue"),
      children: [
        {
          path: "home",
          component: () => import("../views/Home/Home.vue"),
          meta: { keepAlive: true },
        },
        {
          path: "user",
          component: () => import("../views/my/my.vue"),
          // component:()=>import("../views/User/User.vue")
        },
        {
          path: "ra",
          component: () => import("../views/Ra/Ra.vue"),
        },
        {
          path: "view",
          component: () => import("../views/video/video.vue"),
        },
      ],
    },
    {
      path: "/search",
      component: () => import("@/views/search"),
    },
    {
      path: "/article/:article_id",
      name: "article",
      meta: { keepAlive: true },
      props: true,
      component: () => import("@/views/Article"),
    },
    {
      path: "/user/profile",
      name: "profile",
      meta: { isAuth: true },
      component: () => import("@/views/userProfile"),
      // beforeEnter: (to, from, next) => {
      //   if (getItem("TOKEN_KEY")) {
      //     next();
      //   }
      // },
    },{
      path: "/user-article/:type?",
      name: "user-article",
      props: true,
      meta: { isAuth: true },
      component: () => import("@/views/User-article"),
    },{
      path: "/user-chat",
      name: "user-chat",
      meta: { isAuth: true },
      component: () => import("@/views/User-chat"),
    },
  ],
});




router.beforeEach((to,from,next)=>{
  if(!to.meta.isAuth){
    next()
    
  }else{
    if(getItem("TOKEN_KEY")){
        next()
    }else{
      
      Dialog.confirm({
        title: '访问提示',
        message: '请登录后访问，确定登录吗？',
      })
        .then(() => {
          // on confirm
          next({
            name:"login",
            query:{
              ReturnUrl:to.fullPath
            }
          })
        })
        .catch(() => {
          // on cancel
          next(false)
        });
    }
  }
})

export default router;
