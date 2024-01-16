const KoaRouter = require('koa-router')
const { SUCCESS } = require('../../utils/httpStatus')
const { sleep } = require('../../utils')

const router = new KoaRouter()
router.prefix('/http')

/** 504 */
router.post('/gatewayTimeout', async ctx => {
  await sleep(5000)
  ctx.body = { ...SUCCESS }
})

module.exports = router
