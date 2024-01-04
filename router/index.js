const KoaRouter = require('koa-router')
const { deployRouter, userRouter } = require('./modules')
const { catchMiddleware, jwtMiddleware, loggerMiddleware } = require('../middleware')

const router = new KoaRouter()

/** logger */
const { accessLogger } = loggerMiddleware
router.use(accessLogger())

/** catch must be first */
router.use(catchMiddleware)

/** jwt 401 */
router.use(jwtMiddleware)

/** router */
router.get('/', async ctx => {
  ctx.body = 'welcome to index'
})
// login module
router.use(userRouter.routes())
// deploy module
router.use(deployRouter.routes())

module.exports = router
