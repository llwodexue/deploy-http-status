const koaJwt = require('koa-jwt')
const { PRIVATE_KEY, UNLESS_PATH } = require('../utils/jwtToken')

const jwtMiddleware = koaJwt({
  secret: PRIVATE_KEY,
  algorithms: ['HS256'],
  credentialsRequired: true
}).unless({ path: UNLESS_PATH })

module.exports = jwtMiddleware
