const KoaRouter = require('koa-router')
const { SUCCESS, BAD_REQUEST, ERROR, FORBIDDEN } = require('../../utils/httpStatus')
const { sleep } = require('../../utils')
const { verifyJwtToken } = require('../../utils/jwtToken')

const router = new KoaRouter()
router.prefix('/http')

/** 400 */
router.post('/badRequest', async ctx => {
  const id = ctx.request.body?.id
  if (id == null) {
    throw { ...BAD_REQUEST, ...{ message: 'id 为必传参数' } }
  } else {
    ctx.body = SUCCESS
  }
})

/** 401 */
router.post('/unauthorized', async ctx => {
  ctx.body = SUCCESS
})

/** 403 */
router.post('/forbidden', async ctx => {
  const decodeJwt = verifyJwtToken(ctx)
  let user = null
  if (decodeJwt) user = decodeJwt.username
  if (user !== 'superAdmin') {
    ctx.body = FORBIDDEN
  } else {
    ctx.body = SUCCESS
  }
})

/** 500 */
router.post('/serverError', async () => {
  throw ERROR
})

/** 502 */
router.post('/gatewayBad', async ctx => {
  ctx.body = SUCCESS
})

/** 504 */
router.post('/gatewayTimeout', async ctx => {
  await sleep(5000)
  ctx.body = SUCCESS
})

module.exports = router
