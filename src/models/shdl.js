import { handleLogin } from 'services/req';
import { message } from 'antd';
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
                 if(res.data.user_id>1050){
                    yield put({type:'update',payload:res})
                    message.success(res.message); 
                    yield put(routerRedux.push('/infoall'))  
                 }else{
                    yield put({type:'update',payload:res})
                    message.success(res.message); 
                    yield put(routerRedux.push('/infocheck'))
                   }  
                 }else{
                     message.error(res.message)
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