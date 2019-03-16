import { handleLogin } from 'services/req';
import {message} from 'antd';
import { routerRedux } from 'dva/router';
export default {
    namespace: "shdl",
    state: {
       data:{}
    },
    effects:{
        *handleLogin({payload},{call,put}){
             const res = yield call(handleLogin,payload);
             if(res.code===0){
                 yield put({type:'update',payload:res})
                 message.success("登录成功"); 
                 yield put(routerRedux.push('/infocheck'))
                }else if(res.code===302){
                    message.error(res.message);
                }else if(res.code===303){
                    message.error(res.message);
                }else if(res.code===304){
                    message.error(res.message);
                }     
       }
    },
    reducers:{
        update (state,{ payload }){
            localStorage.setItem("token",payload.data.tokenStr)
            localStorage.setItem("role",payload.data.role)
            return { ...state, data:payload}
        }
    }
}