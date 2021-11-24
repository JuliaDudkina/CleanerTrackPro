<template>
  <job-form @action="update"
            :old-type="oldJob.type"
            :old-start-date="oldJob.startDate"
            :old-end-date="oldJob.endDate"
            :old-fee="oldJob.fee"
            :old-hazard="oldJob.hazard"
            :old-equipment="oldJob.equipment"
            :old-chosen-employee="oldJob.employee"
  >
    <template v-slot:title>
      <h2>Update this job</h2>
    </template>
    <template v-slot:button>
      <link-button>Update</link-button>
    </template>
  </job-form>
</template>

<script>
import JobForm from "./JobForm";
export default {
  name: "UpdateJob",
  components:{
    JobForm,
  },
  computed:{
    oldJob(){
      return this.$store.getters.oldJob;
    }
  },
  methods:{
    async update(data){
      const newJob = {
        startDate: data.startDate,
        endDate: data.endDate,
        type: data.type,
        hazard: data.hazard,
        fee: data.fee,
        employee: data.chosenEmployee,
        equipment: data.equipment,
      }
      await this.$store.dispatch('updateJob', newJob);
      await this.$store.dispatch('loadJobs');
      await this.$router.replace('/jobs');
    }
  },
  created() {
    console.log(this.oldJob);
  }
}
</script>

<style scoped>

</style>