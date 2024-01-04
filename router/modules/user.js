const KoaRouter = require('koa-router')
const jwt = require('jsonwebtoken')
const { PRIVATE_KEY, JWT_EXPIRED, verifyJwtToken } = require('../../utils/jwtToken')
const { SUCCESS, PASSWORD_ERROR, USER_NOT_EXIST } = require('../../utils/httpStatus')

const router = new KoaRouter()

const userDBList = [{ username: 'admin', password: 'admin123' }]
router.post('/login', ctx => {
  let resData = ctx.request.body
  const { password, username } = resData
  const userExit = userDBList.find(v => v.username === username)
  if (userExit) {
    if (password === userExit.password) {
      const token = jwt.sign({ username }, PRIVATE_KEY, { expiresIn: JWT_EXPIRED })
      ctx.body = { ...SUCCESS, ...{ data: { token }, msg: '登录成功' } }
    } else {
      ctx.body = PASSWORD_ERROR
    }
  } else {
    ctx.body = USER_NOT_EXIST
  }
})
router.get('/getUserInfo', ctx => {
  const decodeJwt = verifyJwtToken(ctx)
  if (decodeJwt) {
    const username = decodeJwt.username
    let user = { operator: { operatorName: username, avatar: null } }
    ctx.body = { ...SUCCESS, data: user, msg: '用户信息查询成功' }
  }
})
router.post('/logout', ctx => {
  ctx.body = { ...SUCCESS, ...{ msg: '退出成功' } }
})

module.exports = router