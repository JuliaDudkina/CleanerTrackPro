<template>
  <wrapper>
    <form @submit.prevent="action">
      <slot name="title"></slot>
      <div class="form-control" :class="{invalid: !name.isValid}">
        <label for="name">Name</label>
        <input type="text" id="name" v-model.trim="name.val" @blur="clearValidity('name')">
      </div>
      <p v-if="!name.isValid">Name cannot be empty!</p>
      <div class="form-control" :class="{invalid: !address.isValid}">
        <label>Address</label>
        <input type="text" id="city" v-model.trim="address.val" @blur="clearValidity('address')">
      </div>
      <p v-if="!address.isValid">Address cannot be empty!</p>
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
      <div class="form-control flex" :class="{invalid: !type.isValid}">
        <label>Client's Type:</label>
        <select v-model="type.val" @blur="clearValidity('type')">
          <option value="corporate">a company</option>
          <option value="individual">an individual</option>
        </select>
      </div>
      <p v-if="!type.isValid">Please select client's type!</p>
      <div class="form-control flex">
        <label>Status:</label>
        <select v-model="status">
          <option>Active</option>
          <option>Inactive</option>
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
  props: ['oldName','oldAddress','oldPhone','oldContactPerson','oldType', 'oldStatus'],
  data(){
    return{
      name: {
        val: this.oldName || '',
        isValid: true
      },
      address: {
        val: this.oldAddress || '',
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
      type:{
        val: this.oldType || '',
        isValid: true
      },
      status: this.oldStatus || '',
      formIsValid: true,
    }
  },
  computed:{
    booleanStatus(){
      if (this.status === 'Active'){
        return true;
      }
      return false;
    }
  },
  methods:{
    clearValidity(input){
      this[input].isValid = true;
    },
    validateForm(){
      this.formIsValid = true;
      if (this.name.val === ''){
        this.name.isValid = false;
        this.formIsValid = false;
      }
      if (this.address.val === ''){
        this.address.isValid = false;
        this.formIsValid = false;
      }
      if (this.contactPerson.val === ''){
        this.contactPerson.isValid = false;
        this.formIsValid = false;
      }
      if (this.type.val === ''){
        this.type.isValid = false;
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
        name: this.name.val,
        address: this.address.val,
        phone: this.phone.val,
        contactPerson: this.contactPerson.val,
        type: this.type.val,
        status: this.booleanStatus
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
.flex label{
  margin-right: 10px;
}


/* <select> styles */
select {
  /* Reset */
  appearance: none;
  outline: 0;
  font: inherit;
  /* Personalize */
  width: 10em;
  height: 1.5em;
  padding: 0 0 0 0.5em;
  background: url(https://upload.wikimedia.org/wikipedia/commons/9/9d/Caret_down_font_awesome_whitevariation.svg) no-repeat right 0.8em center / 1.4em,
  linear-gradient(to left, rgba(85, 189, 138, 1) 3em, rgba(252, 250, 250, 0.2) 3em);
  color: black;
  cursor: pointer;
  border: 1px solid #ccc;
}
/* <option> colors */
option {
  color: inherit;
  background-color: #320a28;
}
/* Remove focus outline */
option:focus {
   outline: none;
}
/* Remove IE arrow */
option::-ms-expand {
   display: none;
}


</style>