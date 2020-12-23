const log4js = require('log4js');
const config= require('./configs.js');
log4js.configure(config)
class Log {
  constructor() {
    this.console = log4js.getLogger('default')
    this.error = log4js.getLogger('err')
    this.http = log4js.getLogger('http')
    this.warming = log4js.getLogger('warming')
  }
}
const log = new Log()
const console = log4js.getLogger('default')
const error = log4js.getLogger('err')
const http = log4js.getLogger('http')
const warming = log4js.getLogger('warming')
module.exports = {
  log,
  console,
  error,
  http,
  warming
}
// log.warming.error('modest', 'test');
// log.error.fatal('modest', 'test');
// log.http.info('modes', fn);
// log.console.info("this is info");
// log.console.warn("this is warn");
// log.console.debug("this is debug");
// log.console.error("this is error");
