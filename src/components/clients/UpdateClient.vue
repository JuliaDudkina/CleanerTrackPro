<template>
  <wrapper>
    <form @submit.prevent="update">
      <h2>Update a client</h2>
      <div class="form-control">
        <label for="name">Full Name</label>
        <input type="text" id="name" required v-model.trim="fullName.val"  :placeholder="client.name">
      </div>
      <div class="form-control">
        <label>Address</label>
        <div class="flex">
          <div>
            <label for="city">City</label>
            <input type="text" id="city" required v-model.trim="address.val.city" :placeholder="client.address.city" >
          </div>
          <div>
            <label for="street">Street</label>
            <input type="text" id="street" required v-model.trim="address.val.street" :placeholder="client.address.street" >
          </div>
        </div>
        <div class="flex">
          <div>
            <label for="house">House</label>
            <input type="number" id="house" required v-model.number="address.val.house" :placeholder="client.address.house">
          </div>
          <div>
            <label for="flat">Flat</label>
            <input type="number" id="flat" v-model.number="address.val.flat" :placeholder="client.address.flat">
          </div>
          <div>
            <label for="index">Index</label>
            <input type="number" id="index" v-model.number="address.val.index" :placeholder="client.address.index">
          </div>
        </div>
      </div>
      <div class="form-control">
        <label for="phone">Contact Phone</label>
        <input type="tel" id="phone" :placeholder="client.phone" v-model.number="phone.val">
      </div>
      <div class="form-control">
        <label for="person">Contact Person</label>
        <input type="text" id="person" :placeholder="client.contactPerson" v-model.trim="contactPerson.val">
      </div>
      <div class="flex">
        <label>You are:</label>
        <select v-model="status.val" :placeholder="client.status">
          <option value="corporate">a company</option>
          <option value="individual">an individual</option>
        </select>
      </div>
      <link-button>Update</link-button>
    </form>
  </wrapper>

</template>

<script>

export default {
  name: "UpdateClient",
  data(){
    return{
      fullName: {
        val: '',
        isValid: true
      },
      address: {
        val: {
          city: '',
          street: '',
          house: null,
          flat: null,
          index: null,
        },
        isValid: true
      },
      phone:{
        val: null,
        isValid: true
      },
      contactPerson:{
        val: '',
        isValid: true
      },
      status:{
        val: '',
        isValid: true
      }

    }
  },
  computed:{
    client(){
      return this.$store.getters.client;
    },
  },
  methods:{
    async update(){
      const updatedClient = {
        name: this.fullName.val,
        address: this.address.val,
        phone: this.phone.val,
        contactPerson: this.contactPerson.val,
        status: this.status.val,
      };
      this.$store.dispatch('updateClient', updatedClient);
       await this.$store.dispatch('loadClients');
      this.$router.replace('/clients');
    }
  }
}
</script>

<style scoped>

.form-control {
  margin: 0.5rem 0;
}

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
.flex{
  display: flex;
  align-items: baseline;
}
</style>