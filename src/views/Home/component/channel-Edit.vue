<template>
  <div class="editChanel">
    <!-- 我的频道  -->
    <van-cell :border="false" class="title-text">
      <div slot="title">我的频道</div>

      <van-button
        plain
        round
        class="btn"
        size="small"
        type="danger"
        @click="isEdit = !isEdit"
        >{{ isEdit ? "完成" : "编辑" }}</van-button
      >
    </van-cell>
    <van-grid class="my-grid" :gutter="10">
      <van-grid-item
        class="grid-item"
        v-for="(item, index) in myDataList"
        :key="item.id"
        :text="item.name"
        @click="onChangeCommit(item, index)"
      >
        <span slot="text" 
              class="text" 
              :class="{ activea: index == active,nscc:isEdit && fixedChannels(item.id) }"
        >
        {{item.name}}</span>
        <van-icon
          v-show="isEdit && !fixedChannels(item.id)"
          slot="icon"
          name="clear"
        ></van-icon>
      </van-grid-item>
    </van-grid>
    <!-- / 我的频道  -->

    <!-- 推荐频道 -->
    <van-cell :border="false" class="title-text">
      <div slot="title">推荐频道</div>
    </van-cell>
    <van-grid class="re-grid" :gutter="10">
      <van-grid-item
        class="grid-item"
        icon="plus"
        v-for="value in filterChannels"
        :key="value.id"
        :text="value.name"
        @click ="addChannels(value)"
      />
    </van-grid>
    <!-- / 推荐频道 -->
  </div>
</template>

<script>
import { 
  getAllChannels,
  addUserChannels,
  deleteUserChannels, } from "@/api/users";
import { mapState } from "vuex"
import { setItem } from "@/utils/storage"

export default {
  name: "channel-Edit",
  components: {},
  data() {
    return {
      allchannels: [],
      isEdit: false,
      fixed: [0],
    };
  },
  props: {
    myChannelData: {
      type: Array,
      require: true,
    },
    active: Number,
  },
  computed: {
    ...mapState(["user"]),
    filterChannels() {
      /* .filter((item) => {
                    let myChannel = this.myChannelData.find(
                      (value) => item.name == value.name
                    );

                    myChannel 值只有两种可能
                    1： myChannel == item  说明我的频道里面有  !item => 如果 item不是null，undefined
                    2: undefined  就是没找到的
                    return !myChannel;
                  }); */
      return this.allchannels.filter(
        (item) => !this.myChannelData.find((value) => value.name == item.name)
      );
    },
    myDataList(){
      return this.myChannelData
    }
  },
  created() {
    // create 只会在组件被创建的时候使用。
    // console.log("编辑组件被创建了");
    this.getChannels();
    // console.log(this.user);
  },
  methods: {
    async getChannels() {
      let {
        data: { data },
      } = await getAllChannels();

      this.allchannels = data.channels;
      // for (const i of this.allchannels) {
      //   console.log(i.id);
      // }
    },
    async addChannels(channel){
      // this.myChannelData.push(channel)  不要修改 props
      this.myDataList.push(channel)
      
      // 数据持久化，
      if(this.user){ 
        // 已登录
        try{
            await addUserChannels({
              id:channel.id,
              seq:this.myDataList.length
            })

        }catch(err){
          this.$toast("添加操作失败,请稍后重试")
        }
      }else{
        setItem("localChannel",this.myDataList)
      }
      
    },
    async deleteChannels(channel){
      if(this.user){
        // 用户已登录，编辑删除自己频道
        try{
          await deleteUserChannels(channel.id)

        }catch {
          this.$toast("操作失败,请稍后重试")
        }
      }else{
        setItem("localChannel",this.myDataList)
      }
    },
    fixedChannels(id) {
      return this.fixed.includes(id); // 判定频道是否可删
    },
    onChangeCommit(item, index) {
      if (this.isEdit) {
        // console.log("----",item,index)
        if(this.fixedChannels(item.id)) return this.$toast("置顶推荐频道不可删")
          
        if(index <= this.active) this.$emit("change-active",this.active-1,true)
        this.myDataList.splice(index,1)

        this.deleteChannels(item)
      } else {
        this.$emit("change-active", index);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.editChanel {
  padding: 85px 0;
  .title-text {
    font-size: 32px;
    color: #333333;
  }
  .btn {
    width: 104px;
    height: 48px;
    font-size: 26px;
    color: #f85959;
    border: 1px solid #f85959;
  }

  /deep/ .my-grid {
    .nscc{
      color:#777 !important;
    }
    .van-grid-item__icon-wrapper {
      position: unset;
      .van-icon {
        font-size: 28px;
        margin-right: 6px;
        position: absolute;
        top: -5px;
        right: -5px;
        font-size: 13px;
        color: #cacaca;
      }
    }
  }

  /deep/ .grid-item {
    width: 160px;
    height: 86px;

    .van-grid-item__content {
      background-color: #f4f5f6;
    }
    .van-grid-item__text,
    .text {
      font-size: 28px;
      color: #222;
      margin-top: 0;
      white-space: nowrap;
    }
    .activea {
      color: red;
    }
  }
  /deep/ .re-grid {
    .van-grid-item__content {
      flex-direction: row;
      white-space: nowrap;
      .van-icon {
        font-size: 15px;
        padding-right: 8px;
      }
    }
  }
}
</style>
