<template>
    <div>
        <slot></slot>
        <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
            :error="error"
            error-text="加载失败了捏，点我重试"
        >
            <CommentItem
                @show-ReplyPopup="showReply"
                v-for="(item, index) in list"
                :key="index"
                :comment="item"
            />
        </van-list>
        <!-- 一级评论回复弹出层 -->
        <van-popup
            v-model="Popupshow"
            closeable
            close-icon-position="top-left"
            position="bottom"
            :style="{ height: '85%' }"
        >
            <ReplyPopup v-if="Popupshow" @updateReply="curReply" :articleId="source" :comment="curComment"></ReplyPopup>
        </van-popup>
    </div>
</template>

<script>
import { getComment } from "@/api/comment";

import CommentItem from "./comment-item.vue";
import ReplyPopup from "./comment-ReplyPopup.vue"

export default {
    name: "comment-list",
    components: {
        CommentItem,
        ReplyPopup,
    },
    data() {
        return {
            loading: false,
            finished: false,
            offset: null,
            limit: 10,
            error: false,
            Popupshow:false,
            curComment:{}
        };
    },
    props: {
        source: {
            type: [Number, String, Object], // 当前文章id
            require: true,
        },
        newComList: {
            type: Array,
            default: () => [],
        },
        
    },
    computed: {
        list() {
            return this.newComList;
        },
    },
    created() {
        this.onLoad();
    },
    // updated() {
        // this.onLoad();
    // },
    methods: {
        async onLoad() {
            // 异步更新数据
            try {
                let {
                    data: { data },
                } = await getComment({
                    type: "a", //是	a或c	评论类型，a-对文章(article)的评论，c-对评论(comment)的回复
                    source: this.source.toString(), //是	源id，文章id或评论id
                    offset: this.offset, //否	获取评论数据的偏移量，值为评论id，表示从此id的数据向后取，不传表示从第一页开始读取数据
                    limit: this.limit, //否	   获取的评论数据个数，不传表示采用后端服务设定的默认每页数据量
                });
                // console.log(data);
                this.list.push(...data.results);
                this.loading = false;

                this.$emit("onload-comment", data.total_count);

                // console.log(data.results.length);
                if (data.results.length) {
                    this.offset = data.last_id;
                } else {
                    this.finished = true;
                }
            } catch (err) {
                this.error = true;

                this.loading = false;
            }
        },
        showReply(data) {
            console.log(data);
            this.Popupshow = true;
            this.curComment = data;
        },
        curReply(data){
            console.log(data);
            // console.log(this.curComment);
        }
    },
};
</script>

<style></style>
