import { getpassList,handleCode } from '../services/req';

export default {
    namespace:'xxhz',
    state:{},
    effects:{
       *getpassList({payload},{call,put}){
           const response = yield call(getpassList);
        //    console.log(response);
           yield put({
               type:'savedata1',
               payload:response
           }) 
        },
        *handleCode({payload},{call,put}){
            const response = yield call(handleCode);
            console.log(response);
            yield put({
                type:'getcode',
                payload:response
            })
        }
    },
    reducers:{
        savedata1(state,action){
            return {...state,value:action.payload}
        },
        getcode(state,action){
            return {...state,content:action.payload} 
        },
    }
}