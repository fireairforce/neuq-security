import {getfailList,getpassList} from '../services/req';

export default {
    namespace:'xxhz',
    state:{},
    effects:{
       *getpassList({payload},{call,put}){
           const resopnse = yield call(getpassList);
           yield put({
               type:'savedata1',
               payload:resopnse
           }) 
        },
        *getfailList({payload},{call,put}){
            const response = yield call(getfailList);
            yield put({
                type:'savedata2',
                payload:response
            })
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