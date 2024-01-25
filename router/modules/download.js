const KoaRouter = require('koa-router')
const fs = require('fs')
const path = require('path')
const mime = require('mime')
const { SUCCESS } = require('../../utils/httpStatus')
const { getRange } = require('../../utils')

const router = new KoaRouter()
router.prefix('/download')

const pathResolve = dir => path.resolve(__dirname, '../../static/', dir)

/** 返回文件流下载 */
router.get('/download', async ctx => {
  const { filename } = ctx.query
  const file = pathResolve(filename)
  const fStats = fs.statSync(file)
  ctx.set({
    'Content-Type': 'application/octet-stream',
    'Content-Disposition': `attachment; filename=${filename}`,
    'Content-Length': fStats.size
  })
  ctx.body = fs.readFileSync(file)
})

/** 返回静态站点地址, 通过Blob下载 */
router.get('/downloadUrl', async ctx => {
  const { filename } = ctx.query
  ctx.body = { ...SUCCESS, data: { url: `http://127.0.0.1:8080/${filename}` } }
})
router.get('/downloadUrlCors', async ctx => {
  const { filename } = ctx.query
  ctx.body = { ...SUCCESS, data: { url: `http://127.0.0.1:8080/staic/${filename}` } }
})

/** 通过Base64下载 */
router.get('/downloadBase64', async ctx => {
  const { filename } = ctx.query
  const content = fs.readFileSync(pathResolve(filename))
  ctx.body = {
    ...SUCCESS,
    data: {
      base64: content.toString('base64'),
      filename,
      type: mime.getType(filename)
    }
  }
})

/** 分片下载 */
router.head('/rangeFile', async ctx => {
  const { filename } = ctx.query
  const fStats = fs.statSync(pathResolve(filename))
  ctx.set('Content-Length', fStats.size)
  ctx.length = fStats.size
  ctx.status = 200
})
router.get('/rangeFile', async ctx => {
  const { filename } = ctx.query
  const range = ctx.headers['range']
  const file = pathResolve(filename)
  const { size } = fs.statSync(file)
  if (!range) {
    ctx.set({
      'Accept-Ranges': 'bytes',
      'Content-Disposition': `attachment; filename=${filename}`,
      'Content-Length': size
    })
    ctx.body = fs.readFileSync(file)
    return
  }
  const { start, end } = getRange(range)
  if (start >= size || end >= size) {
    ctx.set({
      'Accept-Ranges': 'bytes',
      'Content-Range': `bytes */${size}`
    })
    ctx.status = 416
    ctx.body = ''
    return
  }
  ctx.status = 206
  ctx.set({
    'Accept-Ranges': 'bytes',
    'Content-Range': `bytes ${start}-${end ? end : size - 1}/${size}`
  })
  ctx.body = fs.createReadStream(file, { start, end })
})

module.exports = router
