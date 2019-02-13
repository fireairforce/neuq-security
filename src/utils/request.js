import axios from 'axios'
import appConfig from './../config/app';

const fetch = options => {
  let { method = 'get',data,url,token = false,headers={} } = options
  const axiosOptions = appConfig.axiosOptions({
    token
  })

  const myAxios = axios.create(axiosOptions)
  let token1 = window.localStorage.token?window.localStorage.token:"";
  headers = token1 ? {...headers,token:token1}:headers
  // console.log(token1);
  switch (method.toLowerCase()) {
    case 'get':
      return myAxios.get(url, {
        params: data,
        headers: headers
      })
    case 'delete':
      return myAxios.delete(url, {
        data: data
      })
    case 'post':
      return myAxios.post(url, data,{headers})
    case 'put':
      return myAxios.put(url, data)
    case 'patch':
      return myAxios.patch(url, data)
    case 'export':
      return myAxios.get(url, {
        params: data,
        responseType: 'blob'
      })
    default:
      return myAxios(options)
  }
}

const downFile = (blob, fileName) => {
  if (window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveBlob(blob, fileName)
  } else {
    let link = document.createElement('a')
    link.href = window.URL.createObjectURL(blob)
    link.download = fileName
    link.target = '_blank'
    link.click()
    window.URL.revokeObjectURL(link.href)
  }
}

/**
 * Custom request based on axios
 * @param options See below examples
 * @returns {Promise.<*>}
 */

export default async options => {
  const res = await fetch(options)
  if (options.method === 'export') {
    downFile(res.data, options.filename)
    return true
  }
  const {data} = res
  return data
}
