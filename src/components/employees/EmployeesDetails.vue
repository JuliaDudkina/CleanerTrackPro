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
        </div>
        <div>
          <link-button @click="updateEmployee">Update</link-button>
          <link-button @click="confirm">Delete</link-button>
          <link-button @click="loadJobs">Jobs</link-button>
        </div>
      </wrapper>
    </li>
    <Dialog @close="deleteEmployee" :show="isConfirm" title="Are you sure you want to delete this employee?">
      <h3>This employee will be deleted immediately. You cannot undo this action.</h3>
      <template v-slot:actions>
        <link-button @click="closeConfirmation">Cancel</link-button>
      </template>
      <template v-slot:buttonText>Delete</template>
    </Dialog>
  </div>
</template>

<script>
import Dialog from "../UI/Dialog";
export default {
  name: "EmployeesDetails",
  components: {Dialog},
  props: ['id','name', 'phone', 'salary', 'birthDate', 'address'],
  data(){
    return{
      isConfirm: false,
    }
  },
  methods:{
    confirm(){
      this.isConfirm = true;
    },
    closeConfirmation(){
      this.isConfirm = false;
    },
    deleteEmployee(){
      const clientId = this.id;
      this.$store.dispatch('deleteEmployee', clientId);
    },
    updateEmployee(){
      const employee = {
        id: this.id,
        name: this.name,
        phone: this.phone,
        salary: this.salary,
        birthDate: this.birthDate,
        address: this.address,
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