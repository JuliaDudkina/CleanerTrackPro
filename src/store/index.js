import {createStore} from "vuex";
import clients from './modules/clients/index';
import auth from './modules/auth/index';
import employees from './modules/employees/index';
import equipment from './modules/equipment/index';
import worksites from './modules/worksites/index'
import jobs from'./modules/jobs/index';

const store = createStore({
    modules:{
        clients,
        auth,
        employees,
        equipment,
        worksites,
        jobs
    },
    state(){
        return{
            successDeletion: false
        }
    },
    getters:{
        successDeletion(state){
            return state.successDeletion;
        }
    },
    actions:{
        setSuccessDeletion(context){
            context.commit('setSuccessDeletion');
        }
    },
    mutations:{
        setSuccessDeletion(state){
            state.successDeletion = !state.successDeletion;
        }
    },

})

export default store;