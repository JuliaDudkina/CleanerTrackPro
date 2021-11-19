<template>
  <div>
    <link-button class="add-client" @click="showForm">{{ buttonText }}</link-button>
    <wrapper v-if="isVisible">
      <add-client></add-client>
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
          :status="client.status"
      ></client-details>
    </router-view>
  </div>
</template>

<script>
import ClientDetails from "./ClientDetails";
import AddClient from "./AddClient";
import Wrapper from "../UI/Wrapper";
export default {
  name: "ClientsList",
  components:{
    Wrapper,
    ClientDetails,
    AddClient
  },
  data(){
    return{
      isVisible: false
    }
  },
  computed:{
    buttonText(){
      if(!this.isVisible){
        return "Add New Client"
      } else{
        return "Hide Form"
      }
    },
    clients(){
      return this.$store.getters['clients'];
    }
  },
  methods:{
    showForm(){
        this.isVisible = !this.isVisible;
    },
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
div{
  padding: 50px;
  position: relative;
}
.add-client{
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>