~(() => {
  const request = window.request
  const gatewayTimeout = async () => {
    await request({
      method: 'post',
      url: '/http/gatewayTimeout'
    })
  }
  const gatewayBad = async () => {
    await request({
      method: 'post',
      url: '/http/gatewayBad'
    })
  }
  const serverError = async () => {
    await request({
      method: 'post',
      url: '/http/serverError'
    })
  }

  const httpSend = document.getElementById('httpSend')
  httpSend.onclick = () => {
    gatewayTimeout()
    gatewayBad()
    serverError()
  }
})()
