<template>
  <div>
    <Dialog @close="closeDialog" :show="success" title="Success!">
      <h3>The employee has been successfully updated!</h3>
      <template v-slot:buttonText>Go to Employees' List</template>
    </Dialog>
    <employee-form @action="update"
                   :old-full-name="oldEmployee.name"
                   :old-birth-date="oldEmployee.birthDate"
                   :old-phone="oldEmployee.phone"
                   :old-address="oldEmployee.address"
                   :old-salary="oldEmployee.salary"
    >
      <template v-slot:title>
        <h2>Update the employee</h2>
      </template>
      <template v-slot:button>
        <link-button>Update</link-button>
      </template>
    </employee-form>
  </div>
</template>

<script>
import EmployeeForm from "./EmployeeForm";
import Dialog from "../UI/Dialog";
export default {
  name: "AddEmployee",
  components: {EmployeeForm, Dialog},
  data(){
    return{
      success: false
    }
  },
  computed:{
    oldEmployee(){
      return this.$store.getters.employee;
    }
  },
  methods:{
    async update(data){
      this.success = true;
      const updatedEmployee = data;
      await this.$store.dispatch('updateEmployee', updatedEmployee);
      await this.$store.dispatch('loadEmployees');
    },
    closeDialog(){
      this.$router.replace("/employees");
    }
  }
}
</script>
