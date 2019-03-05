import request from '../utils/request';
import API from '../config/api';
// 提交车辆申请
const handleApply = (data) => request({
    url: API.passApply,
    method: 'post',
    data
})
// 登录
const handleLogin = (data) => request({
    url: API.webLogin,
    method: 'post',
    data
}) 
// 提交通过申请
const passExamin = (data) => request({
    url: API.passExamine,
    method: 'post',
    token:true,
    data,
})
// 提交拒绝申请
const passReject = (data) => request({
    url: API.passReject,
    method: 'post',
    token:true,
    data,    
})
// 获得制证的二维码
const handleCode = (data) => request({
    url: `${API.getCode}+${data}`,
    method:'export',
    token:true,
    data
})

export { handleApply, handleLogin,passExamin,passReject,handleCode }
