const { UNAUTHORIZED, ERROR } = require('../utils/httpStatus')

const catchMiddleware = (ctx, next) => {
  return next().catch(err => {
    if (err.name === 'UnauthorizedError') {
      ctx.body = UNAUTHORIZED
    } else if (err.name === 'JsonWebTokenError') {
      ctx.body = UNAUTHORIZED
    } else if (err.name === 'TokenExpiredError') {
      ctx.body = UNAUTHORIZED
    } else {
      const msg = err.message || '系统错误'
      const code = err.code || 500
      ctx.status = code
      ctx.body = { ...ERROR, ...{ msg, code } }
    }
  })
}

module.exports = catchMiddleware
