export default {
    setEmployees(state,payload){
        state.employees = payload;
    },
    addEmployee(state,payload) {
        state.employees.unshift(payload);
    },
    deleteEmployee(state,payload) {
        const resIndex = state.employees.findIndex( employee => employee.id === payload);
        state.employees.splice(resIndex,1);
    },
    setNames(state,payload){
        state.names = payload;
    },
    setEmployee(state, payload){
        state.employee = payload;
    },
    deactivateEmployee(state, payload){
        const employeeId = payload;
        const chosen = state.employees.find(employee => employee.id === employeeId);
        chosen.status = false;
    }
}