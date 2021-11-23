export default {
    async loadEquipment(context){

        const response = await fetch('https://cleanertrackpro-default-rtdb.firebaseio.com/equipment.json');
        const responseData = await response.json();

        if (!response.ok) {
            const error = new Error(response.message || 'Failed.Try Later');
            throw error;
        }

        let equipment = [];

        for (const key in responseData) {
            const item = {
                id: key,
                name: responseData[key].name,
                fee: responseData[key].fee,
                storage: responseData[key].storage,
            }
            equipment.unshift(item);
        }

        context.commit('setEquipment', equipment)
    },
    async addEquipment(context,data){
        const newEquipment = {
            name: data.name,
            fee: data.fee,
            storage: data.storage,
        }
        const response = await fetch('https://cleanertrackpro-default-rtdb.firebaseio.com/equipment.json',
            {
                method: "POST",
                body: JSON.stringify(newEquipment)
            }
        );

        if (!response.ok) {
            const error = new Error(response.message || 'Failed.Try Later');
            throw error;
        }

        context.commit('addEquipment', {
            ...newEquipment
        });
    },
    async deleteEquipment(context, data){
        const itemId = data;

        const response = await fetch(`https://cleanertrackpro-default-rtdb.firebaseio.com/equipment/${itemId}.json`,
            {
                method: "DELETE"
            }
        );

        if (!response.ok) {
            const error = new Error(response.message || 'Failed.Try Later');
            throw error;
        }

        context.commit('deleteEquipment', itemId);
    },
    setItem(context,data) {
        const item = data;
        context.commit('setItem', item);
    },
    async updateItem(context, data){
        const itemId = context.rootGetters.item.id;
        const updatedItem = {
            name: data.name,
            fee: data.fee,
            storage: data.storage,
        };
        const response = await fetch(
            `https://cleanertrackpro-default-rtdb.firebaseio.com/equipment/${itemId}.json`,
            {
                method: 'PUT',
                body: JSON.stringify(updatedItem)
            }
        )
        if (!response.ok) {
            const error = new Error(response.message || 'Failed.Try Later');
            throw error;
        }
    },
    async loadItemNames(context){
        const response = await fetch(
            'https://cleanertrackpro-default-rtdb.firebaseio.com/equipment.json'
        );
        const responseData = await response.json();
        let itemNames = [];
        for (const key in responseData) {
            const itemName = responseData[key].name;
            itemNames.push(itemName);
        }
        context.commit('setItemNames', itemNames);
    },


}