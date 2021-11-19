import {createStore} from "vuex";
import clients from './modules/clients/index'

const store = createStore({
    modules:{
        clients,
    }
})

export default store;