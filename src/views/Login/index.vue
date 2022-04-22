<template>
    <div class="login-container">
        <van-nav-bar title="黑马头条" >
            <template #left>
                <i class="ranran  icon-guanbi van-icon" @click="$router.back()" ></i>
            </template>
        </van-nav-bar>

        <van-form ref="loginForm" @submit="onSubmit" class="login-form">
            <van-field v-model="user.mobile" 
                       name="mobile" 
                       type="number"
                       maxlength="11"
                       :rules="userFormrules.phone" 
                       placeholder="请输入手机号">
                <i slot="left-icon" class="ranran icon-shouji"></i>
            </van-field>
            <van-field 
                        v-model="user.code" 
                        type="number" 
                        name="code"
                        maxlength="6"
                        :rules="userFormrules.yzm" 
                        placeholder="请输入验证码">
                <i slot="left-icon" class="ranran icon-yanzhengma"></i>
                <template #button>
                    <van-count-down
                        v-if="isTime"  
                        :time="time" 
                        format="ss s"
                        @finish="isTime=false"
                    />
                    <van-button
                        v-else
                        native-type="button"
                        class="send-sms"
                        round
                        size="small"
                        type="default"
                        @click = "onVerification"
                    >发送验证码</van-button>
                </template>
            </van-field>
            <div class="login-btn">
                <van-button block class="btn" type="info" native-type="submit">登录</van-button>
            </div>
        </van-form>
    </div>
</template>

<script>
import { login , sendSms} from "../../api/users";

export default {
    name: "my-login",
    data() {
        return {
            user: {
                mobile: "13911111111",
                code: "246810",
            },
            userFormrules: {
                phone: [
                    { required: true, message: "手机号不能为空" },
                    {
                        pattern: /^1[3|5|7|8]\d{9}$/,
                        message: "手机号格式不对",
                    },
                ],
                yzm: [
                    { required: true, message: "验证码不能为空" },
                    {
                        pattern: /\d{6}$/,
                        message: "验证码格式不对",
                    },
                ],
            },
            time:60000,
            isTime:false,
        };
    },
    methods: {
        async onSubmit() {
            this.$toast.loading({
                message: "登陆中...",
                forbidClick: true,
                loadingType: 'spinner',
                duration:1 , // 持续时间 如果是0 则一直不停止
            });

            try{
                let { data } = await login(this.user);
                // console.log(data);
                
                this.$toast.success("登陆成功");
                
                this.$store.commit("setUser",data.data)
                // this.$router.push("/index/user")
                // console.log(this.$route.query);
                this.$router.push({
                    path:this.$route.query.ReturnUrl || "/index/user",
                })

            }catch(err){
                if (err.response.status === 400) {
                    this.$toast.fail("手机号或者验证码错误");
                } else {
                    this.$toast.fail("网络繁忙");
                }
            }
        },
        async onVerification(){

            try{
               await this.$refs.loginForm.validate("mobile")
               this.isTime = true;
            }catch(err){
                return ;
            }
            
            try{
                await sendSms(this.user.mobile)
                this.$toast("发送成功");
            }catch(err){
                if (err.response.status === 429) {
                    this.$toast("发送的太频繁，请稍后发送");
                } else {
                    this.$toast("发送失败");
                }
            }

        }
    },
};
</script>

<style lang="less" scope>
.login-form {
    .ranran {
        font-size: 34px;
    }
    .send-sms {
        width: 2.13333;
        height: 0.61333rem;
        line-height: 0.61233rem;
        background-color: #ededed;
        font-size: 0.29333rem;
        color: #666;
    }
    .login-btn {
        padding: 53px 33px;
        .btn {
            background-color: #6dbffb;
            border: none;
        }
    }
}














</style>