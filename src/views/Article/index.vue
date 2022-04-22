<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar
      @click-left="goBack"
      class="page-nav-bar"
      left-arrow
      title="黑马头条"
    ></van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap" ref="scrollWrap">
      <!-- 加载中 -->
      <div v-if="loading" class="loading-wrap">
        <van-loading color="#3296fa" vertical>加载中</van-loading>
      </div>
      <!-- /加载中 -->

      <!-- 加载完成-文章详情 -->
      <div v-else-if="article.title" class="article-detail">
        <!-- 文章标题 -->
        <h1 class="article-title">{{ article.title }}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            :src="article.aut_photo"
          />
          <div slot="title" class="user-name">{{ article.aut_name }}</div>
          <div slot="label" class="publish-date">
            {{ article.pubdate | relativeTime }}
          </div>
          <van-button
            v-if="!article.is_followed"
            class="follow-btn"
            type="info"
            color="#3296fa"
            round
            size="small"
            icon="plus"
            :loading="followLoading"
            @click="onFollow"
            >关注</van-button
          >
          <van-button
            v-else
            @click="onFollow"
            class="1follow-btn"
            round
            size="small"
            >已关注</van-button
          >
        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <div
          ref="contentInfo"
          class="article-content markdown-body"
          v-html="article.content"
        ></div>
        <van-divider ref="contentEnd">正文结束</van-divider>

        <!-- 评论列表 -->
        <CommentList
          :source="article.art_id"
          @onload-comment="resetCount"
          :newComList="newComList"
        ></CommentList>
        <!-- / 评论列表 -->

        <!-- 发布评论弹出层 -->
        <van-popup v-model="isPostComment" position="bottom">
          <CommentPost
            :id="article.art_id"
            @post-succes="onPostSucces"
          ></CommentPost>
        </van-popup>

        <!-- 底部区域 -->
        <div class="article-bottom">
          <van-button
            @click="isPostComment = true"
            class="comment-btn"
            type="default"
            round
            >写评论</van-button
          >

          <van-icon
            name="comment-o"
            @click="previewComment=true"
            :badge="totalCommontCount"
            color="#777"
          />

          <!-- 评论预览 弹出层 -->
          <van-popup v-model="previewComment"  closeable :style="{height:'85%' }" position="bottom">
            <CommentList
              :source="article.art_id"
              @onload-comment="resetCount"
              :newComList="newComList"
            >
            <template>
                <header>{{totalCommontCount}} 条回复</header>
            </template>
            </CommentList>
          </van-popup>
          <!-- end/ 评论预览 弹出层 -->
          <!-- <van-icon color="#777" name="star-o" /> -->

          <CollectedBtn
            v-model="article.is_collected"
            :articleid="this.article_id"
          />
          <!-- <van-icon color="#777" name="good-job-o" /> -->
          <LikeArticle
            v-model="article.attitude"
            :articleid="this.article_id"
          />
          <van-icon name="share" color="#777777"></van-icon>
        </div>
        <!-- /底部区域 -->
      </div>
      <!-- /加载完成-文章详情 -->

      <!-- 加载失败：404 -->
      <div v-else-if="errStatus === 404" class="error-wrap">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div v-else class="error-wrap">
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button class="retry-btn" @click="getArticleInfo"
          >点击重试</van-button
        >
      </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
    </div>
  </div>
</template>

<script>
import _ from "lodash";

import { getArticleById, addFollow, cancelFollow } from "@/api/getListApi";
import { ImagePreview } from "vant";

import CollectedBtn from "@/components/collected-btn";
import LikeArticle from "@/components/likeArticle";
import CommentList from "@/components/comment-list/commentList.vue";
import CommentPost from "@/components/comment-list/comment-post";

export default {
  name: "ArticleIndex",
  components: {
    CommentPost,
    CollectedBtn,
    LikeArticle,
    CommentList,
  },
  props: {
    article_id: {
      type: [Number, String],
      required: true,
    },
  },
  data() {
    return {
      preArticleId: null,
      article: {},
      loading: true,
      errStatus: 0, // response 状态码
      imgs: [], // 图片预览 列表
      newComList: [], // 评论列表
      followLoading: false,
      previewComment: false, //预览评论弹出层
      totalCommontCount: 0, // 评论统计
      isPostComment: false, // 发布评论 弹出层 popup
    };
  },
  computed: {
    imagelist() {
      // let reg = /<img\s{0,}(?:src=["'])(.+)(["'])\s{0,}(?:alt="")\/>/gi;
      // '<img src="https://img2018.cnblogs.com/blog/680284/…84-20181008144152656-1737502385.png" alt=""/></p>
      // let result =  this.article.content.matchAll(reg);
      // let resulr
      // while((resulr = reg.exec(this.article.content))!==null){
      //     // console.log(resulr);
      //     this.imgs.push(resulr[1])
      // }
      // console.log(this.imgs);
      // reg.exec(this.article.content)
      // console.log(result);
      // [...result].forEach(img => {
      //     console.log(img[2]);
      // });
      // return this.article.content.match(reg);
    },
  },
  watch: {
    article: {
      // immediate: true,
      deep: true,
      handler() {
        let reg = /<img\s{0,}(?:src=["'])(.+)(["'])\s{0,}(?:alt="")\/>/gi;
        let resulr;
        while ((resulr = reg.exec(this.article.content)) !== null) {
          // console.log(resulr);
          this.imgs.push(resulr[1]);
        }
        // console.log(this.imgs);
        this.$nextTick(() => {
          this.previewImage(this.imgs);
        });
      },
    },
    articleIdList: {
      // immediate:true,
      // handler(){
      //     if(!this.articleIdList[this.article_id]){
      //             this.articleIdList[article_id] = {article_id:article_id,content:this.article}
      //             this.getArticleInfo()
      //     }else{
      //         console.log("object 内容更新了");
      //         this.article = this.articleIdList[article_id][content]
      //     }
      // }
    },
  },
  activated() {
    // console.log(22);
    if (this.preArticleId.id == this.article_id) {
      this.$refs.scrollWrap.scrollTop = this.top;
      this.fn = this.recordTopHandler();
      this.$refs.scrollWrap.addEventListener("scroll", this.fn);
      // this.article = this.preArticleId.content
      return;
    } else {
      this.getArticleInfo();
    }
  },

  deactivated() {
    this.$refs.scrollWrap.removeEventListener("scroll", this.fn);
  },
  //   beforeRouteEnter(to,from,next){
  //   console.log(111);
  //   console.log(this);
  //   this.getArticleInfo();
  //   },
  created() {
    // console.log("组件被创建");
    this.preArticleId = { id: this.article_id, content: null };
    this.getArticleInfo();
  },
  methods: {
    async getArticleInfo() {
      // console.log(222);
      this.loading = true;
      try {
        const { data } = await getArticleById(this.article_id);
        // if(Math.random()>0.5){
        //     JSON.parse("a11122a13a131a31daj")
        // }
        this.article = data.data;
        this.preArticleId[content] = this.article;
        // console.log(this.article);
      } catch (err) {
        // console.log(err);
        if (err.response && err.response.status == 404) {
          this.errStatus = 404;
          this.$toast("请求数据出错,请稍后重试");
        }
        // console.log(err.response);
        // console.log(err.request);
      }
      this.loading = false;
    },
    goBack() {
      // console.log(this.$router);
      this.$router.back();
    },
    resetCount(total) {
      this.totalCommontCount = total;
    },
    toComment() {
      if (this.isFirstclick) {
        this.y = this.$refs.contentEnd.getBoundingClientRect().y - 60;
        this.isFirstclick = false;
      }
      // console.log(this.y);
      // console.log(this.$refs.contentEnd.getBoundingClientRect().y);
      this.$refs.scrollWrap.scrollTop = this.y;
    },
    onPostSucces(data) {
      this.isPostComment = false;
      this.newComList.unshift(data.new_obj);
    },

    async onFollow() {
      this.followLoading = true;
      try {
        if (this.article.is_followed) {
          let { data } = await cancelFollow(this.article.art_id);
          // console.log(data);
        } else {
          let { data } = await addFollow(this.article.art_id);
          // console.log(data);
        }
        this.article.is_followed = !this.article.is_followed;
      } catch (err) {
        this.$toast("操作失败，请稍后重试");
      }
      this.followLoading = false;
    },
    previewImage(imgsArr) {
      let imgs = this.$refs["contentInfo"].querySelectorAll("img");
      [...imgs].forEach((image, i) => {
        image.addEventListener("click", () => {
          ImagePreview({
            images: imgsArr,
            startPosition: i,
            closeable: true,
          });
        });
      });
    },
    recordTopHandler() {
      //   console.log("元素滚动着");
      return _.debounce(
        () => {
          this.top = this.$refs.scrollWrap.scrollTop;
        },
        50,
        { trailing: true } // trailing 指定在延迟后调用
      );
    },
  },
};
</script>

<style scoped lang="less">
@import url("./github-markdown.css");

.article-container {
  header {
        height: 100px;
        line-height: 100px;
        text-align: center;
        font-size: 32px;
    }
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 32px;
      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }

    .article-content {
      padding: 55px 32px;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 282px;
      height: 100%;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    .van-icon {
      font-size: 40px;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
  }
}
</style>
