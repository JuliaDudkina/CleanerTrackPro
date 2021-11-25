<template>
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
        <link-button @click="deleteEmployee">Delete</link-button>
        <link-button @click="loadJobs">Jobs</link-button>
      </div>
    </wrapper>
  </li>
</template>

<script>
export default {
  name: "EmployeesDetails",
  props: ['id','name', 'phone', 'salary', 'birthDate', 'address'],
  methods:{
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