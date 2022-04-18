<template>
    <div class="home-container">
        <!-- 头部区域 -->
        <van-nav-bar fixed>
            <!-- 头部搜索按钮 -->
            <template #title>
                <van-button class="search-btn" 
                            round
                            tpye="info" 
                            size="small" 
                            icon="search" 
                            to="/search">
                    搜索
                </van-button>
            </template>
        </van-nav-bar>

        <!-- Header 频道列表 -->
        <van-tabs v-model="active" class="channel-tabs" animated swipeable>
            <van-tab v-for="item in channelData" :key="item.id" :title="item.name">
                <Article :item="item" />
            </van-tab>

            <template #nav-right>
                <div class="horder"></div>
                <div class="more-btn" @click="isShowEdit=true">
                    <i class="ranran icon-gengduo"></i>
                </div>
            </template>
        </van-tabs>
        <!-- / 频道列表 -->

        <!-- 频道编辑 -->
        <div>
            <van-popup
                v-model="isShowEdit"
                closeable
                close-icon-position="top-left"
                position="right"
                :style="{ height: '100%',width:'100%' }"
            >
            <Editchannel :myChannelData="channelData"
                         @change-active="changeActive" 
                         :active="active"/>
            </van-popup>
        </div>
        <!-- / 频道编辑 -->

        <!-- 导入，注册，并使用 ArticleInfo 组件 -->
        <!-- 在使用组件的时候，如果某个属性名是“小驼峰”形式，则绑定属性的时候，建议改写成“连字符”格式。例如： -->
        <!-- cmtCount 建议写成 cmt-count -->

        <!-- <van-pull-refresh v-model="isLoading" :disabled="finished" @refresh="onRefresh">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <ArticleInfo
          v-for="item in artlist"
          :key="item.id"
          :title="item.title"
          :author="item.aut_name"
          :cmt-count="item.comm_count"
          :time="item.pubdate"
          :cover="item.cover"
        ></ArticleInfo>
      </van-list>
        </van-pull-refresh>-->
    </div>
</template>

<script>
import { mapState } from "vuex"

import Article from "./component/article-list.vue";
import Editchannel from "./component/channel-Edit.vue";


// 按需导入 API 接口
import { getData } from "@/api/users";
import { getItem } from "@/utils/storage"

// import _ from 'lodash'


export default {
    name: "my-Home",
    data() {
        return {
            active: 0,
            channelData: [], // 我的频道列表
            isShowEdit:false,
            fn:null
        };
    },
    computed:{
        ...mapState(["user"])
    },
    created() {
        this.loadData();
    },
    // 页面被激活
    // activated(){
    //     this.fn = this.recordTopHandler()
    //     window.addEventListener('scroll', this.fn)
    // },
    // deactivated(){
    //     window.removeEventListener('scroll', this.fn)
    // },
    mounted(){
        // this.$on("change-active",index=> this.active=index)
        // this.$on("admin",function(){
        //     console.log(123);
        // })
        // console.log(this.channelData);
    },
    methods: {
        // 获取频道列表数据
        async loadData() {

            // 用户已登录就 获取线上后台数据库的数据
            if( this.user ){
                try {
                    const { data } = await getData()
                    this.channelData = data.data.channels;
                }catch{
                   this.$toast("获取数据失败，未知错误"); 
                }    
            }else{
                // 未登录，先获取 local 本地频道数据
                const localData = getItem("localChannel")
                if( localData ){
                     this.channelData = localData;
                }else{
                    // 如果本地数据不存在，则获取 推荐频道 列表
                    const { data } = await getData()
                    this.channelData = data.data.channels;
                }
            }
        },
              changeActive(index,keepEdit = false){
                this.isShowEdit = keepEdit;  
                this.active = index;
              },
            //   recordTopHandler(){
            //       return _.debounce(
            //           ()=> {
            //               this.$route.meta.top = window.scrollY
            //           },
            //           50,
            //           { trailing:true } // trailing 指定在延迟后调用
            //       )
            //   }

       
    },

  

    // 注册组件
    components: {
        // ArticleInfo
        Article,
        Editchannel,
    },
};
</script>

List列表组件:瀑布流滚动加载，用于展示长列表。

List组件通过 loading和 finished 两个变量控制加载状态，当组件初始化或滚动到到底部时，
会触发load 事件并将loading.设置成 true，此时可以发起异步操作并更新数据，

数据更新完毕后,将 loading设置成false即可。

若数据已全部加载完毕，则直接将 finished 设置成 true即可。

- load事件:
+ List初始化后会触发一次load事件，用于加载第一屏的数据。＋如果一次请求加载的数据条数较少，导致列表内容无法铺满当前屏幕，List会继续触发load
事件，直到内容铺满屏幕或数据全部加载完成。

- loading属性:控制加载中的 loading状态＋非加载中，loading为false，此时会根据列表滚动位置判断是否触发load事件（列表内容不足一屏幕时，会直接触发）
＋加载中，loading为true，表示正在发送异步请求，此时不会触发load事件

- finished属性:控制加载结束的状态
＋在每次请求完毕后，需要手动将loading设置为false，表示本次加载结束
＋所有数据加载结束，finished为 true，此时不会触发load事件-->

<style lang="less" scoped>
.home-container {
    // height: 100vh;
    padding-top: 174px;
    // padding-bottom: 100px;
    .van-nav-bar__title {
        max-width: unset;
    }
    .search-btn {
        width: 450px;
        height: 64px;
        background-color: #5babfb;
        border: none;
        font-size: 28px;
        .van-button__icon {
            font-size: 32px;
        }
        .van-button__text {
            color: #fff;
        }
    }
    /deep/ .channel-tabs {
        .van-tabs__wrap {
            height: 82px;
            position: fixed;
            z-index: 1;
            left: 0;
            top: 92px;
            right: 0;
        }
        .van-tab {
            border-right: 1px solid #edeff3;
            min-width: 200px;
            height: 82px;
            font-size: 30px;
            color: #777777;
        }
        .van-tab--active {
            color: #333333;
        }
        .van-tabs__nav {
            padding-bottom: 0;
        }
        .van-tabs__line {
            width: 31px !important;
            height: 6px;
            background-color: #3296fa;
            bottom: 8px;
        }
        .horder {
            flex-shrink: 0;
            height: 82px;
            width: 66px;
        }
        .more-btn {
            position: fixed;
            right: 0;
            width: 66px;
            height: 82px;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #fff;
            opacity: 0.902;
            i {
                font-size: 33px;
            }
        }
    }
}
</style>
