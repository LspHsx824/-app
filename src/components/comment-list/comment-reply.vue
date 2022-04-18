<template>
    <div>
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
                :insertComment="replyComment"
            />
        </van-list>
         <!-- 回复评论弹出层 -->
        <van-popup v-model="isPostComment" position="bottom">
            <CommentPost
                :commentID="curcomment.com_id"
                :id="curcomment.com_id"
                @post-succes="onPostSucces"
            ></CommentPost>
        </van-popup>
    </div>
</template>

<script>
import { getComment } from "@/api/comment";

import CommentItem from "./comment-item.vue";
import CommentPost from "./comment-post.vue"

export default {
    name: "comment-list",
    components: {
        CommentItem,
        CommentPost,
    },
    data() {
        return {
            loading: false,
            finished: false,
            offset: null,
            limit: 10,
            error: false,
            Popupshow:false, // 首个评论 弹出层
            curComment:{},
            isPostComment:false, // 评论的弹出层
            replyComment:{}
        };
    },
    props: {
        // source: {
        //     type: [Number, String, Object],
        //     require: true,
        // },
        newComList: {
            type: Array,
            default: () => [],
        },
        curcomment:{
            require:true
        }
    },
    computed: {
        list:{
            get(){
                return this.newComList;
            },
            // set(value){
            //     return this.list = value;
            // }
            
        },
    },
    created() {
        // console.log(this.list);
        // console.log(222);
        // this.onLoad();
    },
    methods: {
        async onLoad() {
            // 异步更新数据
            // console.log(333);
            try {
                let {
                    data: { data },
                } = await getComment({
                    type: "c", //是	a或c	评论类型，a-对文章(article)的评论，c-对评论(comment)的回复
                    source: this.curcomment.com_id.toString(), //是	源id，文章id或评论id
                    offset: this.offset, //否	获取评论数据的偏移量，值为评论id，表示从此id的数据向后取，不传表示从第一页开始读取数据
                    limit: this.limit, //否	   获取的评论数据个数，不传表示采用后端服务设定的默认每页数据量
                });
                // console.log(data);
                this.list.push(...data.results);
                this.loading = false;
                // this.$emit("onload-comment", data.total_count);
                if (data.results.length) {
                    this.offset = data.last_id;
                } else {
                    this.finished = true
                }
            } catch (err) {
                this.error = true;
                this.loading = false;
            }
        },
        showReply(data) {
            // console.log("aaaa");
            this.isPostComment = true
            this.Popupshow = true;
            this.curComment = data;
        },
        onPostSucces(data){
            this.curComment = this.curComment?.comment || this.curComment
            this.replyComment = { comment:data.new_obj,old:this.curComment,reply:true}
            this.list.push(this.replyComment)
            this.isPostComment = false
        }
    },
};
</script>

<style></style>


      data.results.forEach( (item,index)=> {
                   console.log("---",item);
                    for(let i = 0;i<this.list;i++){
                        if(this.list[i].com_id !== item.com_id){
                                this.list.push(item)
                        }
                    }
                })