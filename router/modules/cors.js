const KoaRouter = require('koa-router')
const { SUCCESS, ERROR } = require('../../utils/httpStatus')

const router = new KoaRouter()
router.prefix('/cors')

/** 200 */
router.get('/base', async ctx => {
  ctx.body = SUCCESS
})

module.exports = router