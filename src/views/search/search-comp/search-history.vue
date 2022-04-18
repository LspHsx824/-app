<template>
    <div class="search-history">
        <van-cell :border="false">
            <template #title>
                <div>历史搜索</div>
            </template>
            <template #right-icon>
                <van-icon v-if="isSwitch" name="delete-o" size="20px" 
                          @click="showHistory" />
                <div v-else>
                    <span class="text">全部清除</span>
                    <span class="text" @click="showHistory">完成</span>
                </div>
            </template>
        </van-cell>

        <van-cell class="history-content body-content"   
                  :class="{maxHeight: aotuHeight,minHeight:!aotuHeight }">
            <template>
                <van-button
                    v-for="(btn,i) in isFilterHistory"
                    :key="i"
                    round
                    class="van-ellipsis"
                    icon-position="right"
                >
                {{btn.title}}
                <van-icon slot="icon" name="cross" v-show="!isSwitch" />
                </van-button>
                <van-button round class="arrow-down" 
                            @click="showHistory" >
                    <van-icon v-if="!aotuHeight"  name="arrow-down" />
                    <van-icon v-else  name="arrow-up" />
                </van-button>
            </template>
            
        </van-cell>

        <van-cell :border="false">
            <template #title>
                <div>搜索发现</div>
            </template>
            <template #right-icon>
                <div class="serch-txt" @click="throttle(ChangeLoveData,1000)">
                    <svg
                        t="1647079300415"
                        class="icon"
                        :class="{'rotate-center':isChange}"
                        viewBox="0 0 1024 1024"
                        xmlns="http://www.w3.org/2000/svg"
                        p-id="1728"
                    >
                        <path
                            d="M265.6 441.6c1.28 0.64 2.56 0.64 3.84 0.64 7.04 0 13.44-4.48 15.36-12.16 28.8-107.52 126.72-183.04 238.08-183.04 83.84 0 159.36 41.6 204.16 108.16l-42.88 21.12 104.96 71.04 8.96-126.72-42.24 20.48c-50.56-77.44-136.96-126.08-232.96-126.08-126.08 0-236.8 85.12-269.44 206.72-1.28 8.96 3.84 17.92 12.16 19.84zM783.36 534.4c-8.32-1.92-17.28 3.84-19.2 12.16-24.32 112.64-125.44 193.92-241.28 193.92-96 0-181.12-55.04-221.44-138.24l44.8-21.76-104.96-71.04-8.96 126.72 40.32-19.84c46.08 94.08 142.08 156.16 250.24 156.16 130.56 0 244.48-92.16 272-219.52 2.56-8.32-2.56-16.64-11.52-18.56z"
                            fill
                            p-id="1729"
                        />
                    </svg>
                    <span class="text txt">换一换</span>
                </div>
            </template>
        </van-cell>
        <van-cell class="history-content">
            <template>
                <!-- <van-button
                    v-for="(btnData,i) in loveData"
                    :key="i"
                    round
                    icon="cross"
                    icon-position="right"
                >
                <span class="van-ellipsis">{{btnData.title}}...</span></van-button> -->

                <van-grid clickable :column-num="2" :border="false">
                    <van-grid-item v-for="(btnData,i) in loveData" 
                                   :key="i"
                                   class="van-ellipsis "
                    >
                    <div slot="text" class="van-ellipsis insettxt ">{{btnData.title}}</div>
                    </van-grid-item>
                </van-grid> 
                   
                    <!-- <van-icon name="cross" /> -->
                    <!-- {{btnData.title}}<van-icon name="cross" /> -->
                
                <!-- .van-button--round  .van-button--default -->
            </template>
        </van-cell>
    </div>
</template>

<script>
import { getArticleList } from "@/api/getListApi";
import { Random } from "@/utils/toolFn";

export default {
    name: "search-history",
    data() {
        return {
            isSwitch: true,
            isChange: false,
            history: [],
            last: [],
            isShow:false,
            aotuHeight:false,
            loveData: [],
        };
    },
    computed:{
        isFilterHistory(){
            if( this.isShow ){
                return this.loveData
            }else{
                return this.loveData.slice(0,3)
            }
        }
    },
    created() {
        this.SearchFound();
    },
    methods: {
        async SearchFound() {
            const id = Random({
                min: 1,
                max: 26,
                first: true,
                last: this.last,
            });

            try {
                const {
                    data: { data },
                } = await getArticleList({
                    channel_id: id,
                    timestamp: Date.now(),
                });
                if(data.results.length==0){
                    this.SearchFound();
                }
                this.loveData = data.results;
            } catch {
                this.$toast("加载失败，请重试");
            }
        },
        ChangeLoveData() {
            this.isChange = true;
            this.SearchFound();
            setTimeout(() => (this.isChange = false), 500);
        },
        showHistory(){
            this.aotuHeight = !this.aotuHeight
            this.isShow = !this.isShow
            this.isSwitch = !this.isSwitch
        }
        
    },
};
</script>

<style lang="less" scoped>
.search-history {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
        Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue",
        sans-serif;
    // padding: 100px 0 0 0 ;
    .text:first-child {
        padding: 0 30px;
        color: #777;
    }
    .text:last-child {
        padding-left: 15px;
        color: #777;
    }
    .van-cell {
        padding-right: 15px;   // .van-grid-item__content
    }
    .van-button {
        color: #777;
        height: 70px;
        font-size: 24px;
        margin: 7px;
        .van-button__icon {
            margin-left: 20px;
        }
    }
   .maxHeight{
       height: 100% !important;
   }
    .minHeight{
        max-height: 270px;
    }
    /deep/ .body-content{
            align-items: normal;
            .van-button{
                max-width: 80%;
            }
            .van-button--normal{
                padding: 0 10px;
            }
            .van-button--default{
                background-color: #f4f5f6;
            }
            .van-button__text{
                max-width: 80%;
                 overflow: hidden;
                 white-space: nowrap;
                 text-overflow: ellipsis;
            }
            .arrow-down{
                padding: 0;
                width: 70px;
                height: 70px;
            }
        }
    /deep/ .history-content {
        padding-top: 0 !important;
        .van-grid-item{
            margin:12px 0;
        }
        .van-grid-item__content{
            height: 70px;
            padding: 0;
            line-height: 70px;

        }
        .van-grid-item__content--center{
            align-items: normal;
            color: #777;
            text-align: left;
            font-size: 24px;

        }
    }
    .van-grid-item:nth-child(n){
        padding-right:10px !important;
    }
     .van-grid-item:nth-child(2n){
        padding-left:10px !important;
    }
    .icon {
        width: 54px;
        height: 50px;
        color: #777;
        animation: circles all 2s linear;
    }
    .serch-txt {
        display: flex;
        justify-content: center;
        align-items: center;
        .txt {
            font-size: 24px;
            padding-left: 0;
        }
    }
    /* 换一换 图标动画 */
    .rotate-center {
        -webkit-animation: rotate-center 0.6s linear both;
        animation: rotate-center 0.6s linear both;
    }
   

    @-webkit-keyframes rotate-center {
        0% {
            -webkit-transform: rotate(0);
            transform: rotate(0);
        }
        100% {
            -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
        }
    }
    @keyframes rotate-center {
        0% {
            -webkit-transform: rotate(0);
            transform: rotate(0);
        }
        100% {
            -webkit-transform: rotate(540deg);
            transform: rotate(540deg);
        }
    }
}
</style>