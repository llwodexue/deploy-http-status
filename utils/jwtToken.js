const jwt = require('jsonwebtoken')

const PRIVATE_KEY = 'PRIVATE_KEY'
const JWT_EXPIRED = 60 * 60
const AUTHOR_KEY = 'authorization'
const UNLESS_PATH = ['/', '/login', '/logout']

function verifyJwtToken(ctx) {
  let token = ctx.headers[AUTHOR_KEY] || ''
  console.log(token)
  if (token.indexOf('Bearer') >= 0) {
    token = token.replace('Bearer ', '')
  }
  return jwt.verify(token, PRIVATE_KEY)
}

module.exports = { PRIVATE_KEY, JWT_EXPIRED, verifyJwtToken, UNLESS_PATH }
