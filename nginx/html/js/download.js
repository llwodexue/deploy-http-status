~(function () {
  const request = window.request
  // 1. window.open
  const windowOpenClick = async () => {
    window.open('http://127.0.0.1:8080/api/download/download?filename=origin.png', '_blank')
  }
  // 2. download by url
  const downloadByUrl = url => {
    const aLink = document.createElement('a')
    aLink.download = url.split('/').pop()
    aLink.href = url
    aLink.click()
  }
  const urlClick = async () => {
    const res = await request({
      method: 'get',
      url: '/download/downloadUrl',
      params: { filename: 'profile.jpg' }
    })
    downloadByUrl(res.data.url)
  }
  // 3. download by blob
  const downloadByBlob = (content, fileName, type) => {
    const blob = new Blob([content], { type })
    const aLink = document.createElement('a')
    aLink.download = fileName
    aLink.href = URL.createObjectURL(blob)
    aLink.click()
    URL.revokeObjectURL(aLink.href)
  }
  const blobClick = async () => {
    const resUrl = await request({
      method: 'get',
      url: '/download/downloadUrl',
      params: { filename: 'profile.jpg' }
    })
    const download = async (url, fileName) => {
      const res = await request({
        method: 'get',
        url,
        responseType: 'blob'
      })
      downloadByBlob(res.data, fileName)
    }
    const url = resUrl.data.url
    if (url) download(url, url.split('/').pop())
  }
  // 4. download by base64
  const base64ToBlob = (base64, type) => {
    const byteChars = atob(base64)
    const byteArray = new Array(byteChars.length)
    for (let i = 0; i < byteChars.length; i++) {
      byteArray[i] = byteChars.charCodeAt(i)
    }
    const buffer = Uint8Array.from(byteArray)
    const blob = new Blob([buffer], { type })
    return blob
  }
  const downloadByBase64 = ({ base64, filename, type }) => {
    const blob = base64ToBlob(base64, type)
    downloadByBlob(blob, filename, type)
  }
  const base64Click = async () => {
    const { data } = await request({
      method: 'get',
      url: '/download/downloadBase64',
      params: { filename: 'pig.jpg' }
    })
    downloadByBase64({ base64: data.base64, filename: data.filename, type: data.type })
  }

  // 5.serial
  const filename = 'low-code.pptx'
  const serialClick = async () => {
    console.time('直接下载')
    const res = await request({
      method: 'get',
      url: '/download/rangeFile',
      params: { filename },
      responseType: 'blob'
    })
    downloadByBlob(res.data, filename)
    console.timeEnd('直接下载')
  }
  // 6.parallel
  const downloadRange = (filename, start, end, i) => {
    return new Promise((resolve, reject) => {
      request({
        method: 'get',
        url: '/download/rangeFile',
        params: { filename },
        responseType: 'blob',
        headers: { range: `bytes=${start}-${end}` }
      })
        .then(res => resolve({ i, buffer: res.data }))
        .catch(reject)
    })
  }
  const parallelClick = async () => {
    console.time('并行下载')
    const res = await request({
      method: 'head',
      url: '/download/rangeFile',
      params: { filename }
    })
    const size = Number(res.headers['content-length'])
    const limit = 1024 * 1000
    let length = Math.floor(size / limit)
    const arr = []
    for (let i = 0; i <= length; i++) {
      let start = i * limit
      let end = i == length ? size - 1 : (i + 1) * limit - 1
      arr.push(downloadRange(filename, start, end, i))
    }
    Promise.all(arr).then(res => {
      const buffers = res.map(item => item.buffer)
      const mergeBlob = new Blob([...buffers])
      downloadByBlob(mergeBlob, filename)
      console.timeEnd('并行下载')
    })
  }

  const windowBtnDownload = document.getElementById('windowBtnDownload')
  windowBtnDownload.onclick = () => windowOpenClick()
  const aBtnDownload = document.getElementById('aBtnDownload')
  aBtnDownload.onclick = () => urlClick()
  const blobBtnDownload = document.getElementById('blobBtnDownload')
  blobBtnDownload.onclick = () => blobClick()
  const base64BtnDownload = document.getElementById('base64BtnDownload')
  base64BtnDownload.onclick = () => base64Click()
  const serialDownload = document.getElementById('serialDownload')
  serialDownload.onclick = () => serialClick()
  const parallelDownload = document.getElementById('parallelDownload')
  parallelDownload.onclick = () => parallelClick()
})()
