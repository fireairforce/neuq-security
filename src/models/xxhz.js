import { getpassList } from '../services/req';

export default {
    namespace:'xxhz',
    state:{},
    effects:{
       *getpassList({payload},{call,put}){
        //    console.log('qaq');
           const response = yield call(getpassList);
        //    console.log(response);
           yield put({
               type:'savedata1',
               payload:response
           }) 
        },
    },
    reducers:{
        savedata1(state,action){
            return {...state,value:action.payload}
        },
    }
}