import getters from  './getters';
import actions from  './actions';
import mutations from './mutations'

export default {
    state(){
        return{
            employees: [],
            names: [],
            employee:{},
        }
    },
    getters,
    mutations,
    actions,

}