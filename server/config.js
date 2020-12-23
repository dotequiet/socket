const mysqlMaster = {
  host: 'mysql',
  database: 'test',
  user: 'user',
  password: 'password',
  port: '8080',
  dateStrings: true
}
const mysqlSlave = {
  host: 'mysql_s1',
  database: 'test',
  user: 'user',
  password: 'password',
  port: '8080',
  dateStrings: true
}
const loginConfig = {
  ONLINE: {
    key: 'c2a3dd64-a0b1-4dfd-a21a-b4a5d0dedfc0',
    secret: '4a92ced0-bce2-4689-9b07-8196869e252e',
    login1: 'http://login.com',
    login: 'http://login.com'
  },
  TEST: {
    key: 'f06f42cc-9086-41fa-a478-fb6c5e6966f6',
    secret: '71f88cd1-db7e-4b33-888e-45cc488cbdb9',
    login1: 'http://login.com',
    login: 'http://login.com'
  }
}

const env = process.env.TEST_ENV || 'TEST'
if (global.log) {
  log.http.info('process.env.TEST_ENV', env)
  log.http.info('process.env.TEST_ENV', env)
}
const systemList = ['test']

module.exports = {
  mysqlMaster,
  systemList,
  mysqlSlave,
  loginConfig: loginConfig[env]
}
