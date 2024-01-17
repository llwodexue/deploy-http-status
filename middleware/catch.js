const { UNAUTHORIZED, ERROR } = require('../utils/httpStatus')

const catchMiddleware = (ctx, next) => {
  return next().catch(err => {
    if (['UnauthorizedError', 'JsonWebTokenError', 'TokenExpiredError'].includes(err.name)) {
      ctx.body = { ...UNAUTHORIZED, ...{ message: err.message } }
      ctx.status = 401
    } else {
      const message = err.message || '系统错误'
      const code = err.code || 500
      ctx.status = code
      ctx.body = { ...ERROR, ...{ message, code } }
    }
  })
}

module.exports = catchMiddleware
