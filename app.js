const Koa = require('koa')
const cors = require('koa-cors')
const KoaStatic = require('koa-static')
const helmet = require('koa-helmet')
const router = require('./router')
const bodyParser = require('koa-bodyparser')
const { systemLogger } = require('./middleware/logger')
const { listenAndEmitInfo } = require('./websocket')

/** app */
const app = new Koa()

/** static */
app.use(new KoaStatic(__dirname + '/nginx/html'))

/** request */
app.use(cors({ origin: true, credentials: true }))
// app.use(cors())
app.use(bodyParser()) // post body
app.use(helmet()) // safe header

/** router */
app.use(router.routes())
app.use(router.allowedMethods()) // 405 Method Not Allowed

/** socket.io */
const server = require('http').createServer(app.callback())
const io = require('socket.io')(server, { cors: true })
listenAndEmitInfo(io)

/** server */
const port = 30007
const nginxPort = 8010
server.listen(port) // need server listen not app listen
systemLogger.info('running on http://127.0.0.1:%s', port)
systemLogger.info('please click it, nginx start on https://127.0.0.1:%s', nginxPort)
