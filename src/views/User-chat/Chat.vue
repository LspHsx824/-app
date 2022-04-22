<template>
  <div class="chat">
    <div :class="{ fl: isMy,fr:!isMy }" class="box">
      <img :src="src" alt="" :class="{ fl:isMy,fr:!isMy}" />
      <span class="text" >{{ title }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Chat",
  props: ["title", "isMy","src"],
};
</script>

<style lang="less" scoped>
.chat {
  width: 100wh;
  height: 100px;
  position: relative;
  padding: 10px;
//   border-bottom: 1px solid #eee;

  img {
    height: 100px;
    width: 100px;
    border-radius: 50%;
  }
  .box{
    font-size: 32px;
    color: #555;
    line-height: 100px;
    position: relative;
  }
  .fl {
    float: right;
    text-align: right;
    img{
        margin: 0 5px 0 20px;
    }
    .text{
         background-color: #fff;
    }
    .text::after{
        content: "";
        width: 30px;
        height: 20px;
        position: absolute;
        top: 50%;
        transform: translate(30%,-50%);
        background-color: #999;
        // clip-path: polygon(0 50%, 50% 28%, 100% 4%, 0 100%, 0 100%);
        clip-path: polygon(75% 0, 0 50%, 0 100%);
    }
  }
  .fr {
    float: left;
    .text{

        background-color: rgb(200,198,197);

    }
    .text::before{
        content: "";
        width: 20px;
        height: 20px;
        position: absolute;
        top: 50%;
        transform: translate(-150%,-50%);
        background-color: #999;
        // clip-path: polygon(100% 65%, 0 39%, 100% 100%);
        clip-path: polygon(100% 50%, 0 0, 100% 100%);

    }
  }
  .text{
        margin: 0 0 0 20px !important;
        display: inline-block;
        height: 100%;
        padding: 0 10px;
        border-radius:20px;
    }
}
</style>
