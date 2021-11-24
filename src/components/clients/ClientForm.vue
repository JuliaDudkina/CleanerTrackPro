<template>
  <wrapper>
    <form @submit.prevent="action">
      <slot name="title"></slot>
      <div class="form-control">
        <label for="name">Full Name</label>
        <input type="text" id="name" required v-model.trim="fullName.val">
      </div>
      <div class="form-control">
        <label>Address</label>
        <div class="flex">
          <div>
            <label for="city">City</label>
            <input type="text" id="city" required v-model.trim="address.val.city">
          </div>
          <div>
            <label for="street">Street</label>
            <input type="text" id="street" required v-model.trim="address.val.street">
          </div>
        </div>
        <div class="flex">
          <div>
            <label for="house">House</label>
            <input type="number" id="house" required v-model.number="address.val.house">
          </div>
          <div>
            <label for="flat">Flat</label>
            <input type="number" id="flat" v-model.number="address.val.flat">
          </div>
          <div>
            <label for="index">Index</label>
            <input type="number" id="index" v-model.number="address.val.index">
          </div>
        </div>
      </div>
      <div class="form-control">
        <label for="phone">Contact Phone</label>
        <input type="tel" id="phone" v-model.number="phone.val">
      </div>
      <div class="form-control">
        <label for="person">Contact Person</label>
        <input type="text" id="person" v-model.trim="contactPerson.val">
      </div>
      <div class="flex">
        <label>You are:</label>
        <select v-model="status.val">
          <option value="corporate">a company</option>
          <option value="individual">an individual</option>
        </select>
      </div>
      <slot name="button"></slot>
    </form>
  </wrapper>
</template>

<script>
import Wrapper from "../UI/Wrapper";
export default {
  name: "AddClient",
  components: {Wrapper},
  props: ['oldFullName','oldCity','oldStreet','oldHouse','oldFlat','oldIndex','oldPhone','oldContactPerson','oldStatus'],
  data(){
    return{
      fullName: {
        val: this.oldFullName || '',
        isValid: true
      },
      address: {
        val: {
          city: this.oldCity || '',
          street: this.oldStreet || '',
          house: this.oldHouse || null,
          flat: this.oldFlat || null,
          index: this.oldIndex || null,
        },
        isValid: true
      },
      phone:{
        val: this.oldPhone || null,
        isValid: true
      },
      contactPerson:{
        val: this.oldContactPerson || '',
        isValid: true
      },
      status:{
        val: this.oldStatus || '',
        isValid: true
      }

    }
  },
  methods:{
    action(){
      const newClient = {
        name: this.fullName.val,
        address: this.address.val,
        phone: this.phone.val,
        contactPerson: this.contactPerson.val,
        status: this.status.val
      }
      this.$emit('action',newClient)
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