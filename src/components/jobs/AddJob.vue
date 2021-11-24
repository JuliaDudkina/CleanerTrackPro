<template>
  <job-form @action="addJob">
    <template v-slot:title>
      <h2>Register a new job</h2>
    </template>
    <template v-slot:button>
      <link-button>Submit</link-button>
    </template>
  </job-form>
</template>

<script>
import JobForm from "./JobForm";
export default {
  components:{
    JobForm,
  },
  methods:{
    addJob(data){
      const newJob = data;
      this.$store.dispatch('addJob',newJob);
      this.$router.replace('/jobs');
    }
  }
}
</script>

<style scoped>

</style>