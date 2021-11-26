export default {
    addWorksite(state, payload){
        state.clientWorksites.unshift(payload);
    },
    setOldData(state,payload){
        state.oldData = payload;
    },
    deleteWorksite(state, payload){
        const index = state.clientWorksites.findIndex(item => item.id === payload);
        state.clientWorksites.splice(index, 1);
    },
    loadClientWorksites(state,payload) {
        state.clientWorksites = payload;
    },
}