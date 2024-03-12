~(() => {
  const request = window.request
  /** 400 */
  const badRequest = async () => {
    await request({
      method: 'post',
      url: '/http/badRequest',
      params: { id: 1 }
    })
  }
  /** 401 */
  const unauthorized = async () => {
    await request({
      method: 'post',
      url: '/http/unauthorized'
    })
  }
  /** 403 */
  const forbidden = async () => {
    await request({
      method: 'post',
      url: '/http/forbidden'
    })
  }
  /** 404 */
  const notFound = async () => {
    await request({
      method: 'post',
      url: '/http/notFound'
    })
  }
  /** 405 */
  const methodNotAllow = async () => {
    await request({
      method: 'post',
      url: '/http/methodNotAllow'
    })
  }
  /** 504 */
  const gatewayTimeout = async () => {
    await request({
      method: 'post',
      url: '/http/gatewayTimeout'
    })
  }
  /** 502 */
  const gatewayBad = async () => {
    await request({
      baseURL: '/gpi',
      method: 'post',
      url: '/http/gatewayBad'
    })
  }
  /** 500 */
  const serverError = async () => {
    await request({
      method: 'post',
      url: '/http/serverError'
    })
  }

  const httpErrorSend = document.getElementById('httpErrorSend')
  httpErrorSend.onclick = async () => {
    gatewayTimeout()
    gatewayBad()
    serverError()
    unauthorized()
    badRequest()
    notFound()
    forbidden()
    methodNotAllow()
  }
})()

~(function () {
  const request = window.request
  /** 204 */
  const noContent = async () => {
    await request({
      method: 'get',
      url: '/http/noContent'
    })
  }
  /** 301 */
  const movedPermanently = async () => {
    await request({
      method: 'get',
      url: '/http/movedPermanently'
    })
  }
  /** 302 */
  const found = async () => {
    await request({
      method: 'get',
      url: '/http/found'
    })
  }
  const httpOkSend = document.getElementById('httpOkSend')
  httpOkSend.onclick = async () => {
    await movedPermanently()
    await found()
    await noContent()
  }
})()

~(function () {
  const request = window.request
  /** 200 */
  const ok = () => {
    return new Promise(resolve => {
      request({
        method: 'get',
        url: '/http/ok'
      }).finally(() => resolve())
    })
  }
  const ok1 = async () => {
    return new Promise(resolve => {
      request({
        method: 'get',
        url: '/http/ok1'
      }).finally(() => resolve())
    })
  }
  const ok2 = async () => {
    return new Promise(resolve => {
      request({
        method: 'get',
        url: '/http/ok2'
      }).finally(() => resolve())
    })
  }
  const ok3 = async () => {
    return new Promise(resolve => {
      request({
        method: 'get',
        url: '/http/ok3'
      }).finally(() => resolve())
    })
  }
  const ok4 = async () => {
    return new Promise(resolve => {
      request({
        method: 'get',
        url: '/http/ok4'
      }).finally(() => resolve())
    })
  }
  const ok200Send = document.getElementById('ok200Send')
  ok200Send.onclick = async () => {
    await ok()
    await ok1()
    await ok2()
    await ok3()
    await ok4()
  }
})()
