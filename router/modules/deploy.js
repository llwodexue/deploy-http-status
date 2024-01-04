const KoaRouter = require('koa-router')
const { SUCCESS } = require('../../utils/httpStatus')
const fs = require('fs')

const router = new KoaRouter()
router.prefix('/deploy')

/** 获取目录地址和可执行shell脚本 */
router.get('/get', ctx => {
  const processCwd = process.cwd()
  const files = fs.readdirSync(processCwd)
  const shellList = files.filter(i => i.endsWith('.sh')).filter(i => i !== 'temp.sh')
  ctx.body = {
    ...SUCCESS,
    data: {
      shellList,
      processCwd
    }
  }
})

/** 执行脚本 */
router.post('/runShell', ctx => {
  let resData = ctx.request.body
  const execFn = () => {
    return new Promise((resolve, reject) => {})
  }
  ctx.body = {}
})

module.exports = router
