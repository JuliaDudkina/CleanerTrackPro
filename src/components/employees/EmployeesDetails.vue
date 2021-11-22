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
<!--        <link-button @click="updateEmployee">Update</link-button>-->
        <link-button @click="deleteEmployee">Delete</link-button>
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