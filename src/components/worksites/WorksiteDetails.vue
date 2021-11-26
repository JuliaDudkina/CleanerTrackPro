<template>
  <div>
    <li>
      <wrapper class="flex">
        <div>
          <h3>Name: {{ name }}</h3>
          <h3>Address: {{ address }}</h3>
          <h3>Type of place: {{ type }}</h3>
        </div>
        <div>
          <link-button @click="updateWorksite">Update</link-button>
          <link-button @click="confirm">Delete</link-button>
        </div>
      </wrapper>
    </li>
    <Dialog @close="deleteWorksite" :show="isConfirm" title="Are you sure you want to delete this worksite?">
      <h3>This worksite will be deleted immediately. You cannot undo this action.</h3>
      <template v-slot:actions>
        <link-button @click="closeConfirmation">Cancel</link-button>
      </template>
      <template v-slot:buttonText>Delete</template>
    </Dialog>
  </div>
</template>

<script>
import Wrapper from "../UI/Wrapper";
import Dialog from "../UI/Dialog";
export default {
  name: "WorksiteDetails",
  components: {Wrapper, Dialog},
  props: ['id','name', 'address', 'type'],
  data(){
    return{
      isConfirm: false,
    }
  },
  methods:{
    updateWorksite(){
      const oldData = {
        id: this.id,
        name: this.name,
        address: this.address,
        type: this.type,
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
    deleteWorksite(){
      const worksiteId = this.id;
      this.$store.dispatch('deleteWorksite',worksiteId);
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