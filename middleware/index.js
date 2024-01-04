const jwtMiddleware = require('./jwt')
const catchMiddleware = require('./catch')
const loggerMiddleware = require('./logger')

module.exports = { jwtMiddleware, catchMiddleware, loggerMiddleware }
