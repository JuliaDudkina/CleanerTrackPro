<template>
  <div>
    <wrapper>
      <div>
        <h1>{{ name }}</h1>
        <p>Contact phone: <a :href="'tel:' + phone">{{ phone }}</a></p>
        <p>Contact person: {{ contactPerson }}</p>
        <p>Type: {{ type }}</p>
        <div class="address">
          <p>Primary office address: </p>
          <address> {{ address }}</address>
        </div>
        <p>Status: {{ stringStatus }}</p>
      </div>
      <div>
        <link-button @click="updateClient">Update</link-button>
        <link-button @click="confirm">Delete</link-button>
        <link-button @click="loadWorksites">Worksites</link-button>
      </div>
    </wrapper>
    <Dialog @close="closeConfirmation" :show="isConfirm" title="Are you sure you want to delete this client?">
      <h3>This client will be deleted immediately along with their worksites.<br>
        You cannot undo this action.<br>
        <p v-if="status">If you want to save data, select deactivation instead.</p>
      </h3>
      <template v-slot:buttonText>Cancel</template>
      <template v-slot:actions>
        <link-button @click="deleteClient">Delete</link-button>
        <link-button v-if="status" @click="deactivate">Deactivate</link-button>
      </template>
    </Dialog>
    <Dialog :show="successDeactivation" title="Success!" @close="closeDialog">
      <h3>This client has been successfully deactivated!</h3>
      <template v-slot:buttonText>Close</template>
    </Dialog>
  </div>
</template>

<script>
import Wrapper from "../UI/Wrapper";
import Dialog from "../UI/Dialog";
export default {
  name: "ClientDetails",
  components: {Wrapper,Dialog},
  props: ['id','name','address', 'phone', 'contactPerson', 'type', 'status'],
  data(){
    return{
      isConfirm: false,
      successDeactivation: false,
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
      const clientId = this.id;
      this.$store.dispatch('deactivateClient', clientId);
      this.isConfirm = false;
      this.successDeactivation = true;
    },
    deleteClient(){
      const clientId = this.id;
      this.$store.dispatch('deleteClient', clientId);
      this.isConfirm = false;
      this.$store.dispatch('setSuccessDeletion');
    },
    closeDialog(){
      this.successDeactivation = false;
    },
    updateClient(){
      const client = {
        id: this.id,
        name: this.name,
        address: this.address,
        phone: this.phone,
        contactPerson: this.contactPerson,
        type: this.type,
        status: this.stringStatus
      }
      this.$store.dispatch('setClient', client);
      const url = '/client/' + this.id + '/update';
      this.$router.replace(url);
    },
    async loadWorksites(){
      const client = {
        id: this.id,
      }
      this.$store.dispatch('setClient', client);
      try {
        await this.$store.dispatch('loadClientWorksites');
        const url = '/client/' + this.id + '/worksites';
        this.$router.replace(url);
      } catch (error) {
        this.error = error.message || 'Something went wrong!';
      }
    }
  }
}
</script>

<style scoped>
.address{
  display: flex;
  margin-bottom: 15px;
}
.address p{
  margin: 0 5px 0 0;
}
</style>