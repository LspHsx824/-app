<template>
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <!-- <van-cell
      v-for="item in list"
      :key="item.art_id"
      :title="item.title"
      @click="
        $router.push({
          name: 'article',
          params: {
            article_id: item.art_id,
          },
        })
      "
        />-->
        <div v-for="(item, index) in list" :key="index">
            <MyArticle :article="item"></MyArticle>
            <div class="bottom-ctn">
                <van-button type="default">
                    <template #icon>
                        <van-icon name="comment-o" badge="99+" />
                    </template>
                    评论
                </van-button>

                <van-button type="default">
                    <template #icon>
                        <LikeArticle :articleid="item.art_id"></LikeArticle>
                    </template>
                    点赞
                </van-button>

                <van-button type="default">
                    <template #icon>
                        <CollectedBtn :articleid="item.art_id" />
                    </template>
                    收藏
                </van-button>
            </div>
        </div>
    </van-list>
</template>

<script>
import { getCollerArticles } from "@/api/getListApi";
import { getArticleById } from "@/api/getListApi";

import MyArticle from "@/components/article-item";

import LikeArticle from "@/components/likeArticle";
import CollectedBtn from "@/components/collected-btn";

export default {
    name: "my-collect",
    components: {
        MyArticle,
        LikeArticle,
        CollectedBtn,
    },
    data() {
        return {
            list: [],
            loading: false,
            finished: false,
            page: 1,
            per_page: 10,
            article: {},
        };
    },
    methods: {
        async onLoad() {
            // 异步更新数据
            try {
                const {
                    data: { data },
                } = await getCollerArticles({
                    page: this.page,
                    per_page: this.per_page,
                });
                // console.log(data);
                this.list.push(...data.results);
                this.loading = false;

                // console.log(this.list[0]);

                if (data.results.length > 0) {
                    this.page++;
                } else {
                    this.finished = true;
                }
            } catch (err) {
                this.$toast("获取失败，请重试");
            }
        },
        //  async getArticleInfo(id) {
        //   try {
        //     const { data } = await getArticleById(id);
        //     this.article = data.data;
        //   } catch (err) {
        //     if (err.response && err.response.status == 404) {
        //       this.$toast("请求数据出错,请稍后重试");
        //     }
        //   }
        // },
    },
};
</script>

<style lang="less" scoped>
.van-grid {
    height: 90px;
    padding: 0;
}
.van-button {
    border: none;
    width: 100%;
}
.bottom-ctn{
  display: flex;
  justify-content: center;
  align-items: center;
}


.van-button__content {
    vertical-align: middle;
}
.van-button__icon i {
    font-size: 32px;
}
.van-info {
    line-height: 1;
}
</style>
