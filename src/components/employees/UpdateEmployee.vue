<template>
  <employee-form @action="update"
                 :old-full-name="oldEmployee.name"
                 :old-birth-date="oldEmployee.birthDate"
                 :old-phone="oldEmployee.phone"
                 :old-address="oldEmployee.address"
                 :old-salary="oldEmployee.salary"
  >
    <template v-slot:title>
      <h2>Update an employee</h2>
    </template>
    <template v-slot:button>
      <link-button>Update</link-button>
    </template>
  </employee-form>
</template>

<script>
import EmployeeForm from "./EmployeeForm";
export default {
  name: "AddEmployee",
  components: {EmployeeForm},
  computed:{
    oldEmployee(){
      return this.$store.getters.employee;
    }
  },
  methods:{
    async update(data){
      const updatedEmployee = data;
      await this.$store.dispatch('updateEmployee', updatedEmployee);
      await this.$store.dispatch('loadEmployees');
      await this.$router.replace("/employees");
    }
  }
}
</script>
