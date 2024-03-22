const KoaRouter = require('koa-router')
const { deployRouter, userRouter, httpRouter, downloadRouter, corsRouter } = require('./modules')
const { catchMiddleware, jwtMiddleware, loggerMiddleware } = require('../middleware')
const { VERIFY_ENABLE } = require('../constants')

const router = new KoaRouter()

/** catch must be first */
router.use(catchMiddleware)

/** logger */
router.use(loggerMiddleware)

/** jwt 401 */
VERIFY_ENABLE && router.use(jwtMiddleware)

/** router */
// login module
router.use(userRouter.routes())
// deploy module
router.use(deployRouter.routes())
// http module
router.use(httpRouter.routes())
// download module
router.use(downloadRouter.routes())
// cors module
router.use(corsRouter.routes())

module.exports = router
