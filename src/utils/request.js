import axios from 'axios'
import appConfig from 'config/app';

const fetch = options => {
  let { method = 'get',data,url,token = false,headers={} } = options
  const axiosOptions = appConfig.axiosOptions({
    token
  })

  const myAxios = axios.create(axiosOptions)
  let token1 = window.localStorage.token?window.localStorage.token:"";
  headers = token1 ? {...headers,token:token1}:headers;
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
      return myAxios.post(url,data,{headers})
    case 'put':
      return myAxios.put(url,data)
    case 'patch':
      return myAxios.patch(url,data)
    case 'export':
      return myAxios.get(url,{
         params:data,
         headers:headers, 
         responseType:'blob'
        })
    default:
      return myAxios(options)
  }
}

const downFile = (res, fileName) => {
  if (window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveBlob(res.data, fileName)
  } else {
    console.log(res);
      let blob = new Blob([res.data],{ type: res.headers['content-type'] }); 
      let downloadElement = document.createElement('a');
      let href = window.URL.createObjectURL(blob); //创建下载的链接
      downloadElement.href = href;
      
      downloadElement.download = `二维码.zip`; //下载后文件名
      document.body.appendChild(downloadElement);
      downloadElement.click(); //点击下载
      document.body.removeChild(downloadElement); //下载完成移除元素
      window.URL.revokeObjectURL(href); //释放掉blob对象
  }
}

/**
 * Custom request based on axios
 * @param options See below examples
 * @returns {Promise.<*>}
 */

export default async options => {
  const res = await fetch(options);
  if (options.method === 'export') {
    downFile(res, options.token);
    return true
  }
  const { data } = res
  return data
}
