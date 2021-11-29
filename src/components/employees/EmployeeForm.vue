<template>
  <wrapper>
    <form @submit.prevent="action">
      <slot name="title"></slot>
      <div class="form-control" :class="{invalid: !fullName.isValid}">
        <label for="name">Full Name</label>
        <input type="text" id="name" v-model.trim="fullName.val" @blur="clearValidity('fullName')">
      </div>
      <p v-if="!fullName.isValid">Name cannot be empty!</p>
      <div class="form-control" :class="{invalid: !phone.isValid}">
        <label for="tel">Phone Number</label>
        <input type="tel" id="tel" v-model.number="phone.val" @blur="clearValidity('phone')">
      </div>
      <p v-if="!phone.isValid">Phone Number cannot be empty!</p>
      <div class="form-control" :class="{invalid: !address.isValid}">
        <label for="address">Address</label>
        <input type="text" id="address" v-model="address.val" @blur="clearValidity('address')">
      </div>
      <p v-if="!address.isValid">Address cannot be empty!</p>
      <div class="flex" >
        <div class="form-control" :class="{invalid: !birthDate.isValid}">
          <label for="date">Birth Date</label>
          <input type="date" id="date" v-model="birthDate.val" @blur="clearValidity('birthDate')">
        </div>
        <div class="form-control" :class="{invalid: !salary.isValid}">
          <label for="salary">Salary</label>
          <input type="number" id="salary" v-model="salary.val" @blur="clearValidity('salary')">
        </div>
      </div>
      <p v-if="!birthDate.isValid">Birth Date cannot be empty!</p>
      <p v-if="!salary.isValid">Salary cannot be empty, zero or less!</p>
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
  name: "AddEmployee",
  components: {Wrapper},
  props: ['oldFullName','oldPhone','oldBirthDate','oldSalary','oldAddress', 'oldStatus'],
  data(){
    return{
      fullName: {
        val: this.oldFullName || '',
        isValid: true,
      },
      phone: {
        val: this.oldPhone || null,
        isValid: true,
      },
      birthDate: {
        val: this.oldBirthDate || '',
        isValid: true,
      },
      salary: {
        val: this.oldSalary || null,
        isValid: true,
      },
      address: {
        val: this.oldAddress || '',
        isValid: true,
      },
      status: this.oldStatus || '',
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
      if (this.fullName.val === ''){
        this.fullName.isValid = false;
        this.formIsValid = false;
      }
      if (this.address.val === ''){
        this.address.isValid = false;
        this.formIsValid = false;
      }
      if (this.birthDate.val === ''){
        this.birthDate.isValid = false;
        this.formIsValid = false;
      }
      if (!this.salary.val || this.salary.val < 0){
        this.salary.isValid = false;
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
      const newEmployee = {
        name: this.fullName.val,
        phone: this.phone.val,
        salary: this.salary.val,
        birthDate: this.birthDate.val,
        address: this.address.val,
        status: this.booleanStatus,
      }
      this.$emit('action',newEmployee);
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

.invalid label, p {
  color: red;
}

.invalid input{
  border: 1px solid red;
}
.flex{
  display: flex;
}
</style>