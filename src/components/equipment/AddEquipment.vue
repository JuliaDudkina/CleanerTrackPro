<template>
  <div>
    <Dialog @close="closeDialog" :show="success" title="Success!">
      <h3>A new piece of equipment has been successfully created!</h3>
      <template v-slot:actions>
        <link-button @click="clear">Create another piece of equipment</link-button>
      </template>
      <template v-slot:buttonText>Go to Equipment's List</template>
    </Dialog>
    <equipment-form @action="submitData">
      <template v-slot:title>
        <h2>Add a new piece of equipment</h2>
      </template>
      <template v-slot:button>
        <link-button>Submit</link-button>
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
  methods:{
    submitData(data){
      this.success = true;
      const newEquipment = {...data};
      this.$store.dispatch('addEquipment',newEquipment);
    },
    closeDialog(){
      this.$router.replace("/equipment");
    },
    clear(){
      this.success = false;
      this.$router.go();
    }
  },
}
</script>

<style scoped>
</style>