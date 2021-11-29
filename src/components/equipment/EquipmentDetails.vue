<template>
    <li>
      <wrapper class="flex" :class="{scrollToMe: changed}">
        <div>
          <p>Name: {{name}}</p>
          <p>Fee: ${{ fee }}</p>
          <p>Storage Location: {{ storage }}</p>
          <p>Status: {{ stringStatus }}</p>
        </div>
        <div>
          <link-button @click="updateItem">Update</link-button>
          <link-button @click="confirm">Delete</link-button>
        </div>
      </wrapper>
      <Dialog @close="closeConfirmation" :show="isConfirm" title="Are you sure you want to delete this item?">
        <h3 v-if="!status">This item will be deleted immediately. You cannot undo this action.</h3>
        <h3 v-if="status">This item is active and cannot be deleted.</h3>
        <template v-slot:actions>
          <link-button v-if="!status" @click="deleteItem">Delete anyway</link-button>
          <link-button v-if="status" @click="deactivate">Deactivate</link-button>
        </template>
        <template v-slot:buttonText>Cancel</template>
      </Dialog>
      <Dialog :show="successDeactivation" title="Success!" @close="closeDialog">
        <h3>This item has been successfully deactivated!</h3>
        <template v-slot:buttonText>Close</template>
      </Dialog>
    </li>
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
      successDeactivation: false,
      changed: false
    }
  },
  computed:{
    stringStatus(){
      if (this.status) {
        return 'Active'
      }
      return 'Inactive';
    },
  },
  methods:{
    confirm(){
      this.isConfirm = true;
    },
    closeConfirmation(){
      this.isConfirm = false;
    },
    deactivate(){
      const itemId = this.id;
      this.$store.dispatch('deactivateItem', itemId);
      this.isConfirm = false;
      this.successDeactivation = true;
    },
    closeDialog(){
      this.successDeactivation = false;
    },
    deleteItem(){
      const itemId = this.id;
      this.$store.dispatch('deleteEquipment', itemId);
      this.isConfirm = false;
      this.$store.dispatch('setSuccessDeletion');
    },
    updateItem(){
      const item = {
        id: this.id,
        name: this.name,
        fee: this.fee,
        storage: this.storage,
        status: this.stringStatus
      }
      this.$store.dispatch('setItem', item);
      this.$router.replace('/equipment/update');
    },
    scrollToElement() {
      const el = document.querySelector('.scrollToMe');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  },
  watch:{
    name(){
      this.changed = true;
    },
    fee(){
      this.changed = true;
    },
    storage(){
      this.changed = true;
    },
    stringStatus(){
      this.changed = true;
    }
  },
  updated() {
    this.scrollToElement();
  }
}
</script>

<style scoped>
.flex{
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}
@keyframes highlight {
  from {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  }
  50% {
    box-shadow: 0 2px 40px rgba(0, 0, 0, 0.4);
  }
  to {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  }
}
.scrollToMe{
  animation-duration: 3s;
  animation-name: highlight;
}
</style>