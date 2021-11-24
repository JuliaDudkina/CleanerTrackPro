<template>
  <wrapper>
    <form @submit.prevent="action">
      <slot name="title"></slot>
      <div class="form-control">
        <label for="name">Full Name</label>
        <input type="text" id="name" required v-model.trim="fullName.val">
      </div>
      <div class="form-control">
        <label for="tel">Phone Number</label>
        <input type="tel" id="tel" required v-model.number="phone.val">
      </div>
      <div class="form-control">
        <label for="address">Address</label>
        <input type="text" id="address" v-model="address.val">
      </div>
      <div class="flex">
        <div class="form-control">
          <label for="date">Birth Date</label>
          <input type="date" id="date" v-model="birthDate.val">
        </div>
        <div class="form-control">
          <label for="salary">Salary</label>
          <input type="number" id="salary" v-model="salary.val">
        </div>
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
  props: ['oldFullName','oldPhone','oldBirthDate','oldSalary','oldAddress'],
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
    }
  },
  methods:{
    action(){
      const newEmployee = {
        name: this.fullName.val,
        phone: this.phone.val,
        salary: this.salary.val,
        birthDate: this.birthDate.val,
        address: this.address.val,
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

.invalid label {
  color: red;
}

.invalid input{
  border: 1px solid red;
}
.flex{
  display: flex;
}
</style>