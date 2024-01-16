const KoaRouter = require('koa-router')
const { SUCCESS } = require('../../utils/httpStatus')
const fs = require('fs')
const { exec } = require('child_process')
const { systemLogger } = require('../../middleware')

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
const runShellFn = shell => {
  return new Promise((resolve, reject) => {
    const child = exec(shell)
    child.stdout.on('data', data => resolve(data))
    child.stderr.on('data', err => {
      systemLogger.error('stderr:', err)
      reject(err)
    })
    child.on('close', () => {})
  })
}
router.post('/runShell', async ctx => {
  const shell = 'cd nginx/html && ls -l'
  const data = await runShellFn(shell)
  ctx.body = { ...SUCCESS, data }
})

const sleep = (timer = 1000) => {
  return new Promise(resolve => {
    setTimeout(() => resolve(), timer)
  })
}
router.post('/gateTimeout', async ctx => {
  await sleep(5000)
  ctx.body = { ...SUCCESS }
})

module.exports = router
