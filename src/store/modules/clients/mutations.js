export default {
    addClient(state){
        state.clients.push();
    },
    setClients(state, payload) {
        state.clients = payload;
    },
};