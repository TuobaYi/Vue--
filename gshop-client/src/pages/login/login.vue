<template>

  <section class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">硅谷外卖</h2>
        <div class="login_header_title">
          <a href="javascript:;" :class="{on:isPhone}" @click="isPhone=true">短信登录</a>
          <a href="javascript:;" :class="{on:!isPhone}" @click="isPhone=false">密码登录</a>
        </div>
      </div>
      <div class="login_content">
        <form>
          <div :class="{on:isPhone}">
            <section class="login_message">
              <input type="tel" maxlength="11" placeholder="手机号" v-model="phone">
              <button :disabled="computeTime>0 || !isRightPhone" class="get_verification" :class="{right_phone_number:isRightPhone}"
                @click.prevent="handleVerification"
              >{{computeTime?`已发送${computeTime}`:"获取验证码"}}</button>
            </section>
            <section class="login_verification">
              <input type="tel" maxlength="8" placeholder="验证码" v-model="code">
            </section>
            <section class="login_hint">
              温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>
          <div :class="{on:!isPhone}">
            <section>
              <section class="login_message">
                <input type="tel" maxlength="11" placeholder="手机/邮箱/用户名" v-model="name">
              </section>
              <section class="login_verification">
                <input :type="showPwd ? 'text' : 'password'" maxlength="8" placeholder="密码" v-model="pwd">
                <div class="switch_button off" :class="{is_switch: showPwd}">
                  <div class="switch_circle" :class="{is_switch: showPwd}" @click="showPwd = !showPwd"></div>
                  <span class="switch_text" >{{showPwd ? 'pwd' : ''}}</span>
                </div>
              </section>
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="验证码" v-model="captcha">
                <img class="get_verification" :src="imageUrl" alt="captcha" @click="handleImage">
              </section>
            </section>
          </div>
          <button class="login_submit" @click.prevent="handleLogin">登录</button>
        </form>
        <a href="javascript:;" class="about_us">关于我们</a>
      </div>
      <a href="javascript:" class="go_back">
        <i class="iconfont icon-jiantou2" @click="handleSkip"></i>
      </a>
    </div>
  </section>
</template>

<script>
  import {reqSmsCode,reqSmsLogin,reqPwdLogin} from '../../api';
  import { Toast,MessageBox } from 'mint-ui';
  export default {
    name: 'login',
    data() {
      return {
        isPhone:true, //是否电话登录
        computeTime:0,//定义一个倒计时
        showPwd:false,//密码显示,false不显示
        imageUrl:'http://localhost:5000/captcha',//请求验证码图片的地址(特定格式)
        phone:'13716962779',//存 电话号码
        code:'',//收集手机验证码
        name:'',//用户名
        pwd:'',//登录密码
        captcha:'',//图片验证码
      }
    },
    computed:{
      isRightPhone () {
        return /^1\d{10}$/.test(this.phone)
      }
    },
    methods:{
      handleSkip(){
        this.$router.back();
      },//页面的跳转
      async handleVerification(){
        this.computeTime=5;
       let timeId = setInterval(()=>{
          this.computeTime--;
          if (!this.computeTime)clearInterval(timeId)
        },1000)
        if (this.isRightPhone){
         const result = await reqSmsCode(this.phone);
          if (result.code != 0) {
            Toast('获取验证码失败!!');
          }
        }
      },//手机 获取验证码 的处理
      handleImage(){
        this.imageUrl='http://localhost:5000/captcha?reqTime='+Date.now()
      },//验证码请求路径处理(图片验证)
     async handleLogin(){
        console.log('登录--空')
        const {isPhone,isRightPhone,code,phone,name,pwd,captcha}=this;
          if (isPhone) {//手机验证码登录 处理逻辑
            if (isRightPhone && code.length===6) {
              let result = await reqSmsLogin({code,phone});//发请求
              console.log(result);
              if (result.code === 0) {
                this.$router.replace('login');
              }else {
                MessageBox('手机---验证码登录失败!!!');
              }
            }
          }else{//账号 密码 登录 的逻辑
             if (name  && pwd){
               if (captcha.length===4){
                 let result = await reqPwdLogin({name,pwd,captcha})
                 if (result.code === 0) {
                    this.$store.dispatch('uptataUser',result.data);
                    this.$router.replace('login');
                 }else {
                   MessageBox('密码登录失败!!!');
                 }
               }
             }
          }
      },//处理各种登录的问题
    },
  }
</script>

<style scoped lang="stylus">
  .loginContainer
    width 100%
    height 100%
    background #fff
    .loginInner
      padding-top 60px
      width 80%
      margin 0 auto
      .login_header
        .login_logo
          font-size 40px
          font-weight bold
          color #02a774
          text-align center
        .login_header_title
          padding-top 40px
          text-align center
          >a
            color #333
            font-size 14px
            padding-bottom 4px
            &:first-child
              margin-right 40px
            &.on
              color #02a774
              font-weight 700
              border-bottom 2px solid #02a774
      .login_content
        >form
          >div
            display none
            &.on
              display block
            input
              width 100%
              height 100%
              padding-left 10px
              box-sizing border-box
              border 1px solid #ddd
              border-radius 4px
              outline 0
              font 400 14px Arial
              &:focus
                border 1px solid #02a774
            .login_message
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .get_verification
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                border 0
                color #ccc
                font-size 14px
                background transparent
                &.right_phone_number
                  color: #000
            .login_verification
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .switch_button
                font-size 12px
                border 1px solid #ddd
                border-radius 8px
                transition background-color .3s,border-color .3s
                padding 0 6px
                width 30px
                height 16px
                line-height 16px
                color #fff
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                &.off
                  background #fff
                &.is_switch
                  background-color: #02a774
                  .is_switch
                    transform translateX(150%)
                  .switch_text
                    float right
                    color #58787b
                &.on
                  background #02a774
                >.switch_circle
                  //transform translateX(27px)
                  position absolute
                  top -1px
                  left -1px
                  width 16px
                  height 16px
                  border 1px solid #ddd
                  border-radius 50%
                  background #fff
                  box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
                  transition transform .3s
            .login_hint
              margin-top 12px
              color #999
              font-size 14px
              line-height 20px
              >a
                color #02a774
          .login_submit
            display block
            width 100%
            height 42px
            margin-top 30px
            border-radius 4px
            background #4cd96f
            color #fff
            text-align center
            font-size 16px
            line-height 42px
            border 0
        .about_us
          display block
          font-size 12px
          margin-top 20px
          text-align center
          color #999
      .go_back
        position absolute
        top 5px
        left 5px
        width 30px
        height 30px
        >.iconfont
          font-size 20px
          color #999
</style>
