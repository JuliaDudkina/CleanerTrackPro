<template>
  <div>
    <wrapper class="header">
      <h1>Equipment</h1>
      <link-button link to="/equipment/register">Add Equipment</link-button>
    </wrapper>
    <ul>
      <equipment-details
          v-for="item in equipment"
            :key="item.name"
            :id="item.id"
            :name="item.name"
            :fee="item.fee"
            :storage="item.storage"
            :status="item.status"
      >
      </equipment-details>
    </ul>
    <Dialog :show="successDeletion" title="Success!" @close="closeDialog">
      <h3>This equipment has been successfully deleted!</h3>
      <template v-slot:buttonText>Close</template>
    </Dialog>
  </div>
</template>

<script>
import Wrapper from "../UI/Wrapper";
import EquipmentDetails from "./EquipmentDetails";
import Dialog from "../UI/Dialog";
export default {
  name: "EquipmentList",
  components: {Wrapper, EquipmentDetails, Dialog},
  computed:{
    equipment(){
      return this.$store.getters.equipment;
    },
    successDeletion(){
      return this.$store.getters.successDeletion;
    }
  },
  methods:{
    closeDialog(){
      this.$store.dispatch('setSuccessDeletion');
    },
    async loadEquipment(){
      try {
        await this.$store.dispatch('loadEquipment');
      } catch (error) {
        this.error = error.message || 'Something went wrong!';
      }
    }
  },
  created() {
    this.loadEquipment();
  }
}
</script>

<style scoped>
.header{
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: none;
}
ul{
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>