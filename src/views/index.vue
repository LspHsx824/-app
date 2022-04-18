<template>
  <div class="conteiner-main">
      <!-- 是否需要缓存 -->
      <!-- <keep-alive>
          <router-view v-if="$route.meta.keepAlive" />
      </keep-alive> -->
      
      <!-- <router-view v-if="!$route.meta.keepAlive" /> -->
      <!-- <keep-alive> -->
            <router-view />
      <!-- </keep-alive> -->


      <van-tabbar route>
            <van-tabbar-item replace to="/index/home" >
                <span class="text">首页</span>
                <template #icon>
                     <i class="ranran icon-shouye"></i>
                </template>
            </van-tabbar-item>
            <van-tabbar-item replace to="/index/ra" >
                <span class="text">问答</span>
                <template #icon>
                     <i class="ranran icon-wenda"></i>
                </template>
            </van-tabbar-item>
            <van-tabbar-item replace to="/index/view" >
                <span class="text">视频</span>
                <template #icon>
                     <i class="ranran icon-shipin"></i>
                </template>
            </van-tabbar-item>
            <van-tabbar-item replace to="/index/user" >
                <span class="text">{{ $store.state.user? "我的":"未登录" }}</span>
                <template #icon>
                     <i class="ranran icon-wode"></i>
                </template>
            </van-tabbar-item>
            <!-- <van-tabbar-item replace to="/" class="ranran icon-wenda">问答</van-tabbar-item>
            <van-tabbar-item replace to="/" class="ranran icon-shipin">视频</van-tabbar-item>
            <van-tabbar-item replace to="/user" icon="user-o">我的</van-tabbar-item> -->
        </van-tabbar>
  </div>
</template>

<script>
    import MyHome from "@/views/Home/Home.vue"
    import MyInfo from "@/views/my/my.vue"
export default {
    name:"my-index",
    comments:{
        MyHome,
        MyInfo
    },
    created(){
        // console.log(this.$route);
    }
}
</script>

<style lang="less" scoped>

i{
        font-size: 40px;
    }
    span{
        font-size: 20px;
    }

// .conteiner-main{
    // height: 100vh;
// }
</style>