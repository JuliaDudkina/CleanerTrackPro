<template>
  <wrapper>
    <form @submit.prevent="action">
      <slot name="title"></slot>
      <div class="form-control" :class="{invalid: !fullName.isValid}">
        <label for="name">Full Name</label>
        <input type="text" id="name" v-model.trim="fullName.val" @blur="clearValidity('fullName')">
      </div>
      <p v-if="!fullName.isValid">Name cannot be empty!</p>
      <div class="form-control">
        <label :class="{invalid: !address.isValid}">Address</label>
        <div class="flex" :class="{invalid: !address.isValid}">
          <div>
            <label for="city">City</label>
            <input type="text" id="city" v-model.trim="address.val.city" @blur="clearValidity('address')">
          </div>
          <div>
            <label for="street">Street</label>
            <input type="text" id="street" v-model.trim="address.val.street" @blur="clearValidity('address')">
          </div>
        </div>
        <div class="flex" :class="{invalid: !address.isValid}">
          <div>
            <label for="house">House</label>
            <input type="number" id="house" v-model.number="address.val.house" @blur="clearValidity('address')">
          </div>
          <div>
            <label for="flat">Flat</label>
            <input type="number" id="flat" v-model.number="address.val.flat" @blur="clearValidity('address')">
          </div>
          <div>
            <label for="index">Index</label>
            <input type="number" id="index" v-model.number="address.val.index" @blur="clearValidity('address')">
          </div>
        </div>
        <p v-if="!address.isValid">All address fields should be completed!</p>
      </div>
      <div class="form-control" :class="{invalid: !phone.isValid}">
        <label for="phone">Contact Phone</label>
        <input type="tel" id="phone" v-model.number="phone.val" @blur="clearValidity('phone')">
      </div>
      <p v-if="!phone.isValid">Contact Phone cannot be empty!</p>
      <div class="form-control" :class="{invalid: !contactPerson.isValid}">
        <label for="person">Contact Person</label>
        <input type="text" id="person" v-model.trim="contactPerson.val" @blur="clearValidity('contactPerson')">
      </div>
      <p v-if="!contactPerson.isValid">Contact Person cannot be empty!</p>
      <div class="flex" :class="{invalid: !status.isValid}">
        <label>Client's status:</label>
        <select v-model="status.val" @blur="clearValidity('status')">
          <option value="corporate">a company</option>
          <option value="individual">an individual</option>
        </select>
      </div>
      <p v-if="!status.isValid">Please select client's status!</p>
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
      },
      formIsValid: true,
    }
  },
  methods:{
    clearValidity(input){
      this[input].isValid = true;
    },
    validateForm(){
      this.formIsValid = true;
      if (this.fullName.val === ''){
        this.fullName.isValid = false;
        this.formIsValid = false;
      }
      if (this.address.val.city === '' ||
          this.address.val.street === '' ||
          !this.address.val.flat ||
          !this.address.val.house ||
          !this.address.val.index
      ){
        this.address.isValid = false;
        this.formIsValid = false;
      }
      if (this.contactPerson.val === ''){
        this.contactPerson.isValid = false;
        this.formIsValid = false;
      }
      if (this.status.val === ''){
        this.status.isValid = false;
        this.formIsValid = false;
      }
      if (!this.phone.val){
        this.phone.isValid = false;
        this.formIsValid = false;
      }
    },
    action(){
      this.validateForm();
      if (!this.formIsValid){
        return;
      }
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

.invalid, .invalid label, p {
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