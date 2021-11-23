<template>
  <wrapper>
    <div>
      <h1>{{ name }}</h1>
      <div class="flex">
        <div>
          <p>Contact phone: <a :href="'tel:' + phone">{{ phone }}</a></p>
          <p>Contact person: {{ contactPerson }}</p>
          <p>Status: {{ status }}</p>
        </div>
        <div class="flex">
          <p>Primary office address:</p>
          <address><p
              v-for="(item, name) in address"
              :key="name">
            {{ name}}: {{ item }}
          </p>
          </address>
        </div>
      </div>
    </div>
    <div class="actions">
      <link-button @click="updateClient">Update</link-button>
      <link-button @click="deleteClient">Delete</link-button>
    </div>
  </wrapper>
</template>

<script>
import Wrapper from "../UI/Wrapper";
export default {
  name: "ClientDetails",
  components: {Wrapper},
  props: ['id','name','address', 'phone', 'contactPerson', 'status'],
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
        status: this.status,
      }
      this.$store.dispatch('setClient', client);
      this.$router.replace('/clients/update');
    }
  }
}
</script>

<style scoped>
address{
  margin: 1em;
}
address p{
  text-transform: capitalize;
  margin: 0;
}
.flex{
  display: flex;
  justify-content: space-between;
}
.close{
  float: right;
}
.empty {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.75);
  z-index: 10;
}

dialog {
  position: fixed;
  top: 20vh;
  left: 35%;
  z-index: 100;
  border-radius: 12px;
  border: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 0;
  margin: 0;
  overflow: hidden;
  background-color: white;
}
</style>