<template>
  <div>
    <Header ref="header_box"></Header>

    <div class="position-relative login-box" ref="login_box">
      <div class="login" ref="login_content">
        <div class="login-title font-more-biggest">{{$t('login.title')}}</div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-position="top" label-width="100px" class="demo-ruleForm">
          <el-form-item :label="$t('login.username')" prop="username">
            <el-input v-model="ruleForm.username" clearable></el-input>
          </el-form-item>
          <el-form-item :label="$t('login.password')" prop="password">
            <el-input type="password" v-model="ruleForm.password" clearable></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              size="medium"
              class="sign font-big"
              @click="submitForm('ruleForm')"
              :loading="signDisabled">
              {{signDisabled?$t('login.logining'):$t('login.login')}}
            </el-button>
            <div class="login-hr">
            <span>or</span>
            </div>
          </el-form-item>
        </el-form>
        <router-link to="/register">
          <button class="register-btn font-big">{{$t('login.register')}}</button>
        </router-link>
      </div>
    </div>

    <Footer ref="footer_box"></Footer>
  </div>
</template>

<script type="text/ecmascript-6">
  import Header from 'components/common/Header'
  import Footer from 'components/common/Footer'
  import {_apiLogin, _apiGetUserInfo} from '../api/index'
  import * as types from 'store/mutation-types'
  import {mapActions, mapMutations} from 'vuex'
  import {testPhone, testEmail, testPassword} from 'common/validate'

  const minHeaderFooter = 80 // 内容与header、footer最小间距和

  export default {
    name: 'login',
    data () {
      const validatePass = (rule, value, callback) => {
        if (!testPassword(value)) {
          callback(new Error(this.$t('login.pwdConfirmMessage')))
        } else {
          callback()
        }
      }
      const validateName = (rule, value, callback) => {
        if (testPhone(value) || testEmail(value)) {
          callback()
        } else {
          callback(new Error(this.$t('login.accountConfirmMessage')))
        }
      }

      return {
        signDisabled: false,
        ruleForm: {
          username: '',
          password: ''
        },
        rules: {
          username: [
            { required: true, message: this.$t('login.accountEmptyMessage'), trigger: 'blur' },
            { validator: validateName, trigger: 'blur' }
          ],
          password: [
            { required: true, message: this.$t('login.pwdEmptyMessage'), trigger: 'blur' },
            { validator: validatePass, trigger: 'blur' }
          ]
        }
      }
    },
    beforeRouteLeave (to, from, next) {
      window.removeEventListener('resize', this.refresh)
      next()
    },
    mounted () {
      this.refresh()
      window.addEventListener('resize', this.refresh)
    },
    methods: {
      _login () {
        this.signDisabled = true
        let req = {
          login: this.ruleForm.username,
          password: this.ruleForm.password
        }
        _apiLogin(req).then((res) => {
          // console.log(res)
          if (res && res.statusCode === 200) {
            this.setLoginStatus({flag: true, token: res.data})
            // this.$router.push({ path: '/' })
            return _apiGetUserInfo()
          }
        }).then((respones) => {
          if (respones.statusCode === 200) {
            this.setUserInfo(respones.data)
            try {
              if (this.$route.query.redirect) {
                let url = decodeURIComponent(this.$route.query.redirect)
                this.$router.push({path: url})
              } else {
                this.$router.push({path: '/'})
              }
            } catch (err) {
              this.$router.push({path: '/'})
            }
          }
          this.signDisabled = false
        }).catch(() => {
          this.signDisabled = false
        })
      },
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this._login()
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      refresh () {
        let h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
        let headerHeight = this.$refs.header_box.$el.offsetHeight
        let footerHeight = this.$refs.footer_box.$el.offsetHeight
        this.$refs.login_box.style.height = h - headerHeight - footerHeight + 'px'
        this.$refs.login_box.style.minHeight = this.$refs.login_content.offsetHeight + minHeaderFooter + 'px'
      },
      ...mapActions({
        setLoginStatus: 'setStore'
      }),
      ...mapMutations({
        setUserInfo: types.SET_USERINFO
      })
    },
    components: {
      Header,
      Footer
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~assets/stylus/variable.styl"


  .login-box
    background $color-main-bg
  .login
    position absolute
    left 50%
    top 50%
    transform translate(-50%,-50%)
    width 480px
    .login-title
      color $color-main-font
      margin-bottom 29px
    .sign
      width 100%
      font-weight normal
      height 40px
    .forget-password
      color $color-btn
      &:hover
        color $color-btn-hover
    .login-btn
      margin-top 30px
      box-sizing border-box
      background $color-btn
      color white
      display block
      border-radius 5px
      margin-bottom 24px
      width 100%
      height 44px
      &:hover
        background $color-btn-hover
    .login-hr
      border-top 1px solid $color-main-border
      width 100%
      height 1px
      position relative
      margin-top 20px
      span
        position absolute
        left 50%
        top -21px
        width 36px
        margin-left -18px
        text-align center
        color $color-main-border
        background $color-main-bg
    .register-btn
      box-sizing border-box
      border-radius 5px
      border 1px solid $color-btn
      color $color-btn
      display block
      width 100%
      height 40px
      margin-top 20px
      &:hover
        color $color-btn-hover
        border 1px solid $color-btn-hover

</style>
