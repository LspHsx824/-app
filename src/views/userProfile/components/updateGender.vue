<template>
  <div>
    <van-picker
      show-toolbar
      title="标题"
      :columns="columns"
      :default-index="value"
      @cancel="$emit('close')"
      @confirm="onConfirm"
      @change="onPickerChange"
    />
  </div>
</template>

<script>

import { changeusermessage } from "@/api/users"
export default {
  props: {
    value: {
      type: Number,
      require: true,
    },
  },
  data() {
    return {
      columns: ["男", "女"],
      localGender:this.value
    };
  },
  methods:{
     async onConfirm (){
          this.$toast.loading({
            message:"保存中...",
            forbidClick:true, // 静止背景点击
            duration:0 
          })
          try{
            await changeusermessage({
              gender:this.localGender
            })
            this.$emit("input",this.localGender)
            this.$emit("close")
            this.$toast.success("修改成功")
          }catch(err){
            this.$toast.fail("修改失败，请重试")
          }
     },
     onPickerChange(picker,value,index){
         this.localGender = index
     } 
  }
};
</script>

<style></style>
