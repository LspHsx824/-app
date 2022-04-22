<template>
    <van-icon
        :name="value===1 ? 'good-job' : 'good-job-o'"
        :class="{ liked: value===1 }"
        @click="onlike"
        :loading="loading"
    ></van-icon>
</template>

<script>
import { addLike, delLike } from "@/api/users";

export default {
    name: "like-article",
    props: {
        value: {
            type: Number,
            default:1,
            // required: true,
        },
        articleid: {
            type: [Number, String, Object],
            // required: true,
        },
    },
    data() {
        return {
            loading: false,
        };
    },
    methods: {
        async onlike() {
            this.loading = true;
            try {
                let status = -1;
                if (this.value === 1) {
                    await delLike(this.articleid);
                } else {
                    await addLike(this.articleid);
                    status = 1;
                }
                this.$emit("input", status);
                this.$nextTick(()=>this.$toast.success(status === 1 ? "点赞成功" : "取消点赞"))
                // this.$toast.success(status === 1 ? "点赞成功" : "取消点赞");
            } catch (err) {
                this.$toast.fail("操作失败请重试");
            }
            this.loading = false;
        },
    },
};
</script>

<style lang="less" scoped>
.liked {
    color: #e5645f;
}




</style>

