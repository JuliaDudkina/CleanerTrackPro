<template>
  <wrapper>
    <div>
      <h1>{{ name }}</h1>
      <div>
        <p>Contact phone: <a :href="'tel:' + phone">{{ phone }}</a></p>
        <p>Contact person: {{ contactPerson }}</p>
        <p>Type: {{ type }}</p>
        <div class="address">
          <p>Primary office address: </p>
          <address> {{ address }}</address>
        </div>
      </div>
    </div>
    <div>
      <link-button @click="updateClient">Update</link-button>
      <link-button @click="deleteClient">Delete</link-button>
      <link-button @click="loadWorksites">Worksites</link-button>
    </div>
  </wrapper>
</template>

<script>
import Wrapper from "../UI/Wrapper";
export default {
  name: "ClientDetails",
  components: {Wrapper},
  props: ['id','name','address', 'phone', 'contactPerson', 'type'],
  methods:{
    deleteClient(){
      const clientId = this.id;
      this.$store.dispatch('deleteClient', clientId);
    },
    updateClient(){
      const client = {
        id: this.id,
        name: this.name,
        address: this.address,
        phone: this.phone,
        contactPerson: this.contactPerson,
        type: this.type,
      }
      this.$store.dispatch('setClient', client);
      this.$router.replace('/clients/update');
    },
    async loadWorksites(){
      const clientId = this.id;
      try {
        await this.$store.dispatch('loadClientWorksites', clientId);
        this.$router.replace('/clients/worksites');
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