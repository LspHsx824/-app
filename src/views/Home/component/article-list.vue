<template>
    <div class="list-container" ref="scrolllist">
        <van-pull-refresh v-model="isfreshLoading" @refresh="onRefresh">
            <van-list
                v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                :error.sync="error"
                error-text="请求失败，click重新加载"
                @load="onLoad"
            >
                <!-- <van-cell v-for="(item,index) in list" :key="index" :title="item.title" /> -->
                <ArticleItem v-for="item in list" 
                            :key="item.art_id" 
                            :article="item"
                            ref="listItem"
                            ></ArticleItem>
            </van-list>
        </van-pull-refresh>
    </div>
</template>

<script>
import ArticleItem from "@/components/article-item";
import { getArticleList } from "@/api/getListApi";

// import { query } from "@/utils/toolFn"
import _ from "lodash";


export default {
    name: "ArticleList",
    components: {
        ArticleItem,
    },
    // 页面被激活
    activated() {
        this.$refs.scrolllist.scrollTop = this.top
        this.fn = this.recordTopHandler();
        this.$refs.scrolllist.addEventListener("scroll",this.fn );
    },
    deactivated() {
        this.$refs.scrolllist.removeEventListener("scroll", this.fn);
    },
    data() {
        return {
            fn: null,
            top:0,
            list: [],
            newList:[],
            loading: false, // 数据是否加载中
            finished: false, // 控制 数据是否 加载完毕
            timestamp: null, // 下一页数据的 页码时间戳
            error: false, // 加载失败
            isfreshLoading: false, // 下拉刷新 状态
        };
    },
    mounted(){
        this.imageLazy()
    },
    props: ["item"],
    watch:{
        // list:{
            // handler(){
                // if(this.$refs.listItem){
                    // this.imageLazy()
                // }
            // }
        // }
    },
    methods: {
        imageLazy(){
                // let observer = new IntersectionObserver(function(changes){
                        // console.log("---",changes[0]);
                        // console.log(changes[0].target.querySelector(".van-image"));
                        // console.log(changes);

                        // changes.forEach( artileItem =>{
                        //     let container = artileItem.target
                        //     // console.log(container);
                        //     let tarParent = container.parentElement
                        //     tarParent.append(target)
                        //     observer.unobserve(container);

                        // })

                        
                // })
                // let Item = document.querySelectorAll(".item-container")[7]
                // observer.observe(Item)
                // query(".item-container").forEach( item=> observer.observe(item) )

        },
        async onRefresh() {
            try {
                /* 下拉刷新获取最新数据在顶部
              最新数据的时间戳 Date.now() */
                let {
                    data: { data },
                } = await getArticleList({
                    channel_id: this.item.id,
                    timestamp: this.timestamp,
                });
                // console.table(data.results);

                this.list.unshift(...data.results);
                this.timestamp = data.pre_timestamp;

                // 关闭下拉刷新状态
                this.isfreshLoading = false;
                // 刷新成功提示
                this.$toast(`刷新成功,更新${data.results.length}条数据`);
            } catch (err) {
                this.isfreshLoading = false;
                this.$toast(`获取数据失败`);
            }
        },
        async onLoad() {
            // 异步更新数据
            // let params = { channel_id: this.item.id, timestamp: Date.now() };
            try {
                //  let { data } = await getArticleList(0,Date.now());
                let {
                    data: { data },
                } = await getArticleList({
                    channel_id: this.item.id,
                    timestamp: this.timestamp ?? Date.now(),
                });
                this.list = [...this.list, ...data.results];
                // console.log(this.list);
                // console.log(data);

                this.loading = false;
                this.timestamp = data.pre_timestamp;

                if (data.results.length === 0) {
                    this.finished = true;
                }
            } catch (err) {
                this.error = true;
                this.loading = false;
            }
        },
        recordTopHandler() {
          // console.log("元素滚动着");
            return _.debounce(
                () => {
                    this.top = this.$refs.scrolllist.scrollTop
                },
                50,
                { trailing: true } // trailing 指定在延迟后调用
            );
        },
    },
};
</script>

<style lang="less" scope>
/* 如果需要记住每个频道滚动条的位置，
    需要给每个滚动容器设置高度(默认监听的是 body的滚动事件)
    给滚动容器设置高度，移动端最好使用 vh 和 vm */

.list-container {
    // height: 79vh; //  vh 可视区域高度  vw 可视区域宽度
    height: 81vh; //  vh 可视区域高度  vw 可视区域宽度
    overflow-y: auto;
}
</style>
