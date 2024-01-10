const { systemLogger } = require('../middleware/logger')

const listenAndEmitInfo = async io => {
  io.on('connection', socket => {
    socket.on('message', data => {
      console.log('message from client: ', data)
    })
    systemLogger.info('io is connected')
  })
}

module.exports = {
  listenAndEmitInfo
}
