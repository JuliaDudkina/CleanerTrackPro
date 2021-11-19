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
      <link-button>Update</link-button>
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
</style>