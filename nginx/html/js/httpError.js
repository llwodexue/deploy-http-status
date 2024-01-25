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
  httpErrorSend.onclick = () => {
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
  httpOkSend.onclick = () => {
    movedPermanently()
    found()
    noContent()
  }
})()

~(function () {
  const request = window.request
  // function resolveBlob(res, mimeType) {
  //   const aLink = document.createElement('a')
  //   const blob = new Blob([res.data], { type: mimeType })
  //   const pat = new RegExp('filename=([^;]+\\.[^\\.;]+)')
  //   let contentDisposition
  //   // fix: lower browser
  //   if (res.headers['content-disposition']) contentDisposition = res.headers['content-disposition']
  //   if (res.headers['Content-Disposition']) contentDisposition = res.headers['Content-Disposition']
  //   const result = pat.exec(decodeURI(contentDisposition))
  //   let fileName = result && result[1]
  //   if (window.navigator.msSaveBlob) {
  //     try {
  //       window.navigator.msSaveBlob(blob, fileName) // ie 浏览器
  //     } catch (e) {
  //       console.log(e)
  //     }
  //   } else {
  //     const URL = window.URL || window.webkitURL
  //     aLink.href = URL.createObjectURL(blob)
  //     aLink.setAttribute('download', fileName)
  //     document.body.appendChild(aLink)
  //     aLink.click()
  //     window.URL.revokeObjectURL(aLink.href)
  //     document.body.removeChild(aLink)
  //   }
  // }
  /** 206 */
  const serialPartialContent = async () => {
    await request({
      method: 'get',
      url: '/http/partialContent',
      params: { filename: 'my-book.pdf' }
    })
  }
  const parallelPartialContent = async () => {
    await request({
      method: 'get',
      url: '/http/partialContent',
      params: { filename: 'my-book.pdf' }
    })
  }
  const downloadSerial = document.getElementById('downloadSerial')
  downloadSerial.onclick = () => {
    serialPartialContent()
  }
  const downloadParallel = document.getElementById('downloadParallel')
  downloadParallel.onclick = () => {
    parallelPartialContent()
  }
})()
