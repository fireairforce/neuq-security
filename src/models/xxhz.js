import { getpassList,handleCode } from 'services/req';

export default {
    namespace:'xxhz',
    state:{},
    effects:{
        *handleCode({payload},{call,put}){
            const res = yield call(handleCode,payload)
            yield put({
                type:'getcode',
                payload:res
            })
        }
    },
    reducers:{
        getcode(state,action){
            return {...state,content:action.payload} 
        },
    }
}