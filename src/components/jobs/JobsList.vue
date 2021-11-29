<template>
  <div>
    <wrapper class="header">
      <h1>Jobs</h1>
      <link-button link to="/jobs/register">Add a New Job</link-button>
    </wrapper>
    <ul>
      <job-details v-for="job in jobs"
                   :key="job.type"
                   :id="job.id"
                   :start-date="job.startDate"
                   :end-date="job.endDate"
                   :type="job.type"
                   :fee="job.fee"
                   :employee="job.chosenEmployee"
                   :equipment="job.equipment"
                   :hazard="job.hazard"
                   :status="job.status"
      >
      </job-details>
    </ul>
  </div>
</template>

<script>
import JobDetails from "./JobDetails";
export default {
  name: "WorksiteList",
  components:{
    JobDetails
  },
  computed:{
    jobs(){
      return this.$store.getters.jobs;
    }
  },
  methods:{
    async loadJobs(){
      try {
        await this.$store.dispatch('loadJobs');
      } catch (error) {
        this.error = error.message || 'Something went wrong!';
      }
    }
  },
  created() {
    this.loadJobs();
  }
}
</script>

<style scoped>
.header{
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: none;
}
ul{
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>