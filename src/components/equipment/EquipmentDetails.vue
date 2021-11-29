<template>
  <div>
    <li >
      <wrapper class="flex">
        <div>
          <p>Name: {{name}}</p>
          <p>Fee: ${{ fee }}</p>
          <p>Storage Location: {{ storage }}</p>
          <p>Status: {{ status }}</p>
        </div>
        <div>
          <link-button @click="updateItem">Update</link-button>
          <link-button @click="confirm">Delete</link-button>
        </div>
      </wrapper>
    </li>
    <Dialog @close="deleteItem" :show="isConfirm" title="Are you sure you want to delete this item?">
      <h3>This item will be deleted immediately. You cannot undo this action.</h3>
      <template v-slot:actions>
        <link-button @click="closeConfirmation">Cancel</link-button>
      </template>
      <template v-slot:buttonText>Delete</template>
    </Dialog>
  </div>
</template>

<script>
import Dialog from "../UI/Dialog";
export default {
  name: "EquipmentDetails",
  props:['id','name','fee', 'storage', 'status'],
  components:{Dialog},
  data(){
    return{
      isConfirm: false,
    }
  },
  methods:{
    confirm(){
      this.isConfirm = true;
    },
    closeConfirmation(){
      this.isConfirm = false;
    },
    deleteItem(){
      const itemId = this.id;
      this.$store.dispatch('deleteEquipment', itemId)
    },
    updateItem(){
      const item = {
        id: this.id,
        name: this.name,
        fee: this.fee,
        storage: this.storage,
        status: this.status
      }
      this.$store.dispatch('setItem', item);
      this.$router.replace('/equipment/update');
    }
  }
}
</script>

<style scoped>
.flex{
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}
</style>