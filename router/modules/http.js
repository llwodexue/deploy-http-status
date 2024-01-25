const KoaRouter = require('koa-router')
const fs = require('fs')
const path = require('path')
const { SUCCESS, BAD_REQUEST, ERROR, FORBIDDEN } = require('../../utils/httpStatus')
const { sleep, getRange } = require('../../utils')
const { verifyJwtToken } = require('../../utils/jwtToken')

const router = new KoaRouter()
router.prefix('/http')

/** 200 */
router.get('/ok', async ctx => {
  ctx.body = SUCCESS
})

/** 204 */
router.get('/noContent', async ctx => {
  ctx.body = null
})

/** 206 */
const pathResolve = dir => path.resolve(__dirname, '../../static/', dir)
router.get('/partialContent', async ctx => {
  const { filename } = ctx.query
  const { size } = fs.statSync(pathResolve(filename))
  const range = ctx.headers['range']
  if (!range) {
    ctx.set('Accept-Ranges', 'bytes')
    ctx.body = fs.readFileSync(pathResolve(filename))
    return
  }
  const { start, end } = getRange(range)
  if (start >= size || end >= size) {
    ctx.status = 416
    ctx.body = null
    return
  }
  ctx.status = 206
  ctx.set('Accept-Ranges', 'bytes')
  ctx.set('Content-Range', `bytes ${start}-${end ? end : size - 1}/${size}`)
  ctx.body = fs.createReadStream(pathResolve(filename), { start, end })
})

/** 301 */
router.get('/movedPermanently', async ctx => {
  ctx.status = 301
  ctx.redirect('/api/http/ok')
})

/** 302 */
router.get('/found', async ctx => {
  ctx.redirect('/api/http/ok')
})

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
    throw { ...FORBIDDEN, message: `${user} 没有权限` }
  } else {
    ctx.body = SUCCESS
  }
})

/** 405 */
router.get('/methodNotAllow', async ctx => {
  ctx.body = SUCCESS
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
