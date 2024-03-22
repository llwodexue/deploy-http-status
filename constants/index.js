// 是否开启 app cors，用来测试接口 cors
const CORS_ENABLE = false
// 是否开启 websocket
const WEBSOCKET_ENABLE = true
// 是否开启接口 token 校验，如果要测试接口 cors 改为 false
const VERIFY_ENABLE = CORS_ENABLE || false
// 是否允许携带资源凭证（前后端都需要开启）
const CREDENTIAL_ENABLE = false

const CORS_Fn = app => {
  app.use(async (ctx, next) => {
    if (!CREDENTIAL_ENABLE) {
      ctx.set('Access-Control-Allow-Origin', '*')
      if (ctx.method === 'OPTIONS') {
        ctx.set('Access-Control-Allow-Headers', '*')
        ctx.set('Access-Control-Allow-Methods', '*')
      }
    } else {
      const originWhiteList = ['https://127.0.0.1:8021']
      const originFind = originWhiteList.find(x => x === ctx.request.header.origin)
      // withCredential 需要写具体的ip地址、且OPTIONS需要具体写明
      ctx.set('Access-Control-Allow-Origin', originFind)
      ctx.set('Access-Control-Allow-Credentials', true)
      if (ctx.method === 'OPTIONS') {
        ctx.set('Access-Control-Allow-Headers', 'content-type, custom-hh')
        ctx.set('Access-Control-Allow-Methods', 'PUT,DELETE')
        ctx.set('Access-Control-Max-Age', '10')
      }
    }
    next()
  })
}

module.exports = { CORS_ENABLE, WEBSOCKET_ENABLE, VERIFY_ENABLE, CORS_Fn }
