import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";

export default {
    state(){
        return{
            equipment: [],
            item: {},
            itemNames: [],
        }
    },
    getters,
    mutations,
    actions
}