const KoaRouter = require('koa-router')
const { SUCCESS } = require('../../utils/httpStatus')

const router = new KoaRouter()
router.prefix('/cors')

router.get('/base', async ctx => {
  ctx.body = SUCCESS
})
router.post('/base', async ctx => {
  ctx.body = SUCCESS
})
router.delete('/base', async ctx => {
  ctx.body = SUCCESS
})
router.put('/base', async ctx => {
  ctx.body = SUCCESS
})

let sessionId = 1
router.post('/login', async ctx => {
  ctx.set('custom-aa', 123)
  ctx.set('Access-Control-Expose-Headers', 'custom-aa')
  sessionId++
  ctx.cookies.set('sessionId', sessionId)
  ctx.body = SUCCESS
})

module.exports = router
