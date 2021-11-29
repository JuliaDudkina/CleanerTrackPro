import mutations from './mutations'
import actions from './actions'
import getters from './getters'


export default {
    state(){
        return{
            lastFetch: null,
            clients: [],
            client: {},
            successDeletion: false
        }
    },
    mutations,
    actions,
    getters
}