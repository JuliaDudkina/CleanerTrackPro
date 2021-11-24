<template>
  <employee-form @action="submitData">
    <template v-slot:title>
      <h2>Register a new employee</h2>
    </template>
    <template v-slot:button>
      <link-button>Submit</link-button>
    </template>
  </employee-form>
</template>

<script>
import EmployeeForm from "./EmployeeForm";
export default {
  name: "AddEmployee",
  components: {EmployeeForm},
  methods:{
    submitData(data){
      const newEmployee = data;
      this.$store.dispatch('addEmployee', newEmployee);
      this.$store.dispatch('loadEmployees');
      this.$router.replace("/employees");
    }
  }
}
</script>
