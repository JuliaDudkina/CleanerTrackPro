export default {
    async addClient(context,data){
        const clientData = {
            name: data.name,
            address: data.address,
            phone: data.phone,
            contactPerson: data.contactPerson,
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
                status: responseData[key].status,
            };
            clients.push(client);
        }
        context.commit('setClients',clients);
    },
    async deleteClient(context,data){
        const clientId = data;

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
    },
};