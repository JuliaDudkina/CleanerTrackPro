export default {
    async addWorksite(context, data){
        const newWorksite = {
            name: data.name,
            address: data.address,
            type: data.type,
            clientId: data.clientId
        }

        const response = await fetch('https://cleanertrackpro-default-rtdb.firebaseio.com/worksites.json',
            {
                method: 'POST',
                body: JSON.stringify(newWorksite)
            }
        );
        if (!response.ok) {
            const error = new Error(response.message || 'Failed.Try Later');
            throw error;
        }

        context.commit('addWorksite', {
            ...newWorksite
        })
    },
    async updateWorksite(context, data){
        const worksiteId = context.rootGetters.oldData.id;
        const updatedWorksite = {
            name: data.name,
            address: data.address,
            type: data.type,
            clientId: data.clientId
        }
        const response = await fetch(`https://cleanertrackpro-default-rtdb.firebaseio.com/worksites/${worksiteId}.json`,{
            method: "PUT",
            body: JSON.stringify(updatedWorksite)
        });

        if (!response.ok) {
            const error = new Error(response.message || 'Failed.Try Later');
            throw error;
        }
    },
    setOldData(context, data) {
        const oldData = data;
        context.commit('setOldData', oldData);
    },
    async deleteWorksite(context, data) {
        const worksiteId = data;

        const response = await fetch(`https://cleanertrackpro-default-rtdb.firebaseio.com/worksites/${worksiteId}.json`,
            {
                method: "DELETE"
            }
        )
        if (!response.ok) {
            const error = new Error(response.message || 'Failed.Try Later');
            throw error;
        }

        context.commit('deleteWorksite',worksiteId);
    },
    async loadClientWorksites(context){
        const id = context.rootGetters.client.id;
        console.log(id);
        const response = await fetch('https://cleanertrackpro-default-rtdb.firebaseio.com/worksites.json');
        const responseData = await response.json();

        if (!response.ok) {
            const error = new Error(response.message || 'Failed.Try Later');
            throw error;
        }
        let worksites = []
        for (const key in responseData) {
            const worksite ={
                id: key,
                name: responseData[key].name,
                address: responseData[key].address,
                type: responseData[key].type,
                clientId: responseData[key].clientId,
            }
            if(worksite.clientId === id){
                worksites.unshift(worksite);
            }
        }
        context.commit('loadClientWorksites',worksites);
    },
    async deleteClientWorksites(context){
        const clientWorksites = context.rootGetters.clientWorksites;

        for (const clientWorksite of clientWorksites) {
            const id = clientWorksite.id;
            const response = await fetch(
                `https://cleanertrackpro-default-rtdb.firebaseio.com/worksites/${id}.json`,
                {
                    method: 'DELETE'
                }
            )
            if (!response.ok) {
                const error = new Error(response.message || 'Failed.Try Later');
                throw error;
            }
        }
    },
}