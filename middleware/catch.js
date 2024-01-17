const { UNAUTHORIZED, ERROR } = require('../utils/httpStatus')

const catchMiddleware = (ctx, next) => {
  return next().catch(err => {
    console.log(err.name)
    if (['UnauthorizedError', 'JsonWebTokenError', 'TokenExpiredError'].includes(err.name)) {
      ctx.body = { ...UNAUTHORIZED, ...{ msg: err.message } }
      ctx.status = 401
    } else {
      const msg = err.message || '系统错误'
      const code = err.code || 500
      ctx.status = code
      ctx.body = { ...ERROR, ...{ msg, code } }
    }
  })
}

module.exports = catchMiddleware
