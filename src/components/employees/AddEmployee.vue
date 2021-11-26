<template>
  <div>
    <Dialog @close="closeDialog" :show="success" title="Success!">
      <h3>A new employee has been successfully created!</h3>
      <template v-slot:actions>
        <link-button @click="clear">Create another employee</link-button>
      </template>
      <template v-slot:buttonText>Go to Employees' List</template>
    </Dialog>
    <employee-form @action="submitData">
      <template v-slot:title>
        <h2>Register a new employee</h2>
      </template>
      <template v-slot:button>
        <link-button>Submit</link-button>
      </template>
    </employee-form>
  </div>
</template>

<script>
import EmployeeForm from "./EmployeeForm";
import Dialog from "../UI/Dialog";
export default {
  name: "AddEmployee",
  components: {EmployeeForm,Dialog},
  data(){
    return{
      success: false
    }
  },
  methods:{
    async submitData(data){
      this.success = true;
      const newEmployee = data;
      await this.$store.dispatch('addEmployee', newEmployee);
      await this.$store.dispatch('loadEmployees');
    },
    closeDialog(){
      this.$router.replace("/employees");
    },
    clear(){
      this.success = false;
      this.$router.go();
    }
  }
}
</script>
