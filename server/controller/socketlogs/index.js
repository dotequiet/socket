const socket = require('socket.io')

class SocketIo {
  constructor(server, option) {
    this.option = Object.assign({
      cb: () => {}
    }, option)
    this.cb = ''
    this.server = server
    this.receiptStatus = false
    this.io = ''
    this.socket = ''
    this.createIo()
  }
  createIo() {
    // path: '/socket',
    this.io = socket(this.server, {
      serveClient: false,
      pingInterval: 10000,
      pingTimeout: 5000,
      cookie: false
    })
    this.io.on('connection', client => {
      client.on('disconnect', () => {
        log.warming.error('disconnect', 'close')
      })
      client.emit("receiveMsg", '连接整体的socket');
    })
    this.socket = this.io.of('/socket')
    this.socket.on('connection', client => {
      let selfId = new URLSearchParams(client.handshake.url.split('?')[1]).get('selfId')
      console.log(selfId)
      client.join(selfId)
      client.emit("receiveMsgSocket", '连接整体的socket');
      client.on('disconnect', () => {
        log.warming.error('disconnect', 'close')
      })
      client.on('receiptMessage', (data = false) => {
        if (typeof this.cb === 'function') {
          this.cb(data)
        }
      })
      client.on('chatMessage', (data, id) => {
        console.log('a', data)
        let a = !isNaN(+data) ? +data : 10
        let i = 0
        while(i < a) {
          ((num) => {
            setTimeout(() => {
              this.sendSocketMsg('clientMsg', `from client message!!!! ${data}${num}\n`, id)
            }, i*1000)
          })(i)
          i++
        }
      })
    })
  }
  sendSocketMsg(msgRomm, data, id, fn) {
    if (typeof fn === 'function') {
      this.cb = fn
    }
    log.http.info('sendSocketMsg', msgRomm, data, id, fn)
    this.socket.to(id).emit(msgRomm, data)
  }
}

module.exports = {
  SocketIo
}
