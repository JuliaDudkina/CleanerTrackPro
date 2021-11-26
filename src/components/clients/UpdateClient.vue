<template>
  <Dialog @close="closeDialog" :show="success" title="Success!">
    <h3>The client has been successfully updated!</h3>
    <template v-slot:buttonText>Go to Clients' List</template>
  </Dialog>
  <client-form @action="update"
               :old-name="oldClient.name"
               :old-address="oldClient.address"
               :old-phone="oldClient.phone"
               :old-contact-person="oldClient.contactPerson"
               :old-type="oldClient.type"
  >
    <template v-slot:title>
      <h2>Update the client</h2>
    </template>
    <template v-slot:button>
      <link-button>Update</link-button>
    </template>
  </client-form>
</template>

<script>
import ClientForm from "./ClientForm";
import Dialog from "../UI/Dialog";
export default {
  name: "UpdateClient",
  components: {
    ClientForm,
    Dialog
  },
  data(){
    return{
      success: false
    }
  },
  computed:{
    oldClient(){
      return this.$store.getters.client;
    },
  },
  methods:{
    update(data){
      this.success = true;
      const updatedClient = {
        name: data.name,
        address: data.address,
        phone: data.phone,
        contactPerson: data.contactPerson,
        type: data.type,
      };
      this.$store.dispatch('updateClient', updatedClient);
    },
    closeDialog(){
      this.$router.replace("/clients");
    }
  }
}
</script>

<style scoped>

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input[type='checkbox'] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}

input{
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
}

input:focus{
  background-color: #e6fdfb;
  outline: none;
  border-color: #0d520d;
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.invalid label {
  color: red;
}

.invalid input{
  border: 1px solid red;
}
</style>