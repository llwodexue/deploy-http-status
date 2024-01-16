const KoaRouter = require('koa-router')
const { deployRouter, userRouter } = require('./modules')
const { catchMiddleware, jwtMiddleware, loggerMiddleware } = require('../middleware')

const router = new KoaRouter()

/** catch must be first */
router.use(catchMiddleware)

/** logger */
router.use(loggerMiddleware)

/** jwt 401 */
router.use(jwtMiddleware)

/** router */
// login module
router.use(userRouter.routes())
// deploy module
router.use(deployRouter.routes())

module.exports = router
