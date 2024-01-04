const Koa = require('koa')
const cors = require('koa-cors')
const router = require('./router')
const bodyParser = require('koa-bodyparser')

/** app */
const app = new Koa()

/** request */
app.use(cors({ origin: true, credentials: true }))
app.use(bodyParser()) // post body

/** router */
app.use(router.routes())
app.use(router.allowedMethods()) // 405 Method Not Allowed

/** server */
const server = app.listen(3007, () => {
  const { port } = server.address()
  console.log('running on http://127.0.0.1:%s', port)
})
