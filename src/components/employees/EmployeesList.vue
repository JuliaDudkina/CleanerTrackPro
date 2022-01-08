<template>
  <div>
    <wrapper class="header">
      <h1>Employees</h1>
      <link-button link to="/employees/register"> Add Employee</link-button>
    </wrapper>
    <ul>
      <employees-details
          v-for="(employee) in employees"
          :key="employee.id"
          :id="employee.id"
          :name="employee.name"
          :phone="employee.phone"
          :address="employee.address"
          :birth-date="employee.birthDate"
          :salary="employee.salary"
          :status="employee.status"
      ></employees-details>
    </ul>
    <Dialog :show="successDeletion" title="Success!" @close="closeDialog">
      <h3>This employee has been successfully deleted!</h3>
      <template v-slot:buttonText>Close</template>
    </Dialog>
  </div>
</template>

<script>
import EmployeesDetails from "./EmployeesDetails";
import Dialog from "../UI/Dialog";
export default {
  name: "EmployeesList",
  components: {EmployeesDetails, Dialog},
  computed: {
    employees(){
      return this.$store.getters.employees;
    },
    successDeletion(){
      return this.$store.getters.successDeletion;
    }
  },
  methods:{
    closeDialog(){
      this.$store.dispatch('setSuccessDeletion');
    },
    async loadEmployees() {
      try {
        await this.$store.dispatch('loadEmployees');
      } catch (error) {
        this.error = error.message || 'Something went wrong!';
      }
    },
  },
  created(){
      this.loadEmployees();
  },
}
</script>

<style scoped>
ul{
  list-style: none;
  padding: 0;
  margin: 0;
}
.header{
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: none;
}
</style>