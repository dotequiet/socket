const configure = {
  appenders: {
    stdout: { type: 'stdout' },
    http: {
      type: 'dateFile',
      filename: 'logs/console/index',
      pattern: 'yyyy-MM-dd.log',
      keepFileExt: true,
      alwaysIncludePattern: true,
      encoding: 'utf-8'
    },
    err: {
      type: 'dateFile',
      filename: 'logs/error/index',
      pattern: '-yyyy-MM-dd.log',
      alwaysIncludePattern: true
    },
    warming: {
      type: 'dateFile',
      filename: 'logs/warming/index',
      pattern: '-yyyy-MM-dd.log',
      alwaysIncludePattern: true
    },
    oth: {
      type: 'dateFile',
      filename: 'logs/all/index',
      pattern: '-yyyy-MM-dd.log',
      alwaysIncludePattern: true
    }
  },
  categories: {
    default: { appenders: ['stdout', 'oth'], level: 'DEBUG' },
    err: { appenders: ['stdout', 'err'], level: 'FATAL' },
    http: { appenders: ['stdout', 'http'], level: 'INFO' },
    warming: { appenders: ['stdout', 'warming'], level: 'ERROR' }
  }
}

module.exports = configure
