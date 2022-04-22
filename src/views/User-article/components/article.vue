<template>
  <div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <!-- <van-cell
            v-for="item in list" 
            :key="item.art_id" 
            :title="item.title"
            @click="$router.push({
                name:'article',
                params:{
                    article_id: item.art_id
                }
            })" 
            >-->
      <MyArticle
            v-for="item in list"
            :key="item.art_id"
            :article="item"
        />
      <!-- </van-cell> -->
    </van-list>
  </div>
</template>

<script>
import { getCurUserArticles } from "@/api/getListApi";

import MyArticle from "@/components/article-item";

export default {
  name: "my-article",
  components: {
    MyArticle,
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      per_page: 10,
    };
  },
  methods: {
    async onLoad() {
      // 异步更新数据
      try {
        const {
          data: { data },
        } = await getCurUserArticles({
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
  },
};
</script>

<style></style>
