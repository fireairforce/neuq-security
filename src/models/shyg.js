import { passExamin,passReject,getCheckedList,getUnckeckedList } from 'services/req';

export default {
    namespace: "shyg",
    state:{
        unCheckedList:{
            data:[],
            total:0,
            currentPage:1
        }, 
        CheckedList:{
            data:[],
            total:0,
            currentPage:1,

        }
    },
    effects:{
        * init({ payload },{ put }){
           yield put({ type:'getCheckedList',payload })
           yield put({ type:'getUnckeckedList',payload })
        },
        * getCheckedList ({ payload },{ call, put }) {
             const res = yield call(getCheckedList,payload)
             const pay = res.data
             yield put({type:'checkedlist',payload:pay})
        },
        * getUnckeckedList ({ payload },{ call,put }) {
            const res = yield call(getUnckeckedList,payload)
            const pay = res.data
            yield put({type:'uncheckedlist',payload:pay})
        },
        * handlepassList ({payload},{ call, put }) {
           const resopnse = yield call(passExamin,payload);
           if( resopnse.code===0 ){
            window.location.href = window.location.href;
           }
        },
        * handlefailList ({payload},{call,put}) {
           const resopnse = yield call(passReject,payload);
           if(resopnse.code===0){
            window.location.href = window.location.href;   
           }
        }
    },
    reducers:{
        checkedlist(state,{ payload }){
            return {...state,CheckedList:payload}
        },
        uncheckedlist(state,{ payload }){
            return {...state,unCheckedList:payload}
        }
    }
}