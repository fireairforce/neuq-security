import { getpassList,getfailList,passExamin,passReject} from '../services/req';
import { message } from 'antd';

export default {
    namespace: "shyg",
    state:{},
    effects:{
        *getpassList({payload},{call,put}){
            console.log(window.localStorage.token);
            const response = yield call(getpassList);
            yield put({
                type: 'savedata1',
                payload: response
             })
        },
        *getfailList({payload},{call,put}){
            const resopnse = yield call(getfailList);
            yield put({
                type:'savedata2',
                payload: resopnse
            })
        },
        *handlepassList({payload},{call,put}){
           const resopnse = yield call(passExamin,payload);
           if(resopnse.code===0){
               message.success('您已同意该申请');
           }
        },
        *handlefailList({payload},{call,put}){
           const resopnse = yield call(passReject,payload);
           if(resopnse.code===0){
               message.success('您已拒绝该申请');
           }
        }
    },
    reducers:{
        savedata1(state,action){
            return {...state,value:action.payload}
        },
        savedata2(state,action){
            return {...state,content:action.payload}
        }
    }
}