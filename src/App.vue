<template>
    <div  class="app">
        <!-- <router-view/> -->
        <keep-alive>
          <router-view v-if="$route.meta.keepAlive" />
      </keep-alive>

        <!-- <keep-alive :include="cachePages"> -->
          <!-- <router-view  /> -->
      <!-- </keep-alive> -->
      
      <router-view v-if="!$route.meta.keepAlive" />

    </div>
</template>

<script>
export default {
    name: "my-app",
    data() {
        return {
            active: 0,
            cachePages:[]
        };
    },
    created(){
        // console.log(222);
        // this.$store.commit("addCachePage","MyIndex")
        // this.cachePages = this.$store.state.cachePages
        // console.log(this.$store.state.cachePages);
        // this.$store
    }
    
};
</script>

<style lang="less" scoped>
</style>
