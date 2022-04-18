<template>
  <div class="user-profile">
    <van-nav-bar
      class="page-nav-bar"
      title="个人信息"
      left-arrow
      @click-left="$router.back()"
    />

    <van-cell title="头像" is-link @click="$refs.filePhoto.click()">
      <van-image class="avatar" fit="cover" round :src="profile.photo" />
    </van-cell>

    <!-- // 头像图片  -->
    <input type="file" hidden ref="filePhoto" @change="onFileChange" />

    <!-- 头像图片预览和裁切 popup -->

    <van-popup v-model="isPhotoShow" style="height: 100%" position="bottom">
      <UpdatePhoto
        v-if="isPhotoShow"
        @update-photo="profile.photo=$event"
        :img="img"
        @close="isPhotoShow = false"
      />
    </van-popup>
    <!-- / 头像图片预览和裁切 popup -->
    <van-cell
      @click="isnameshow = true"
      title="昵称"
      :value="profile.name"
      is-link
    />

    <!-- 编辑昵称 -->
    <van-popup v-model="isnameshow" style="height: 40%" position="bottom">
      <UpdateName
        v-if="isnameshow"
        @changename="isnameshow = false"
        v-model="profile.name"
      ></UpdateName>
    </van-popup>
    <!-- / 编辑昵称 -->

    <van-cell
      @click="sigendershow = true"
      title="性别"
      :value="profile.gender == 0 ? '男' : '女'"
      is-link
    />

    <!-- 编辑性别 -->
    <van-popup v-model="sigendershow" position="bottom">
      <UpdateGender
        v-if="sigendershow"
        @close="sigendershow = false"
        v-model="profile.gender"
      ></UpdateGender>
    </van-popup>
    <!-- / 编辑性别 -->

    <van-cell
      @click="isBirthdayshow = true"
      title="生日"
      :value="profile.birthday"
      is-link
    />

    <!-- 编辑出生日期 -->
    <van-popup v-model="isBirthdayshow" position="bottom">
      <UpdateBirthday
        v-if="isBirthdayshow"
        @close="isBirthdayshow = false"
        v-model="profile.birthday"
      ></UpdateBirthday>
    </van-popup>
    <!-- / 编辑出生日期 -->
  </div>
</template>

<script>
import { addusermessage } from "@/api/users";

import UpdatePhoto from "./components/updatePhoto.vue";
import UpdateName from "./components/updateName.vue";
import UpdateGender from "./components/updateGender.vue";
import UpdateBirthday from "./components/updateBirthday.vue";

export default {
  name: "user-profile",
  components: {
    UpdateName,
    UpdateGender,
    UpdateBirthday,
    UpdatePhoto,
  },
  data() {
    return {
      profile: {},
      isnameshow: false,
      sigendershow: false,
      isBirthdayshow: false,
      isPhotoShow: false,
      img: null,
    };
  },
  created() {
    this.getUserProfile();
  },
  methods: {
    async getUserProfile() {
      try {
        let { data } = await addusermessage();
        this.profile = data.data;
      } catch (err) {}
    },
    onFileChange() {
      let files = this.$refs.filePhoto.files[0];
      this.img = window.URL.createObjectURL(files);
      this.isPhotoShow = true;

      // input-file 中选择同一个文件  onchange事件不会重复触发
      // 选择 file 后，手动· 清空 input file value
      //  确保每次 选择文件时， 文件值为 “ ”
      this.$refs.filePhoto.value = "";
    },
  },
};
</script>

<style lang="less" scoped>
.user-profile {
  .avatar {
    width: 60px;
    height: 60px;
  }
  .van-popup {
    background-color: #f5f7f9;
  }
}
</style>
