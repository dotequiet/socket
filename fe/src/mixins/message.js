import * as moment from 'moment'
import { currentEnvApi } from '@/api/login'

export const commonMixin = {
  methods: {
    moment: date => moment(date).format('YYYY-MM-DD HH:mm:ss'),
    /**
     * 错误信息处理
     */
    msgPrompt(obj) {
      if (obj.msg) {
        if (Object.prototype.toString(obj.msg) === '[object Object]' && Object.keys(obj.msg).length === 0) return
        this.$message.closeAll()
        this.$message({
          message: obj.msg,
          type: obj.type || 'error'
        })
      }
    },
    deepCopy: data => JSON.parse(JSON.stringify(data)),
    /**
     * 获取当前环境
     */
    async getCurrentEnv(cb) {
      try {
        let data = await currentEnvApi()
        if (data.ec === 200) {
          this.$alert(`当前操作环境为：<strong style="color: #f60;">${data.result}</strong>`, '提示', {
            dangerouslyUseHTMLString: true,
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            callback: action => {
              cb(action)
            }
          })
        } else {
          this.msgPrompt({ msg: data.em, type: 'error' })
        }
      } catch (e) {
        this.msgPrompt({ msg: e, type: 'error' })
      }
    }
  }
}
