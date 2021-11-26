<template>
  <div>
    <Dialog @close="closeDialog" :show="success" title="Success!">
      <h3>A new client has been successfully created!</h3>
      <template v-slot:actions>
        <link-button @click="clear">Create another client</link-button>
      </template>
      <template v-slot:buttonText>Go to Clients' List</template>
    </Dialog>
    <client-form @action="submitData">
      <template v-slot:title>
        <h2>Register a new client</h2>
      </template>
      <template v-slot:button>
        <link-button>Submit</link-button>
      </template>
    </client-form>
  </div>
</template>

<script>
import ClientForm from "./ClientForm";
import Dialog from "../UI/Dialog";
export default {
  name: "AddClient",
  components: {ClientForm, Dialog},
  data(){
    return{
      success: false
    }
  },
  methods:{
    submitData(data){
      this.success = true;
      const newClient = data;
      this.$store.dispatch('addClient', newClient);
      this.$store.dispatch('loadClients');
    },
    closeDialog(){
      this.$router.replace("/clients");
    },
    clear(){
      this.success = false;
      this.$router.go();
    }
  }
}
</script>
