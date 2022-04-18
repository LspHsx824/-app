<template>
    <div class="search-suggestion">
      <template v-if="suggestions.length!=0 && suggestions[0]">
        <van-cell v-for="(item,i) in suggestions"
                  :key="i"
                  @click="handleSearch(item)"
                  icon="shop-o" clickable>
                  <template #title>
                    <div v-html="activeText(item)"></div>
                  </template>
            <!-- 使用 right-icon 插槽来自定义右侧图标 -->
            <template #right-icon>
                <van-icon name="search" class="search-icon" />
            </template>
        </van-cell>        
      </template>

    </div>
</template>

<script>
import { searchContent } from "@/api/users";
// import { searchGooGeContent } from "@/api/users";

// import { jsonpToJson } from "@/utils/toolFn"

export default {
    name: "search-suggestion",
    data() {
        return {
            suggestions: [],
        };
    },
    props: ["keyWrod"],
    watch: {
        keyWrod: {
            immediate: true,
            handler() {
                this.throttle(this.lodingData,1000)
                // this.lodingData();
            },
        },
    },
    methods: {
        async lodingData() {
            try {
                const { data } = await searchContent(this.keyWrod);
                // let result = jsonpToJson(data)
                // console.log(result);
                this.suggestions = data.data.options;
            } catch (err) {
                this.$toast("获取数据失败，请重试");
            }
        },
        activeText(strText){
            strText = strText ?? "" 
            const newText = `<span class="active">${this.keyWrod}</span>`
            const reg = new RegExp(this.keyWrod,"gi")

            return strText.replace(reg,newText)
        },
        handleSearch(title){
            console.log(12);
            this.$emit("search",title)
        }
    },
};
</script>

<style lang="less" scoped>

// .search-suggestion{
//     padding: 100px 0 0 0;
// }

.van-cell{
  display: flex;
  align-items: center;
  justify-content: center;
  
}
/deep/ .active{
      color:red;
  }



</style>