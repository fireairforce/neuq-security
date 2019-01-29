import { handleLogin } from '../services/req';
import {message} from 'antd';
import { routerRedux } from 'dva/router';
export default {
    namespace: "shdl",
    state:{},
    effects:{
        *handleLogin({payload},{call,put}){
             const response = yield call(handleLogin,payload);
             console.log(response);
             if(response.code===0){
                 message.success("登录成功");
                 localStorage.setItem("token",response.data.tokenStr);
                 yield put(routerRedux.push("/infocheck"));
                }else if(response.code===302){
                    message.error("用户不存在");
                }else if(response.code===303){
                    message.error("密码错误");
                }  
             yield put({
                type:'codeReturn',
                payload: response
            })    
       }
    },
    reducers:{
       codeReturn(state,action){
           return {...state,value:action.payload}
       }
    }
}