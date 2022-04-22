<template>
    <div class="item-container">
        <van-cell :to="`/article/${article.art_id}`" >
            <template #title>
                <div class="title-box">
                    <!-- 标题 -->
                    <span class="title van-multi-ellipsis--l2">{{ article.title }}</span>
                    <!-- 单张图片 -->
                    <!-- :src="article.cover.images[0]" -->
                    <!-- <img
                        v-lazy ="article.cover.images[0]"
                        class="thumb van-image__img"
                        v-if="article.cover.type === 1"
                    /> -->
                    <img
                        v-lazy ="article.cover.images[0]"
                        class="thumb van-image__img"
                        v-if="article.cover.type === 1"
                    />
                    <!-- <van-image
                        v-lazy ="article.cover.images[0]"
                        alt
                        fit="cover"
                        class="thumb"
                        v-if="article.cover.type === 1"
                    /> -->
                </div>
            </template>
            <!-- label 区域的插槽 -->
            <template #label>
                <!-- 三张图片 -->
                <div class="thumb-box" v-if="article.cover.type === 3">
                    <!-- :src="item" -->
                    <img
                        v-lazy ="item"
                        class="thumb van-image__img"
                        v-for="(item, i) in article.cover.images"
                        :key="i"
                    />
                    <!-- <van-image
                        :src="item"
                        alt
                        fit="cover"
                        class="thumb"
                        v-for="(item, i) in article.cover.images"
                        :key="i"
                    /> -->
                </div>
                <div class="label-box">
                    <span class="lable-text">
                        作者 {{ article.aut_name }} &nbsp;&nbsp;
                        {{ article.comm_count }} 评论&nbsp;&nbsp; 发布日期
                        {{ article.pubdate | relativeTime }}
                    </span>
                </div>
                
            </template>

            <!-- <template #right-icon> -->
            <!-- 关闭按钮 -->
            <!-- <van-icon name="cross" /> -->
            <!-- </template> -->
        </van-cell>
        <!-- <slot></slot> -->
    </div>
</template>
<script>

import { Lazyload } from "vant"

export default {
    name: "article-item",
    props: {
        article: {
            type: Object,
            required: true,
        },
    },
    created() {
        // console.log(this.article);
        // console.log(this.atricle);
        // console.log(this.article.cover.images);
        // console.dir(JSON.stringify(this.article));
    },
    // mounted(){
        // console.log(this.article);
    // }
};
</script>

<style lang="less" scoped>
.label-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
}
.thumb {
    // 矩形黄金比例：0.618
    // width: 113px;
    // height: 70px;
    width: 232px;
    height: 146px;
    object-fit: cover;
}

.title-box {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    .van-image {
        padding-left: 25px;
        width: 232px;
        height: 146px;
    }
    .title {
        font-size: 32px;
        color: #3a3a3a;
    }
}

.thumb-box {
    display: flex;
    justify-content: space-between;
    padding: 20px 0;
    object-fit: cover;
    :not(:last-child) {
        padding-right: 5px;
    }
}

.lable-text {
    color: #b4b4b4;
}
img{
    object-fit: cover;
}





</style>
