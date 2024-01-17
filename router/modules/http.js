const KoaRouter = require('koa-router')
const { SUCCESS } = require('../../utils/httpStatus')
const { sleep } = require('../../utils')

const router = new KoaRouter()
router.prefix('/http')

/** 401 */
router.post('/unauthorized', async (ctx) => {
  ctx.body = { ...SUCCESS }
})

/** 500 */
router.post('/serverError', async () => {
  throw new Error('server error')
})

/** 502 */
router.post('/gatewayBad', async ctx => {
  ctx.body = { ...SUCCESS }
})

/** 504 */
router.post('/gatewayTimeout', async ctx => {
  await sleep(5000)
  ctx.body = { ...SUCCESS }
})

module.exports = router
