<template>
  <div class="photo-img">
    <img :src="img" alt ref="img" />
    <div class="toobar">
      <div class="cancel" @click="$emit('close')">取消</div>
      <div class="confirm" @click="onConfirm">完成</div>
    </div>
  </div>
</template>

<script>
import "cropperjs/dist/cropper.css";
import Cropper from "cropperjs";

import { updateUserPhoto } from "@/api/users";
export default {
  props: {
    img: {
      type: [String, Object],
      require: true,
    },
  },
  data() {
    return {
      cropper: null,
    };
  },
  mounted() {
    const image = this.$refs.img;
    this.cropper = new Cropper(image, {
      viewMode: 1,
      dragMode: "move",
      aspectRatio: 1,
      autoCropArea: 1,
      cropBoxMovable: false,
      cropBoxResizable: false,
      background: false,
    });
  },
  methods: {
    onConfirm() {
      // 基于服务端的裁切使用 getData 方法获取裁切参数
      // console.log(this.cropper.getData())

      // 纯客户端的裁切使用 getCroppedCanvas 获取裁切的文件对象

      this.cropper
        .getCroppedCanvas()
        .toBlob((blob) => this.updateUserPhoto(blob));
    },
    async updateUserPhoto(blob) {
      // 错误的用法
      // 如果接口要求 Content-Type 是 application/json
      // 则传递普通 JavaScript 对象
      // updateUserPhoto({
      //   photo: blob
      // })
      // 如果接口要求 Content-Type 是 multipart/form-data
      // 则你必须传递 FormData 对象
      this.$toast.loading({
        message: "保存中...",
        forbidClick: true, // 禁止背景点击
        duration: 0, // 持续展示
      });
      try {
        const formData = new FormData();
        formData.append("photo", blob);

        const { data } = await updateUserPhoto(formData);
        // 关闭弹出层
        this.$emit("close");
        // 更新视图
        this.$emit("update-photo", data.data.photo);
        // 提示成功
        this.$toast.success("更新成功");
      } catch (err) {
        this.$toast.fail("更新失败");
      }
    },
  },
};
</script>

<style lang="less" scoped>
.photo-img {
  width: 100vw;
  height: 100vh;
  background-color: #555;
  .toobar {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    //   align-items: center;
    .cancel,
    .confirm {
      width: 90px;
      height: 90px;
      color: #fff;
      display: flex;
      font-size: 30px;
      justify-content: center;
      align-items: center;
    }
  }
  img {
    max-width: 100%;
    display: block;
    // height: 100%;
  }
}
</style>
