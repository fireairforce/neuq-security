import { handleLogin } from 'services/req';
import {message} from 'antd';
import { routerRedux } from 'dva/router';
export default {
    namespace: "shdl",
    state:{
        
    },
    effects:{
        *handleLogin({payload},{call,put}){
             const response = yield call(handleLogin,payload);
             if(response.code===0){
                 message.success("登录成功");
                 localStorage.setItem("token",response.data.tokenStr);
                 if(response.data.role===1){
                    yield put(routerRedux.push("/infoall"));
                 }else if(response.data.role===0){
                    yield put(routerRedux.push("/infocheck"));
                 } 
                }else if(response.code===302){
                    message.error(response.message);
                }else if(response.code===303){
                    message.error(response.message);
                }else if(response.code===304){
                    message.error(response.message);
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