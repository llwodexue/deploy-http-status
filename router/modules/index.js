const userRouter = require('./user')
const deployRouter = require('./deploy')
const httpRouter = require('./http')
const downloadRouter = require('./download')

module.exports = { userRouter, deployRouter, httpRouter, downloadRouter }
