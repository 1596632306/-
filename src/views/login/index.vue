<template>
    <div>

      <div class="login">
      <!-- 头部 -->
      <van-nav-bar title="会员登录" left-arrow @click-left="$router.go(-1)"/>
      <!-- 主体 -->
      <div class="container">
      <div class="title">
        <h3>手机号登录</h3>
        <p>未注册的手机号登录后将自动注册</p>
      </div>

      <div class="form">
        <div class="form-item">
          <input v-model="mobile" class="inp" maxlength="11" placeholder="请输入手机号码" type="text">
        </div>
        <div class="form-item">
          <input v-model="picCode" class="inp" maxlength="5" placeholder="请输入图形验证码" type="text">
          <img v-if="picUrl" :src="picUrl" alt="" @click="getPirce">
        </div>
        <div class="form-item">
          <input class="inp" v-model="msgCode" placeholder="请输入短信验证码" type="text">
          <button @click="getCodde">{{second===totalSecond?'获取验证码':second+`秒后重新发送`}}</button>
        </div>
      </div>

      <div class="login-btn" @click="login">登录</div>
    </div>
  </div>
    </div>

</template>

<script>
import { getPicCode, getMsgCode, codeLogin } from '@/api/login'

// import { Toast } from 'vant'
export default {
  name: 'loginIndex',
  data () {
    return {
      picCode: '', // 用户输入的图形验证码
      picKey: '', // 图形验证码的唯一标识
      picUrl: '', // 图片的地址
      totalSecond: 60, // 总秒数
      second: 60, // 倒计时的秒数
      timer: null, // 定时器 id
      mobile: '', // 手机号
      msgCode: ''// 短信验证码
    }
  },
  async created () {
    this.getPirce()
  },
  // 离开页面销毁定时器
  destroyed () {
    clearInterval(this.timer)
  },
  methods: {
    // 校验手机号和验证码是否合法
    validFn () {
      if (!/^1[3-9]\d{9}$/.test(this.mobile)) {
        this.$toast('请输入正确的手机号')
        return false
      }
      if (!/^\w{4}$/.test(this.picCode)) {
        this.$toast('请输入正确的图形验证码')
        return false
      }
      return true
    },

    async getPirce () {
      const { data: { base64, key } } = await getPicCode()
      this.picUrl = base64
      this.picKey = key

      // Toast.success('获取验证码成功')
      // this.$toast('获取验证码成功')
    },
    async getCodde () {
      if (!this.validFn()) {
        // 如果没通过校验停止
        return
      }

      if (!this.timer && this.second === this.totalSecond) {
        // 发送请求，获取验证码
        await getMsgCode(this.picCode, this.picKey, this.mobile)
        // console.log(this.picCode, this.picKey, this.mobile)
        this.$toast('发送成功，请注意查收')
        this.timer = setInterval(() => {
          this.second--
          if (this.second < 1) {
            clearInterval(this.timer)
            this.timer = null
            this.second = this.totalSecond
          }
        }, 1000)
      }
      this.$toast('发送成功，请注意查收')
    },
    async login () {
      if (!this.validFn()) {
        return
      }
      if (!/^\d{6}$/.test(this.msgCode)) {
        this.$toast('请输入正确的手机验证码')
        return
      }
      const res = await codeLogin(this.mobile, this.msgCode)
      // console.log(res)
      this.$store.commit('user/setUserInfo', res.data)
      this.$router.push('/')
      this.$toast('登录成功')
    }
  }

}
</script>

<style lang="less" scoped>
.container {
  padding: 49px 29px;

  .title {
    margin-bottom: 20px;
    h3 {
      font-size: 26px;
      font-weight: normal;
    }
    p {
      line-height: 40px;
      font-size: 14px;
      color: #b8b8b8;
    }
  }

  .form-item {
    border-bottom: 1px solid #f3f1f2;
    padding: 8px;
    margin-bottom: 14px;
    display: flex;
    align-items: center;
    .inp {
      display: block;
      border: none;
      outline: none;
      height: 32px;
      font-size: 14px;
      flex: 1;
    }
    img {
      width: 94px;
      height: 31px;
    }
    button {
      height: 31px;
      border: none;
      font-size: 13px;
      color: #cea26a;
      background-color: transparent;
      padding-right: 9px;
    }
  }

  .login-btn {
    width: 100%;
    height: 42px;
    margin-top: 39px;
    background: linear-gradient(90deg,#ecb53c,#ff9211);
    color: #fff;
    border-radius: 39px;
    box-shadow: 0 10px 20px 0 rgba(0,0,0,.1);
    letter-spacing: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
