export default {
    addWorksite(state, payload){
        state.worksites.unshift(payload);
    },
    loadWorksites(state,payload) {
        state.worksites = payload;
    },
    setOldData(state,payload){
        state.oldData = payload;
    },
    deleteWorksite(state, payload){
        const index = state.worksites.findIndex(item => item.id === payload);
        state.worksites.splice(index, 1);
    },
    loadClientWorksites(state,payload) {
        state.clientWorksites = payload;
    },
}