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
  </div>
</template>

<script>
import EmployeesDetails from "./EmployeesDetails";
export default {
  name: "EmployeesList",
  components: {EmployeesDetails},
  computed: {
    employees(){
      return this.$store.getters.employees;
    }
  },
  methods:{
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