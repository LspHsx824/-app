<template>
    <div class="user-article">
        <!-- 导航栏    -->
        <van-nav-bar
            fixed
            class="navBar"
            title="我的收藏/历史/作品"
            left-arrow
            @click-left="$router.push('/index/user')"
        />
        <!-- / 导航栏    -->
        <div class="content">
            <van-tabs v-model="active" >
                <van-tab title="收藏" to="/user-article/mylike">
                    <MyCollect></MyCollect>
                </van-tab>
                <van-tab title="历史" to="/user-article/history">
                    <MyHistory></MyHistory>
                </van-tab>
                <van-tab title="作品" to="/user-article">
                    <MyArticles></MyArticles>
                </van-tab>
            </van-tabs>
        </div>
    </div>
</template>

<script>
import MyArticles from "./components/article.vue";
import MyCollect from "./components/collect.vue";
import MyHistory from "./components/history.vue";

export default {
    name: "user-articles",
    components: {
        MyArticles,
        MyCollect,
        MyHistory,
    },
    data() {
        return {
            active: 0,
        };
    },
    props:["type"],
    watch: {
        "this.type": {
            immediate: true,
            handler() {
                switch (this.type) {
                    case "mylike":
                        this.active = 0;
                        break;
                    case "history":
                        this.active = 1;
                        break;
                    default:
                        this.active = 2;
                }
            },
        },
    },
    created() {
        // console.log(this.type);
        // console.log(this.$route.params);
    },
    // methods: {
    //     changeTag() {
    //         if()
    //     },
    // },
};
</script>

<style lang="less" scope>
.van-tabs__line {
    background-color: #3296fa;
}

.user-article {
    // position: relative;
    padding-top: 92px;
}



















</style>