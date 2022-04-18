import Vue from "vue"
import vueRouter from "vue-router"
import {setItem,getItem} from '../utils/storage'


Vue.use(vueRouter)


const router = new vueRouter({
    routes:[
        {
            path:"/",
            redirect:"/index",
        },{
            path:"/login",
            component:()=>import("../views/Login/index.vue")
        },{
            path:"/index",
            redirect:"/index/home",
            component:()=>import("../views/index.vue"),
            children:[{
                path:"home",
                component:()=>import("../views/Home/Home.vue"),
                meta:{ keepAlive:true }
            },{
                path:"user",
                component:()=>import("../views/my/my.vue"),
                // component:()=>import("../views/User/User.vue")
            },{
                path:"ra",
                component:()=>import("../views/Ra/Ra.vue")
            },{
                path:"view",
                component:()=>import("../views/video/video.vue")
            }]
        },{
            path:"/search",
            component:()=>import("@/views/search")

        },{
            path:"/article/:article_id",
            name:"article",
            props:true,
            component:()=> import("@/views/Article")
        },{
            path:"/user/profile",
            name:"profile",
            component: ()=>import("@/views/userProfile"),
            beforeEnter:(to,from,next)=>{
                    if(getItem('TOKEN_KEY')){
                        next()
                    }
            }
        }
    ],
    
})

export default router