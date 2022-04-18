<template>
    <div  class="app">
        <!-- <router-view/> -->
        <keep-alive>
          <router-view v-if="$route.meta.keepAlive" />
      </keep-alive>
      
      <router-view v-if="!$route.meta.keepAlive" />

        <!-- <van-tabbar v-model="active" > -->
        <!-- <route-link  class="van-tabbar-item ">
                <van-tabbar-item  to="/" icon="home-o">首页</van-tabbar-item>
            </route-link>
            <route-link  class="van-tabbar-item ">
                <van-tabbar-item to="/user" icon="user-o">我的</van-tabbar-item>
        </route-link>-->
        <!-- </van-tabbar> -->
    </div>
</template>

<script>
export default {
    name: "my-app",
    data() {
        return {
            active: 0,
        };
    },
};
</script>

<style lang="less" scope>
</style>
