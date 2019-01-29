export default {
    axiosOptions (config) {
      return {
        timeout: 30000,
        headers: config.token ? {'token': 'someway to get token'} : {},
        baseURL: 'http://neuqsecurity.lyzwhh.top/'  // set request base url
      }
    }
  }
 
  