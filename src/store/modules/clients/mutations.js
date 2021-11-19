export default {
    addClient(state){
        state.clients.unshift();
    },
    // updateClients(state,payload){
    //     state.clients = payload;
    // },
    setClients(state, payload) {
        state.clients = payload;
    },
    deleteClient(state,payload){
        const resIndex = state.clients.findIndex( client => client.id === payload);
        state.clients.splice(resIndex,1);
    }
};