<template>
    <div class="search-container">

        <!-- Header 搜索 -->
        <form action="/" class="fixed">
            <van-search
                v-model="keyWrod"
                show-action
                placeholder="请输入搜索关键词"
                background="#3296fa"
                @search="onSearch"
                @cancel="onCancel"
                @focus="isShowresult=false"
            />
        </form>
        <!-- / Header 搜索 -->

        <!-- 历史搜索 -->
            <Search-history v-if="!keyWrod" />

        <!-- 搜索联想  // 自定义事件是子->父传值，所以必须是子组件监听 --> 
            <Search-suggestion v-else-if="!isShowresult"
                               @search="onSearch"
                               :keyWrod="keyWrod"/>

        <!-- 搜索结果 -->
            <Search-result v-else  :keyWrod="keyWrod" />
        
        
        
    </div>
</template>

<script>


import SearchHistory from "./search-comp/search-history.vue"
import SearchResult from "./search-comp/search-result.vue"
import SearchSuggestion from "./search-comp/search-suggestion.vue"

export default {
    name: "search-Index",
    components:{
        SearchHistory,
        SearchResult,
        SearchSuggestion
    },
    data() {
        return {
            keyWrod: "",
            isShowresult:false
        };
    },
    methods: {
        onSearch(val) {
            this.keyWrod = val;
            this.isShowresult = true
        },
        onCancel() {
            this.$router.back()
        },
    },
};
</script>

<style lang="less" scoped>

.van-search__action{
    color:#fff
}
.search-container{
    padding-top:108px ;
    .fixed{
            position:fixed;
            z-index: 1;
            top:0;
            left:0;
            right:0;
        }
    // padding-top: 10px;
}

</style>