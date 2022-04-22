<template>
    <van-cell class="comment-item">
        <van-image slot="icon" class="avatar" round fit="cover" :src="comment.reply? comment.comment.aut_photo:comment.aut_photo" />
        <div slot="title" class="title-wrap">
            <div class="user-name">{{comment.reply? comment.comment.aut_name: comment.aut_name}}</div>
            <van-button
                class="like-btn"
                :class="{
          liked: comment.is_liking,
        }"
                :icon="comment.is_liking ? 'good-job' : 'good-job-o'"
                :comLoading="comLoading"
                @click="onComment"
            >{{ comment.like_count || "赞" }}</van-button>
        </div>

        <div slot="label">
            <p class="comment-content">
                <template v-if="comment.reply">
                    <p class="reply">
                        <span>@{{comment.old.aut_name}}:</span>
                        <span class="text">{{comment.old.content}}</span>
                    </p>
                </template>
                {{comment.reply? comment.comment.content : comment.content}}
            </p>
            <div class="bottom-info">
                <span class="comment-pubdate">{{comment.pubdate | relativeTime}}</span>
                <van-button class="reply-btn" round @click="showPopup(comment)">回复 {{reply_count? reply_count:comment.reply_count}}</van-button>
            </div>
        </div>
    </van-cell>
</template>

<script>
import { addCommentLike, deleteCommentLike } from "@/api/comment";

import { mapMutations}  from "vuex"

export default {
    name: "CommentItem",
    components: {},
    props: {
        comment: {
            type: Object,
            require: true,
        },
        reply_count:{
            default:null
        }
    },
    data() {
        return {
            comLoading: false,
            show: false,
        };
    },

    methods: {
        ...mapMutations(["setCurment"]),
        async onComment() {
            this.comLoading = true;
            try {
                if (!this.comment.is_liking) {
                    await addCommentLike(this.comment.com_id);
                    this.comment.like_count++;
                } else {
                    await deleteCommentLike(this.comment.com_id);
                    this.comment.like_count--;
                }
                this.comment.is_liking = !this.comment.is_liking;
            } catch (err) {
                this.$toast("请稍后再试");
            }
            this.comLoading = false;
        },
        showPopup(data) {
            // console.log(data.content);
            this.setCurment(data)

            this.$emit("show-ReplyPopup", this.comment);
            this.$emit("show-inserReplyPopup", this.comment);
        },
    },
};
</script>

<style scoped lang="less">
.comment-item {
    .avatar {
        width: 72px;
        height: 72px;
        margin-right: 25px;
    }
    .title-wrap {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .user-name {
            color: #406599;
            font-size: 26px;
        }
    }
    .comment-content {
        font-size: 32px;
        color: #222222;
        word-break: break-all;
        text-align: justify;
    }
    .comment-pubdate {
        font-size: 19px;
        color: #222;
        margin-right: 25px;
    }
    .bottom-info {
        display: flex;
        align-items: center;
    }
    .reply-btn {
        // width: 135px;
        max-width: auto;
        height: 48px;
        line-height: 48px;
        font-size: 21px;
        color: #222;
    }
    .like-btn {
        height: 30px;
        padding: 0;
        border: none;
        font-size: 19px;
        line-height: 30px;
        margin-right: 7px;
        .van-icon {
            font-size: 30px;
        }
        &.liked {
            color: #e5645f;
        }
    }
}
.reply {
    color: #e5e5e5;
}
.text {
    margin-left: 0.3rem;
    color: #333;
}
</style>
