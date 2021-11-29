export default {
    async addClient(context,data){
        const clientData = {
            name: data.name,
            address: data.address,
            phone: data.phone,
            contactPerson: data.contactPerson,
            type: data.type,
            status: data.status
        }
        const response = await fetch(
            'https://cleanertrackpro-default-rtdb.firebaseio.com/clients.json',
            {
                method: 'POST',
                body: JSON.stringify(clientData)
            }
        )
        if (!response.ok) {
            const error = new Error(response.message || 'Failed.Try Later');
            throw error;
        }

        context.commit('addClient', {
            ...clientData
        });
    },
    async updateClient(context, data){
        const clientId = context.rootGetters.client.id;
        const updatedClient = {
            name: data.name,
            address: data.address,
            phone: data.phone,
            contactPerson: data.contactPerson,
            type: data.type,
            status: data.status
        };
        const response = await fetch(
            `https://cleanertrackpro-default-rtdb.firebaseio.com/clients/${clientId}.json`,
            {
                method: 'PUT',
                body: JSON.stringify(updatedClient)
            }
        )
        if (!response.ok) {
            const error = new Error(response.message || 'Failed.Try Later');
            throw error;
        }
    },
    async loadClients(context){
        const response = await fetch(
            'https://cleanertrackpro-default-rtdb.firebaseio.com/clients.json',

        );
        const responseData = await response.json();

        if (!response.ok) {
            const error = new Error(responseData.message || 'Failed to fetch!');
            throw error;
        }
        const clients = [];

        for (const key in responseData) {
            const client = {
                id: key,
                name: responseData[key].name,
                address: responseData[key].address,
                phone: responseData[key].phone,
                contactPerson: responseData[key].contactPerson,
                type: responseData[key].type,
                status: responseData[key].status
            };
            clients.unshift(client);
        }
        context.commit('setClients',clients);
    },
    async deleteClient(context,data){
        const clientId = data;
        await context.dispatch('setClient', {id: clientId});
        await context.dispatch('loadClientWorksites');
        const response = await fetch(
            `https://cleanertrackpro-default-rtdb.firebaseio.com/clients/${clientId}.json`,
            {
                method: 'DELETE'
            }
        )
        if (!response.ok) {
            const error = new Error(response.message || 'Failed.Try Later');
            throw error;
        }
        context.commit('deleteClient', clientId);
        context.dispatch('deleteClientWorksites');
    },
    setClient(context,data) {
        const client = data;
        context.commit('setClient', client)
    },
    async deactivateClient(context,data){
        const clientId = data;
        await context.dispatch('setClient', {id: clientId});
        await context.dispatch('loadClientWorksites');
        const response = await fetch(
            `https://cleanertrackpro-default-rtdb.firebaseio.com/clients/${clientId}/status.json`,
            {
                method: 'PUT',
                body: JSON.stringify(false)
            }
        )
        if (!response.ok) {
            const error = new Error(response.message || 'Failed.Try Later');
            throw error;
        }

        context.commit('deactivateClient', clientId);
        context.dispatch('deactivateClientWorksites');
    }
};