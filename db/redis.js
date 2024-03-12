const { createClient } = require('redis')

const redisClient = createClient({
  socket: {
    host: '182.92.10.187',
    port: '6379'
  }
  // password: 'll123ll'
})

redisClient.on('error', err => console.log('Redis Client Error', err)).connect()

module.exports = redisClient
