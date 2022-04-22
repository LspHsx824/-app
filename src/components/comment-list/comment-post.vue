<template>
  <div class="comment-post">
    <van-field
      class="post-field"
      v-model.trim.lazy="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      :placeholder="curComName ? `回复：${curComName}`: '优质评论会优先显示'"
      show-word-limit
    />
    <van-button
      class="post-btn"
      @click="onPost"
      :disabled="!message.length"
    >发布</van-button>
  </div>
</template>

<script>

import {  addComment} from "@/api/comment"

export default {
  name: 'CommentPost',
  components: {},
  props: {
      id:{
          require:true
      },
      commentID:{
        default:null
      },
      curComName:{
        default:null
      }
  },
  data () {
    return {
      message: ''
    }
  },
  methods: {
      async onPost(){
          try{
              let { data:{data} } = await addComment({
                  target:this.id, // 文章 id 或者 评论 id
                  content:this.message,
                  art_id:this.commentID, // 回复评论的 评论id， 回复文章不需要传
              })
            //   console.log(data);
              this.message = ""
              this.$emit("post-succes",data)
              this.$toast.success("发布成功")
          }catch(err){
              this.$toast.fail("发布失败，请稍后重试")
          }
      }
  }
}
</script>

<style scoped lang="less">
.comment-post {
  display: flex;
  align-items: center;
  padding: 32px 0 32px 32px;
  .post-field {
    background-color: #f5f7f9;
  }
  .post-btn {
    width: 150px;
    border: none;
    padding: 0;
    color: #6ba3d8;
    &::before {
      display: none;
    }
  }
}
</style>
