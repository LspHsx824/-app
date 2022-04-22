<template>
  <div>
    <van-nav-bar
      fixed
      title="小思同学"
      left-arrow
      @click-left="$router.back()"
    />

    <van-cell-group class="chat-content" ref="chat-content">
      <div v-for="(msg, index) in msgList" :key="index">
        <Chat
          :title="msg.msg"
          :isMy="isEven(index)"
          :src="
            isEven(index)
              ? 'data:image/jpeg;base64,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'
              : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgepK1FRMUV-SqZi5W5v6kImX_HyodAAMAtA&usqp=CAU'
          "
        />
      </div>
    </van-cell-group>

    <van-cell-group class="postSubmit" :border="false">
      <van-field v-model.lazy.trim="message" placeholder="亲，你想说些什么">
        <template #button>
          <van-button
            size="small"
            type="primary"
            @click="sendMessage"
            :disabled="Boolean(message.length)"
            >发送</van-button
          >
        </template>
      </van-field>
    </van-cell-group>
  </div>
</template>

<script>
import { io } from "socket.io-client";
import { setItem, getItem } from "@/utils/storage";

import Chat from "./Chat.vue";

export default {
  name: "user-chat",
  components: {
    Chat,
  },
  data() {
    return {
      message: "",
      msgList: getItem("chat-message") || [],
    };
  },
  watch: {
    msgList() {
      setItem("chat-message", this.msgList);
      this.$nextTick(this.scrollBottom);
      //  this.$nextTick(function(){} )
      //  // 等价于
      //  Promise.resolve().then( function(){} )

    },
  },

  created() {
    //   const socket = io("http://toutiao.itheima.net")
    //   const socket = io("http://ttapi.research.itcast.cn")
    this.socket = io("http://toutiao.itheima.net", {
      // 服务端消息推送技术
      query: {
        token: getItem("TOKEN_KEY"),
      },
      transports: ["websocket"],
    });
    this.socket.on("message", (data) => {
      this.msgList.push(data);

      // console.log("===",this.msgList);
    });

    this.$nextTick(this.scrollBottom);

    // console.log(this.isEven(0));

    // this.socket.on("connect", function () {
    //   console.log("建立连接成功");
    // });

    // this.socket.on("disconnect", function () {
    //   console.log("断开连接了");
    // });
  },
  methods: {
    sendMessage() {

      if ((this.message ?? "") !== "") {
        this.socket.emit("message", {
          msg: this.message,
          timestamp: Date.now(),
        });
        this.msgList.push({ msg: this.message, timestamp: Date.now() });
        this.message = "";
      }

      // console.log("'''",this.msgList);
    },
    scrollBottom() {
      let charConetnt = this.$refs["chat-content"];
      charConetnt.scrollTop = charConetnt.scrollHeight;
    },
    isEven(num) {
      return (num & 1) === 0;
    },
  },
};
</script>

<style lang="less" scoped>
.postSubmit {
  display: flex;
  align-items: center;
  position: fixed;
  left: 0;
  bottom: 0;
  right: 0;
  button {
    width: 100px;
  }
}
.chat-content {
  background-color: rgb(245,245,245);
  position: fixed;
  left: 0;
  right: 0;
  top: 92px;
  bottom: 106px;
  overflow-y: auto;
}
</style>
