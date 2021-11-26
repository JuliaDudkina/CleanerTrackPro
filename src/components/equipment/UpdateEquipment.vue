<template>
  <div>
    <Dialog @close="closeDialog" :show="success" title="Success!">
      <h3>This equipment has been successfully updated!</h3>
      <template v-slot:buttonText>Go to Equipment's List</template>
    </Dialog>
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
  </div>
</template>

<script>
import EquipmentForm from "./EquipmentForm";
import Dialog from "../UI/Dialog";
export default {
  name: "AddEquipment",
  components:{
    EquipmentForm, Dialog
  },
  data(){
    return{
      success: false
    }
  },
  computed:{
    item(){
      return this.$store.getters.item;
    }
  },
  methods:{
    async update(data){
      this.success = true;
      const updatedItem = {
        name: data.name,
        fee: data.fee,
        storage: data.storage,
      }
      await this.$store.dispatch('updateItem',updatedItem);
      await this.$store.dispatch('loadEquipment');
    },
    closeDialog(){
      this.$router.replace("/equipment");
    }
  }
}
</script>
