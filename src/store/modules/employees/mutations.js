export default {
    setEmployees(state,payload){
        state.employees = payload;
    },
    addEmployee(state,payload) {
        state.employees.unshift(payload);
    },
    deleteEmployee(state,payload) {
        const resIndex = state.employees.findIndex( client => client.id === payload);
        state.employees.splice(resIndex,1);
    }
}