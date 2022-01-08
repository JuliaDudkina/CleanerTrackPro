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
    deactivateWorksite(state, payload){
        const worksiteId = payload;
        const chosen = state.clientWorksites.find(worksite => worksite.id === worksiteId);
        chosen.status = false;
    }
}