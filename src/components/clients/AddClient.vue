<template>
  <client-form @action="submitData">
    <template v-slot:title>
      <h2>Register a new client</h2>
    </template>
    <template v-slot:button>
      <link-button>Submit</link-button>
    </template>
  </client-form>
</template>

<script>
import ClientForm from "./ClientForm";
export default {
  name: "AddClient",
  components: {ClientForm},
  methods:{
    submitData(data){
      const newClient = data;
      this.$store.dispatch('addClient', newClient);
      this.$store.dispatch('loadClients');
      this.$router.replace("/clients");
    }
  }
}
</script>
