<template>
  <div class="nav-wrapper clearfix">
    <div class="logo fl">
      <a href="/">
        <img style="width: 100%;" :src=""/>
      </a>
      <span class="eye animate"></span>
      <span class="eye right-eye animate"></span>
    </div>
    <span class="fl" style="font-size: 18px;display: inline-block;line-height: 45px;margin-left: 10px;margin-top: 3px;">{{systemname}}</span>
    <div class="user fr clearfix" style="line-height: 45px;">
      <span style="color: #f60;font-size: 13px;">当前环境:</span>
      <el-select style="margin-right: 40px;" v-model="currentEnv" placeholder="请选择" @change="changeEnv">
        <template v-for="(item, idx) in  envList">
          <el-option :key="idx" :label="item" :value="item"></el-option>
        </template>
      </el-select>
      <i class="el-icon-user"></i>
      <span class="name" style="margin-left: 10px;">{{user.userCnName}}</span>
      <span style="margin-left: 20px;cursor: pointer;">
        <a href="/apirest/session/logout">退出</a>
      </span>
    </div>
    <slot></slot>
  </div>
</template>
<script>
import { userApi, getAllEnvApi, currentEnvApi, saveRegionEnvApi } from '@/api/login'
import { navTab, envList } from './config'
import { commonMixin } from '@/mixins/message.js'
export default {
  name: 'selNav',
  mixins: [commonMixin],
  props: {
    systemname: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      navTab,
      envList: [],
      currentEnv: 'online',
      user: {},
    }
  },
  mounted() {
    this.getUser()
  },
  methods: {
    async getUser() {
      try {
        let data = await userApi()
        if (data.ec === 200) {
          this.user = data.result
          this.getAllEnv()
          this.currentEnvFn()
        } else {
          this.msgPrompt({ msg: data.em, type: 'error' })
        }
      } catch (e) {
        this.msgPrompt({ msg: e, type: 'error' })
      }
    },
    async currentEnvFn() {
      try {
        let data = await currentEnvApi()
        if (data.ec === 200) {
          this.currentEnv = data.result
        } else {
          this.msgPrompt({ msg: data.em, type: 'error' })
        }
      } catch (e) {
        this.msgPrompt({ msg: e, type: 'error' })
      }
    },
    async getAllEnv() {
      try {
        let data = await getAllEnvApi()
        if (data.ec === 200) {
          this.envList = data.result
        } else {
          this.msgPrompt({ msg: data.em, type: 'error' })
        }
      } catch (e) {
        this.msgPrompt({ msg: e, type: 'error' })
      }
    },
    async changeEnv() {
      try {
        let data = await saveRegionEnvApi({
          env: this.currentEnv
        })
        if (data.ec === 200) {
          location.reload()
        } else {
          this.msgPrompt({ msg: data.em, type: 'error' })
        }
      } catch (e) {
        this.msgPrompt({ msg: e, type: 'error' })
      }
    }
  }
}
</script>
<style lang="scss">
  .nav-wrapper {
    .el-input--small .el-input__inner {
      height: 20px;
      width: 100px;
      line-height: 20px;
      font-size: 12px;
    }
  }

</style>
<style lang="scss" scoped>
  .nav-wrapper {
    width: 100%;
    padding: 0 40px;
    position: relative;
    background-color: #1d212c;
    color: #fff;
    margin: 0;
    font: 400 16px/1.4 lucida grande, Helvetica, Arial, "Georgia", "Xin Gothic", "Hiragino Sans GB", "Droid Sans Fallback", "Microsoft YaHei", sans-serif;
    z-index: 101;
    .logo {
      width: 114px;
      line-height: 45px;
      position: relative;
    }
    img {
      height: 100%;
      display: inline-block;
      vertical-align: middle;
    }
    .eye {
      position: absolute;
      background: #fff;
      height: 6px;
      width: 3px;
      border-top-left-radius: 25%;
      border-top-right-radius: 25%;
      border-bottom-left-radius: 25%;
      border-bottom-right-radius: 25%;
      top: 20px;
      left: 8px;
    }
    .right-eye {
      left: 15px;
    }
    .animate {
      transform-origin: 50% 50%;
      animation: jump 5s linear infinite;
    }
    @keyframes jump {
      0% { top: 20px; }
      7% { top: 18px; }
      10% { top: 22px; }
      11% { top: 20px; }
      100% { top: 20px; }
    }
    a {
      height: auto;
      width: auto;
      color: #fff;
    }
  }
</style>
