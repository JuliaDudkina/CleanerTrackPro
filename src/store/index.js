import {createStore} from "vuex";
import clients from './modules/clients/index';
import auth from './modules/auth/index';
import employees from './modules/employees/index'

const store = createStore({
    modules:{
        clients,
        auth,
        employees
    }
})

export default store;