import {createStore} from "vuex";
import clients from './modules/clients/index';
import auth from './modules/auth/index';
import employees from './modules/employees/index';
import equipment from './modules/equipment/index';

const store = createStore({
    modules:{
        clients,
        auth,
        employees,
        equipment
    }
})

export default store;