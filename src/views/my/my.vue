<template>
    <div class="my-container">
        <!-- 用户登录注册 -->
        <div v-if="!user" class="header not-login">
            <div class="login">
                <img src="../../assets/mobile.png" alt="登录" @click="$router.push('/login')" />
                <span class="text">登录 / 注册</span>
            </div>
        </div>

        <!-- 用户基本信息面板 -->
        <div v-else class="user-card">
            <!-- 用户头像、姓名 -->
            <van-cell>
                <!-- 使用 title 插槽来自定义标题 -->
                <template #icon>
                    <!-- <img src="../../assets/logo.png" alt class="avatar" /> -->
                    <van-image
                        width="40"
                        height="40"
                        fit="cover"
                        class="avatar"
                        round
                        :src="userInfo.photo"
                    />
                </template>
                <template #title>
                    <span class="username">{{userInfo.name}}</span>
                </template>
                <template #label>
                    <van-tag color="#fff" text-color="#007bff">申请认证</van-tag>
                </template>
            </van-cell>
            <!-- 动态、关注、粉丝 -->
            <div class="user-data">
                <div class="user-data-item">
                    <span>{{ userInfo.art_count }}</span>
                    <span>动态</span>
                </div>
                <div class="user-data-item">
                    <span>{{ userInfo.follow_count }}</span>
                    <span>关注</span>
                </div>
                <div class="user-data-item">
                    <span>{{userInfo.fans_count}}</span>
                    <span>粉丝</span>
                </div>
                <div class="user-data-item">
                    <span>{{ userInfo.like_count}}</span>
                    <span>很赞</span>
                </div>
            </div>
        </div>

        <!-- 自定义功能格 -->
        <van-grid :column-num="2" clickable>
            <van-grid-item text="收藏" class="grid-item">
                <template #icon>
                    <i class="ranran icon-shoucang"></i>
                </template>
            </van-grid-item>
            <van-grid-item text="历史" class="grid-item history">
                <template #icon>
                    <i class="ranran icon-lishi"></i>
                </template>
            </van-grid-item>
        </van-grid>

        <!-- 操作面板 -->
        <van-cell-group class="action-card">
            <van-cell icon="edit"  title="编辑资料" is-link :to="{name:'profile'}" />
            <van-cell icon="chat-o" title="小思同学" is-link />
        </van-cell-group>
        <van-cell v-if="user" @click="onLogout" class="text3" icon="warning-o" title="退出登录" is-link />
    </div>
</template>

<script>
import { mapState } from "vuex";
import { getUserinfo } from "../../api/users"

export default {
    name: "my-info",
    data(){
        return {
            userInfo:{}
        }
    },
    computed: {
        ...mapState(["user"]),
    },
    methods: {
        onLogout() {
            this.$dialog.confirm({
                title: "退出登录",
            }).then(() => {
                    // on confirm
                    this.$store.commit("setUser",null)
                })
                .catch(() => {
                    // on cancel
                });
        },
        async loadUserInfo(){
            try {
                const { data } = await getUserinfo()
                this.userInfo = data.data
                // console.log(this.userInfo);
            }catch {
                this.$toast("获取数据失败，未知错误")
            }
        }
        
    },
    created(){
        if(this.user) this.loadUserInfo()
    }
};
</script>

<style lang="less" scope>
.header {
    height: 361px;
    background: url("../../assets/banner.png");
    object-fit: scale-down;
    object-position: center;
}
.avatar {
    border: 4px solid white;
}
.text3 {
  margin-top: 10px;
  color: #eb5253;
}
.not-login {
    justify-content: center;
    align-items: center;
    display: flex;
    .login {
        flex-direction: column;
        display: flex;
        justify-content: center;
        align-items: center;
        img {
            width: 132px;
            height: 132px;
            margin-bottom: 15px;
        }
        .text {
            font-size: 28px;
            color: white;
        }
    }
}
.user-card {
    background-color: #007bff;
    color: white;
    padding-top: 20px;
    .van-cell {
        background: #007bff;
        color: white;
        &::after {
            display: none;
        }
        .avatar {
            width: 60px;
            height: 60px;
            background-color: #fff;
            border-radius: 50%;
            margin-right: 10px;
        }
        .username {
            font-size: 14px;
            font-weight: bold;
        }
    }
}
.user-data {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    font-size: 14px;
    padding: 30px 0;
    .user-data-item {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 33.33%;
    }
}
.grid-item {
    height: 141px;
    i {
        font-size: 45px;
        color: #eb5253;
    }
    .van-grid-item__text {
        font-size: 28px;
    }
}
.history {
    i {
        color: #ff9d1d;
    }
}


</style>