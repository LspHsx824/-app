<template>
    <div class="search-result">
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list v-model="loading"
                    :error.sync="error"
                    error-text="加载失败，请点击重试" 
                    :finished="finished" 
                    finished-text="没有更多了" @load="onLoad">
            <van-cell v-for="item in list" :key="item.art_id" :title="item.title" />
        </van-list>
        </van-pull-refresh>
    </div>
</template>

<script>
import { searchResult } from "@/api/users";

export default {
    name: "search-result",
    props: {
        keyWrod: {
            type: String,
            require: true,
        },
    },
    data() {
        return {
            list: [],
            page: 1,
            pre_page: 20,
            loading: false,
            finished: false,
            error:false,
            refreshing:false
        };
    },

    methods: {
        async loadingSearchData() {},
        async onLoad() {
            // 异步更新数据
            try {
                const { data:{ data} } = await searchResult({
                    page: this.page,
                    pre_page: this.pre_page,
                    q: this.keyWrod,
                });
                this.list.push(...data.results);
                this.loading = false;
                 
                 if(data.results.length!=0){
                     this.page++
                 }else{
                     this.finished = true;
                 }
            } catch (err) {
                this.error = true;
                this.loading = false;
                this.$toast("搜索失败，请稍后重试");
            }
        },
    async  onRefresh(){
                const { data:{ data} } = await searchResult({
                    page: this.page,
                    pre_page: this.pre_page,
                    q: this.keyWrod,
                });

                this.list.unshift(...data.results);
                this.loading = false;
                if(data.results.length!=0){
                     this.page++
                 }else{
                     this.finished = true;
                 }
                 this.refreshing = false
        }
    },
};
</script>

<style>

</style>