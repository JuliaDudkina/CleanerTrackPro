export default {
    addEquipment(state, payload) {
        state.equipment.unshift(payload);
    },
    setEquipment(state,payload){
        state.equipment = payload;
    },
    deleteEquipment(state, payload) {
        const resIndex = state.equipment.findIndex( item => item.id === payload);
        state.equipment.splice(resIndex,1);
    },
    setItem(state, payload){
        state.item = payload;
    },
    setItemNames(state,payload){
        state.itemNames = payload;
    },
    deactivateItem(state, payload){
        const itemId = payload;
        const chosen = state.equipment.find(item => item.id === itemId);
        chosen.status = false;
    }
}