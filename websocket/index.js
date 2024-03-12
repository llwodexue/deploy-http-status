const { systemLogger } = require('../middleware/logger')

const listenAndEmitInfo = async io => {
  io.on('connection', socket => {
    systemLogger.info('io is connected')
    socket.on('message', data => {
      console.log('message from client: ', data)
      socket.emit('message from server: ', { name: 'cat', age: Math.floor(Math.random() * 100) })
    })

    /** error handler */
    socket.use(([events], next) => {
      if (/error/gi.test(events)) return next(new Error(events))
      next()
    })
    socket.on('error', err => systemLogger.error(err))
    socket.on('disconnect', () => systemLogger.info('io is disconnected'))
  })
}

module.exports = {
  listenAndEmitInfo
}
