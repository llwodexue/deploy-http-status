const userRouter = require('./user')
const deployRouter = require('./deploy')
const httpRouter = require('./http')
const downloadRouter = require('./download')
const corsRouter = require('./cors')

module.exports = { userRouter, deployRouter, httpRouter, downloadRouter, corsRouter }
