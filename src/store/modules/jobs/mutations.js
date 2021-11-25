export default {
    addJob(state,payload) {
        state.jobs.unshift(payload);
    },
    setJobs(state,payload){
        state.jobs = payload;
    },
    deleteJob(state, payload){
        const index = state.jobs.findIndex(job => job.id === payload);
        state.jobs.splice(index, 1);
    },
    setOldJob(state, payload){
        state.oldJob = payload;
    },
    loadEmployeesJobs(state,payload) {
        state.employeesJobs = payload;
    },
}