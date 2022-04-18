<template>
  <div>
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      title="选择年月日"
      :min-date="minDate"
      :max-date="maxDate"
      @cancel="$emit('close')"
      @confirm="onConfirm"
    />
  </div>
</template>

<script>
import { changeusermessage } from "@/api/users";

import dayjs from "dayjs";

export default {
  props: ["value"],
  data() {
    return {
      minDate: new Date(1975, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date(this.value),
    };
  },
  methods: {
    async onConfirm() {
      this.$toast.loading({
        message: "保存中...",
        forbidClick: true, // 静止背景点击
        duration: 0,
      });
      try {
        let currentDate = dayjs(this.currentDate).format("YYYY-MM-DD");

        await changeusermessage({
          birthday: currentDate,
        });
        this.$emit("input", currentDate);
        this.$emit("close");
        this.$toast.success("修改成功");
      } catch (err) {
        this.$toast.fail("修改失败，请重试");
      }
    },
  },
};
</script>

<style></style>
