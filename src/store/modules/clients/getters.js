export default {
    clients(state){
        return state.clients;
    },
    hasClients(state){
        return state.clients && state.clients.length > 0;
    },
};