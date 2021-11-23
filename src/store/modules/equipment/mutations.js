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
    }
}