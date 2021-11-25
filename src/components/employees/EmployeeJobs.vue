<template>
  <div>
    <wrapper>
      <h2>{{employeeName}}'s jobs</h2>
    </wrapper>
    <ul v-if="employeeJobs.length > 0">
      <job-details
          v-for="job in employeeJobs"
          :key="job.type"
          :type="job.type"
          :hazard="job.hazard"
          :employee="job.chosenEmployee"
          :fee="job.fee"
          :end-date="job.endDate"
          :start-date="job.startDate"
          :equipment="job.equipment"
      >
      </job-details>
    </ul>
    <div v-else>
      <h2>This employee does not have any jobs yet.</h2>
    </div>
  </div>
</template>

<script>
import JobDetails from "../jobs/JobDetails";
import Wrapper from "../UI/Wrapper";
export default {
  name: "EmployeesJob",
  components:{
    Wrapper,
    JobDetails,
  },
  computed: {
    employeeJobs(){
      return this.$store.getters.employeesJobs;
    },
    employeeName(){
      return this.$store.getters.employeesJobs[0].chosenEmployee;
    }
  },
}
</script>

<style scoped>
ul{
  list-style: none;
  padding: 0;
  margin: 0;
}
.wrapper{
  box-shadow: none;
  text-align: center;
}
</style>