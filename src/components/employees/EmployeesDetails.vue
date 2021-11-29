<template>
  <div>
    <li>
      <wrapper class="flex">
        <div>
          <div>
            <h1>{{ name }}</h1>
            <p>Phone: <a :href="'tel:' + phone">{{ phone}}</a></p>
            <p>Salary: ${{ salary }}</p>
            <p>Birth Date: {{birthDate}}</p>
          </div>
          <div class="inline">
            <p>Address:</p>
            <address> {{ address }}</address>
          </div>
          <div class="inline">
            <p>Status: {{ stringStatus }}</p>
          </div>
        </div>
        <div>
          <link-button @click="updateEmployee">Update</link-button>
          <link-button @click="confirm">Delete</link-button>
          <link-button @click="loadJobs">Jobs</link-button>
        </div>
      </wrapper>
    </li>
    <Dialog @close="closeConfirmation" :show="isConfirm" title="Are you sure you want to delete this employee?">
      <h3 v-if="!status">This employee will be deleted immediately. You cannot undo this action.</h3>
      <h3 v-if="status">This employee is active and cannot be deleted.</h3>
      <template v-slot:buttonText>Cancel</template>
      <template v-slot:actions>
        <link-button v-if="!status" @click="deleteEmployee">Delete anyway</link-button>
        <link-button v-if="status" @click="deactivate">Deactivate</link-button>
      </template>
    </Dialog>
    <Dialog :show="successDeactivation" title="Success!" @close="closeDialog">
      <h3>This employee has been successfully deactivated!</h3>
      <template v-slot:buttonText>Close</template>
    </Dialog>
  </div>
</template>

<script>
import Dialog from "../UI/Dialog";
export default {
  name: "EmployeesDetails",
  components: {Dialog},
  props: ['id','name', 'phone', 'salary', 'birthDate', 'address', 'status'],
  data(){
    return{
      isConfirm: false,
      successDeactivation: false,
    }
  },
  computed:{
    stringStatus(){
      if (this.status) {
        return 'Active'
      }
      return 'Inactive';
    },
  },
  methods:{
    confirm(){
      this.isConfirm = true;
    },
    closeConfirmation(){
      this.isConfirm = false;
    },
    deactivate(){
      const employeeId = this.id;
      this.$store.dispatch('deactivateEmployee', employeeId);
      this.isConfirm = false;
      this.successDeactivation = true;
    },
    closeDialog(){
      this.successDeactivation = false;
    },
    deleteEmployee(){
      const employeeId = this.id;
      this.$store.dispatch('deleteEmployee', employeeId);
      this.isConfirm = false;
      this.$store.dispatch('setSuccessDeletion');
    },
    updateEmployee(){
      const employee = {
        id: this.id,
        name: this.name,
        phone: this.phone,
        salary: this.salary,
        birthDate: this.birthDate,
        address: this.address,
        status: this.stringStatus,
      }
      this.$store.dispatch('setEmployee', employee);
      this.$router.replace('/employees/update');
    },
    async loadJobs(){
      const employeeName = this.name;
      try {
        await this.$store.dispatch('loadEmployeesJobs', employeeName);
        this.$router.replace('/employees/jobs');
      } catch (error) {
        this.error = error.message || 'Something went wrong!';
      }
    }
  }
}
</script>

<style scoped>
.flex{
  display: flex;
  justify-content: space-around;
  align-items: baseline;
}
.inline{
  display: flex;
  align-items: center;
}
</style>