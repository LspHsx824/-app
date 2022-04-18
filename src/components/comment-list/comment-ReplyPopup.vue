<template>
    <div class="reply-container">
        <header>{{comment.reply_count}} 条回复</header>
        <CommontItem @show-inserReplyPopup="showReply" :comment="comment"></CommontItem>
        <h6>全部回复</h6>
        <myCommontList :newComList="list" :curcomment="comment"></myCommontList>

        <!-- 回复评论弹出层 -->
        <van-popup v-model="isPostComment" position="bottom">
            <CommentPost
                :commentID="comment.com_id"
                :id="comment.com_id"
                @post-succes="onPostSucces"
            ></CommentPost>
        </van-popup>
    </div>
</template>

<script>
import CommontItem from "./comment-item.vue";
import myCommontList from "./comment-reply.vue";

import CommentPost from "./comment-post.vue";

export default {
    name: "Reply-Popup",
    components: {
        CommontItem,
        myCommontList,
        CommentPost,
    },
    props: {
        comment: {
            type: Object,
            require: true,
        },
    },
    data() {
        return {
            list: [],
            isPostComment: false,
        };
    },
    created() {
        // this.onLoad();
    },
    methods: {
        async onLoad() {
            // try{
            //      let {
            //         data: { data },
            //     } = await getComment({
            //         type: "c", //是	a或c	评论类型，a-对文章(article)的评论，c-对评论(comment)的回复
            //         source: this.comment.com_id.toString(), //是	源id，文章id或评论id
            //         offset: this.offset, //否	获取评论数据的偏移量，值为评论id，表示从此id的数据向后取，不传表示从第一页开始读取数据
            //         limit: this.limit, //否	   获取的评论数据个数，不传表示采用后端服务设定的默认每页数据量
            //     });
            //     this.list.push(...data.results)
            // }catch(err){
            // }
        },
        showReply(data) {
            // console.log(data);
            this.isPostComment = true;
        },
        onPostSucces(data) {
            // console.log("-=-=-",data);
            this.isPostComment = false;
            this.list.unshift(data.new_obj)
        },
    },
};
</script>

<style lang="less" scoped>
.reply-container {
    header {
        height: 100px;
        line-height: 100px;
        text-align: center;
        font-size: 32px;
    }
    h6 {
        margin-left: 30px;
        color: #666;
        font-weight: normal;
    }
}

</style>

