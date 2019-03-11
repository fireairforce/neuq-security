import { handleApply } from '../services/req';
import {message} from 'antd';
export default {
    namespace: "apply",
    state:{
    },
    effects:{
        *handleApply({payload},{call,put}){
             const response = yield call(handleApply,payload); 
             if(response.code==="0"){
                 message.success('申请成功');
             }
             yield put({
                type:"codeReturn",
                payload: response
            })    
       }
    },
    reducers: {
       codeReturn(state,action){
           return {...state,value:action.payload}
       }
    }
};