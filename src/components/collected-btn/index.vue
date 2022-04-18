<template>
    <!-- <van-button
        :icon="value ? 'star' : 'star-o'"
        :class="{ collored: value }"
        @click="onShoucang"
        :loading="loading"
        :border="false"
    ></van-button> -->
    <van-icon   :name="value ? 'star' : 'star-o'" 
                @click="onShoucang"
                :class="{ collored: value }"
                :loading="loading"
                />
</template>

<script>
import { addShoucang, delShoucang } from "@/api/users";
export default {
    name: "collected-btn",
    props: {
        value: {
            type: Boolean,
            required: true,
        },
        articleid: {
            type: [Number, String, Object],
            required: true,
        },
    },
    data() {
        return {
            loading: false,
        };
    },
    methods: {
        async onShoucang() {
            this.loading = true;
            try {
                if (this.value) {
                    await delShoucang(this.articleid);
                } else {
                    await addShoucang(this.articleid);
                }
                this.$emit("input", !this.value);
                this.$nextTick(()=>this.$toast.success(this.value ? "收藏成功" : "取消收藏"))
                // this.$toast.success(!this.value ? "收藏成功" : "取消收藏");
            } catch (err) {
                this.$toast.fail("操作失败请重试");
            }
            this.loading = false;
        },
    },
};
</script>
<style lang="less" scoped>
.collored {
    color: #ffa500;
}
</style>

