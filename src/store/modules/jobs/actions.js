export default {
    async addJob(context,data){
        const newJob = {
            startDate: data.startDate,
            type: data.type,
            endDate: data.endDate,
            hazard: data.hazard,
            fee: data.fee,
            chosenEmployee: data.chosenEmployee,
            equipment: data.equipment,
        };

        const response = await fetch(
            'https://cleanertrackpro-default-rtdb.firebaseio.com/jobs.json',
            {
                method: 'POST',
                body: JSON.stringify(newJob)
            }
        );

        if (!response.ok) {
            const error = new Error(response.message || 'Failed.Try Later');
            throw error;
        }

        context.commit('addJob', {
            ...newJob
        });
    },
    async loadJobs(context){
        const response = await fetch(
            'https://cleanertrackpro-default-rtdb.firebaseio.com/jobs.json'
        );
        const responseData = await response.json();

        if (!response.ok) {
            const error = new Error(responseData.message || 'Failed to fetch!');
            throw error;
        }

        let jobs = [];

        for (const key in responseData) {
            const job = {
                id: key,
                startDate: responseData[key].startDate,
                type: responseData[key].type,
                endDate: responseData[key].endDate,
                hazard: responseData[key].hazard,
                fee: responseData[key].fee,
                chosenEmployee: responseData[key].chosenEmployee,
                equipment: responseData[key].equipment,
            }
            jobs.unshift(job);
        }
        context.commit('setJobs',jobs)
    },
    async deleteJob(context, data){
        const jobId = data;

        const response = await fetch (`https://cleanertrackpro-default-rtdb.firebaseio.com/jobs/${jobId}.json`,
            {
                method: "DELETE"
            }
        )
        if (!response.ok) {
            const error = new Error(response.message || 'Failed to fetch!');
            throw error;
        }

        context.commit('deleteJob',jobId);
    },
    setOldJob(context, payload){
        const oldJob = payload;
        context.commit('setOldJob',oldJob);
    },
    async updateJob(context,data) {
        const jobId = context.rootGetters.oldJob.id;
        const updatedJob = {
            startDate: data.startDate,
            type: data.type,
            endDate: data.endDate,
            hazard: data.hazard,
            fee: data.fee,
            chosenEmployee: data.employee,
            equipment: data.equipment,
        }
        const response = await fetch(`https://cleanertrackpro-default-rtdb.firebaseio.com/jobs/${jobId}.json`,{
            method: "PUT",
            body: JSON.stringify(updatedJob)
        });

        if (!response.ok) {
            const error = new Error(response.message || 'Failed.Try Later');
            throw error;
        }
    },
    async loadEmployeesJobs(context, payload){
        const employee = payload;
        const response = await fetch('https://cleanertrackpro-default-rtdb.firebaseio.com/jobs.json');
        const responseData = await response.json();

        if (!response.ok) {
            const error = new Error(response.message || 'Failed.Try Later');
            throw error;
        }
        let jobs = []
        for (const key in responseData) {
            const job ={
                id: key,
                startDate: responseData[key].startDate,
                type: responseData[key].type,
                endDate: responseData[key].endDate,
                hazard: responseData[key].hazard,
                fee: responseData[key].fee,
                chosenEmployee: responseData[key].chosenEmployee,
                equipment: responseData[key].equipment,
            }
            if(job.chosenEmployee === employee){
                jobs.unshift(job);
            }
        }
        context.commit('loadEmployeesJobs',jobs);
    },
}