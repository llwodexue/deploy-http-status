const Koa = require('koa')
const cors = require('koa-cors')
const KoaStatic = require('koa-static')
const helmet = require('koa-helmet')
const router = require('./router')
const bodyParser = require('koa-bodyparser')
const { systemLogger } = require('./middleware/logger')

/** app */
const app = new Koa()

/** static */
app.use(new KoaStatic(__dirname + '/public'))

/** request */
app.use(cors({ origin: true, credentials: true }))
app.use(bodyParser()) // post body
app.use(helmet())

/** router */
app.use(router.routes())
app.use(router.allowedMethods()) // 405 Method Not Allowed

/** socketIo */
const http = require('http').Server(app.callback())
const socketIo = require('socket.io')(http)
socketIo.on('connection', socket => {
  console.log(socket)
  systemLogger.info('socketIo user connected')
})

/** server */
const server = app.listen(3007, () => {
  const { port } = server.address()
  systemLogger.info('running on http://127.0.0.1:%s', port)
})
