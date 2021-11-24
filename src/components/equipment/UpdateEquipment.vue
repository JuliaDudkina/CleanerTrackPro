<template>
  <equipment-form @action="update"
    :old-fee="item.fee"
    :old-name="item.name"
    :old-storage="item.storage"
  >
    <template v-slot:title>
      <h2>Update this piece of equipment</h2>
    </template>
    <template v-slot:button>
      <link-button>Update</link-button>
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
  computed:{
    item(){
      return this.$store.getters.item;
    }
  },
  methods:{
    async update(data){
      const updatedItem = {
        name: data.name,
        fee: data.fee,
        storage: data.storage,
      }
      await this.$store.dispatch('updateItem',updatedItem);
      await this.$store.dispatch('loadEquipment');
      await this.$router.replace("/equipment");
    }
  }
}
</script>
