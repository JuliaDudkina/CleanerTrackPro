<template>
  <div>
    <wrapper class="header">
      <h1>Clients</h1>
      <link-button link to="/clients/register">Add New Client</link-button>
    </wrapper>
    <router-view>
      <client-details
          v-for="client in clients"
          :key="client.id"
          :id="client.id"
          :name="client.name"
          :address="client.address"
          :phone="client.phone"
          :contact-person="client.contactPerson"
          :type="client.type"
          :status="client.status"
      ></client-details>
    </router-view>
  </div>
</template>

<script>
import ClientDetails from "./ClientDetails";
import Wrapper from "../UI/Wrapper";
export default {
  name: "ClientsList",
  components:{
    Wrapper,
    ClientDetails,
  },
  computed:{
    clients(){
      return this.$store.getters['clients'];
    }
  },
  methods:{
    async loadClients() {
      try {
        await this.$store.dispatch('loadClients');
      } catch (error) {
        this.error = error.message || 'Something went wrong!';
      }
    },
  },
  created() {
    this.loadClients();
  },
}
</script>

<style scoped>
.header{
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: none;
}
</style>