<template>
  <div>
    <li>
      <wrapper class="flex">
        <div>
          <p>Name: {{ name }}</p>
          <p>Address: {{ address }}</p>
          <p>Type of place: {{ type }}</p>
          <p>Status: {{ stringStatus }}</p>
        </div>
        <div>
          <link-button @click="updateWorksite">Update</link-button>
          <link-button @click="confirm">Delete</link-button>
        </div>
      </wrapper>
    </li>
    <Dialog @close="closeConfirmation" :show="isConfirm" title="Are you sure you want to delete this worksite?">
      <h3 v-if="!status">This worksite will be deleted immediately. You cannot undo this action.</h3>
      <h3 v-if="status">This worksite is active and cannot be deleted.</h3>
      <template v-slot:buttonText>Cancel</template>
      <template v-slot:actions>
        <link-button v-if="!status" @click="deleteWorksite">Delete anyway</link-button>
        <link-button v-if="status" @click="deactivate">Deactivate</link-button>
      </template>
    </Dialog>
    <Dialog :show="successDeactivation" title="Success!" @close="closeDialog">
      <h3>This worksite has been successfully deactivated!</h3>
      <template v-slot:buttonText>Close</template>
    </Dialog>
  </div>
</template>

<script>
import Wrapper from "../UI/Wrapper";
import Dialog from "../UI/Dialog";
export default {
  name: "WorksiteDetails",
  components: {Wrapper, Dialog},
  props: ['id','name', 'address', 'type', 'status'],
  data(){
    return{
      isConfirm: false,
      successDeactivation: false
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
    updateWorksite(){
      const oldData = {
        id: this.id,
        name: this.name,
        address: this.address,
        type: this.type,
        status: this.stringStatus
      }
      this.$store.dispatch('setOldData', oldData);
      const url = this.$route.path.substring(0, this.$route.path.length - 1) + '/' + this.id + '/update';
      this.$router.replace(url);
    },
    confirm(){
      this.isConfirm = true;
    },
    closeConfirmation(){
      this.isConfirm = false;
    },
    deactivate(){
      const worksiteId = this.id;
      this.$store.dispatch('deactivateClientWorksite', worksiteId);
      this.isConfirm = false;
      this.successDeactivation = true;
    },
    closeDialog(){
      this.successDeactivation = false;
    },
    deleteWorksite(){
      const worksiteId = this.id;
      this.$store.dispatch('deleteWorksite',worksiteId);
      this.isConfirm = false;
      this.$store.dispatch('setSuccessDeletion');
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