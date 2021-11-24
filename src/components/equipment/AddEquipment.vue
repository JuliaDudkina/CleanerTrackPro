<template>
  <equipment-form @action="submitData">
    <template v-slot:title>
      <h2>Add a new piece of equipment</h2>
    </template>
    <template v-slot:button>
      <link-button>Submit</link-button>
    </template>
  </equipment-form>
</template>

<script>
import EquipmentForm from "./EquipmentForm";
export default {
  name: "AddEquipment",
  components:{
    EquipmentForm
  },
  methods:{
    async submitData(data){
      const newEquipment = data;
      await this.$store.dispatch('addEquipment',newEquipment);
      await this.$store.dispatch('loadEquipment');
      await this.$router.replace("/equipment");
    }
  }
}
</script>

<style scoped>
</style>