<template>
  <div>
    <Dialog @close="closeDialog" :show="success" title="Success!">
      <h3>The job has been successfully updated!</h3>
      <template v-slot:buttonText>Go to Jobs' List</template>
    </Dialog>
    <job-form @action="update"
              :old-type="oldJob.type"
              :old-start-date="oldJob.startDate"
              :old-end-date="oldJob.endDate"
              :old-fee="oldJob.fee"
              :old-hazard="oldJob.hazard"
              :old-equipment="oldJob.equipment"
              :old-chosen-employee="oldJob.employee"
              :old-status="oldJob.status"
    >
      <template v-slot:title>
        <h2>Update this job</h2>
      </template>
      <template v-slot:button>
        <link-button>Update</link-button>
      </template>
    </job-form>
  </div>
</template>

<script>
import JobForm from "./JobForm";
import Dialog from "../UI/Dialog";
export default {
  name: "UpdateJob",
  components:{
    JobForm,
    Dialog
  },
  data(){
    return{
      success: false
    }
  },
  computed:{
    oldJob(){
      return this.$store.getters.oldJob;
    }
  },
  methods:{
    update(data){
      this.success = true;
      const newJob = {
        startDate: data.startDate,
        endDate: data.endDate,
        type: data.type,
        hazard: data.hazard,
        fee: data.fee,
        employee: data.chosenEmployee,
        equipment: data.equipment,
        status: data.status
      }
      this.$store.dispatch('updateJob', newJob);
    },
    closeDialog(){
      this.$router.replace('/jobs');
    }
  }
}
</script>

<style scoped>

</style>