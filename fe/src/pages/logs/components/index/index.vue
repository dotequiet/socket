<template>
  <div class="logs-wrapper">
    <div class="open-monitor">
      <div v-if="!isOpenMonitor"></div>
      <div v-if="isOpenMonitor">
        <el-input v-model="sendValue"></el-input>
        <el-button type="danger" @click="sendMsg">发送</el-button>
      </div>
      <el-button v-if="!isOpenMonitor" type="primary" @click="openSocket">打开Socket</el-button>
      <el-button v-else type="danger" @click="closeMonitor">关闭Socket</el-button>
    </div>
    <div class="logs-wrapper-body">
      <div class="logs-body">
        <pre v-loading="loading">{{receive}}</pre>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { io } from 'socket.io-client'
import { commonMixin } from '@/mixins/message.js'

export default {
  mixins: [commonMixin],
  data() {
    return {
      isOpenMonitor: false,
      loading: false,
      socket: null,
      receive: '',
      selfId: '',
      sendValue: '',
      // 定义滚动条默认位置
      scrollTop: null,
      // 定义按钮默认状态
      isScrollTop: false,
    }
  },
  computed: {
    ...mapState({
      userInfo: state => state.common.userInfo
    }),
  },
  mounted() {},
  methods: {
    openSocket() {
      if (this.socket) {
        this.socket.close()
        this.connection()
      } else {
        this.connection()
      }
    },
    closeMonitor() {
      this.isOpenMonitor = false
      this.socket.close()
    },
    connection() {
      this.selfId = `${this.userInfo.id}`
      let host = `http://localhost:3000/socket?selfId=${this.selfId}`
      if (window.location.origin.indexOf('mtp') > -1) {
        host = `${window.location.origin}/socket?selfId=${this.selfId}`
      }
      console.log(host)
      this.socket = io(host, {
        path: '',
        reconnection: true,
        reconnectionAttempts: Infinity,
        reconnectionDelay: 1000,
        reconnectionDelayMax: 5000,
        randomizationFactor: 0.5,
        timeout: 20000,
        autoConnect: true,
        transports: ['websocket']
      })
      this.socket.on('disconnect', () => {
        console.log('断开连接')
      })
      this.socket.on('receiveMsg', (data) => {
        console.log('receiveMsg', data)
      })
      this.socket.on('receiveMsgSocket', (data) => {
        console.log('receiveMsgSocket', data)
        this.isOpenMonitor = true
      })
      this.socket.on('clientMsg', (sockets)=>{
        this.receive += sockets
        this.socket.emit('receiptMessage', true)
      })
    },
    sendMsg() {
      this.socket.emit('chatMessage', 10, this.selfId)
    },
    async beatCheck() {
      try {
        let data = await fetch(`${this.url}/caller/moa/queryCommon`, this.createParams(JSON.stringify([this.selfId]), 'testMeshHotFixInfoDuration'))
        data = await data.json()
      } catch (e) {
        this.msgPrompt({ msg: e, type: 'error' })
      }
    },
    /**
     * 滚动到底部
     */
    scrollToTop() {
      let nowTop = document.querySelector('.logs-wrapper-body').scrollTop // 获取当前滚动条位置
      let scrollHeight = document.querySelector('.logs-wrapper-body').scrollHeight // 获取当前滚动条位置
      let clientHeight = document.querySelector('.logs-wrapper-body').clientHeight // 获取当前滚动条位置
      if (nowTop + clientHeight < scrollHeight) {
        document.querySelector('.logs-wrapper-body').scrollTo({
            top: scrollHeight - clientHeight,
            behavior: 'smooth'
        })
      }
    }
  }
}
</script>
<style lang="scss">
  .logs-wrapper {
    .el-input--small .el-input__inner {
      height: 25px;
      line-height: 25px;
    }
  }
</style>
<style lang="scss" scoped>
  .logs-wrapper {
    width: 1024px;
    height: 100%;
    background: #272822;
    color: #fff;
    margin: 0 auto;
    overflow: hidden;
    border-radius: 5px;
    .logs-wrapper-body {
      height: 95%;
      overflow-y: scroll;
      overflow-x: hidden;
    }
    .el-input {
      width: 200px;
    }
    .open-monitor {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 5px;
      margin-bottom: 10px;
      background: #272822;
      overflow: hidden;
      border-bottom: 1px solid #59b4c4;
      .el-button {
        padding: 5px;
        font-size: 12px;
      }
    }
    .logs-body {
      width: 100%;
      padding: 0 10px;
    }
    pre {
      white-space: pre-wrap;
    }
  }
</style>
