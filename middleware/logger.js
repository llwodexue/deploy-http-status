const path = require('path')
const log4js = require('koa-log4')

log4js.configure({
  appenders: {
    // 访问日志
    access: {
      type: 'dateFile',
      pattern: '-yyyy-MM-dd.log',
      alwaysIncludePattern: true,
      encoding: 'utf-8',
      filename: path.join('/logs/access/', 'access.log')
    },
    // 系统日志
    application: {
      type: 'dateFile',
      pattern: '-yyyy-MM-dd.log',
      alwaysIncludePattern: true,
      encoding: 'utf-8',
      filename: path.join('/logs/application/', 'application.log')
    },
    accessErrorLogger: {
      type: 'dateFile',
      pattern: '-yyyy-MM-dd.log',
      alwaysIncludePattern: true,
      encoding: 'utf-8',
      filename: path.join('/logs/accessErrorLogger/', 'accessErrorLogger.log')
    },
    accessSimpleLogger: {
      type: 'dateFile',
      pattern: '-yyyy-MM-dd.log',
      alwaysIncludePattern: true,
      encoding: 'utf-8',
      filename: path.join('/logs/accessSimpleLogger/', 'accessSimpleLogger.log')
    },
    sqlLog: {
      type: 'dateFile',
      pattern: '-yyyy-MM-dd.log',
      alwaysIncludePattern: true,
      encoding: 'utf-8',
      filename: path.join('/logs/sqlLog/', 'sqlLog.log')
    },
    out: {
      type: 'console'
    }
  },
  categories: {
    default: { appenders: ['out'], level: 'info' },
    access: { appenders: ['access'], level: 'info' },
    application: { appenders: ['application', 'out'], level: 'WARN' },
    accessErrorLogger: { appenders: ['accessErrorLogger', 'out'], level: 'WARN' },
    accessSimpleLogger: { appenders: ['accessSimpleLogger', 'out'], level: 'WARN' },
    sqlLog: { appenders: ['sqlLog', 'out'], level: 'info' }
  }
})

module.exports = {
  // 记录所有访问级别的日志
  accessLogger: () => log4js.koaLogger(log4js.getLogger('access')),
  //记录所有应用级别的日志
  systemLogger: log4js.getLogger('application'),
  //记录所有访问时报错的日志
  accessErrorLogger: log4js.getLogger('accessErrorLogger'),
  //记录所有简单访问时报错的日志
  accessSimpleLogger: log4js.getLogger('accessSimpleLogger'),
  //记录所有SQL的日志
  sqlLog: log4js.getLogger('sqlLog')
}
