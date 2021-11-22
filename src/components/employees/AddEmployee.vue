<template>
  <wrapper>
    <form @submit="submitData">
      <h2>Register a new employee</h2>
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
      <link-button>Submit</link-button>
    </form>
  </wrapper>
</template>

<script>
import Wrapper from "../UI/Wrapper";
export default {
  name: "AddEmployee",
  components: {Wrapper},
  data(){
    return{
      fullName: {
        val: '',
        isValid: true,
      },
      phone: {
        val: null,
        isValid: true,
      },
      birthDate: {
        val: '',
        isValid: true,
      },
      salary: {
        val: null,
        isValid: true,
      },
      address: {
        val: '',
        isValid: true,
      },

    }
  },
  methods:{
    submitData(){
      const newEmployee = {
        name: this.fullName.val,
        phone: this.phone.val,
        salary: this.salary.val,
        birthDate: this.birthDate.val,
        address: this.address.val,
      }
      this.$store.dispatch('addEmployee', newEmployee);
      this.$store.dispatch('loadEmployees');
      this.$router.replace("/employees");

      this.fullName.val = '';
      this.address.val = '';
      this.phone.val = null;
      this.salary.val = null;
      this.birthDate.val = '';
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