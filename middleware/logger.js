const path = require('path')
const log4js = require('log4js')
const { verifyJwtToken } = require('../utils/jwtToken')

const envLevel = process.env.NODE_ENV === 'prod' ? 'warn' : 'info'

log4js.configure({
  appenders: {
    // 访问日志
    access: {
      type: 'dateFile',
      pattern: 'yyyy-MM-dd',
      alwaysIncludePattern: true,
      encoding: 'utf-8',
      keepFileExt: true,
      filename: path.join(__dirname, '/logs/access/', 'access.log')
    },
    // 系统日志
    application: {
      type: 'dateFile',
      pattern: '-yyyy-MM-dd',
      alwaysIncludePattern: true,
      encoding: 'utf-8',
      keepFileExt: true,
      filename: path.join(__dirname, '/logs/application/', 'application.log')
    },
    console: {
      type: 'console'
    }
  },
  categories: {
    default: { appenders: ['console'], level: envLevel },
    access: { appenders: ['access', 'console'], level: envLevel },
    application: { appenders: ['console'], level: envLevel }
  }
})

const logger = log4js.getLogger('access')

const loggerMiddleware = async (ctx, next) => {
  const start = new Date()
  const decodeJwt = verifyJwtToken(ctx)
  let user = null
  if (decodeJwt) {
    user = decodeJwt.username
  }
  await next()
  const ms = new Date() - start
  const req = ctx.request
  const res = ctx.response
  const msg = `
    请求用户: ${user},请求接口: ${req.url},请求类型: ${req.method}
    params入参: ${JSON.stringify(req.query)}
    body入参:  ${JSON.stringify(req.body)}
    返回结果: ${JSON.stringify(res.body)}
    请求耗时: ${ms}ms\n`
  logger.info(msg)
}

module.exports = {
  loggerMiddleware,
  systemLogger: log4js.getLogger('application')
}
