import { passExamin,passReject} from '../services/req';

export default {
    namespace: "shyg",
    state:{},
    effects:{
        *handlepassList({payload},{call,put}){
           const resopnse = yield call(passExamin,payload);
           if(resopnse.code===0){
            window.location.href = window.location.href;
           }
        },
        *handlefailList({payload},{call,put}){
           const resopnse = yield call(passReject,payload);
           if(resopnse.code===0){
            window.location.href = window.location.href;   
           }
        }
    }
}