import axios from 'axios';
axios.interceptors.request.use(function (request) {
    request['headers']['common']['Accept'] = 'application/json;charset=GBK;';
    return request;
  }, function (error) {
    return Promise.reject(error);
  });