<template>
  <div>
    <Dialog @close="closeDialog" :show="success" title="Success!">
      <h3>A new job has been successfully created!</h3>
      <template v-slot:actions>
        <link-button @click="clear">Create another job</link-button>
      </template>
      <template v-slot:buttonText>Go to Jobs' List</template>
    </Dialog>
    <job-form @action="addJob">
      <template v-slot:title>
        <h2>Register a new job</h2>
      </template>
      <template v-slot:button>
        <link-button>Submit</link-button>
      </template>
    </job-form>
  </div>
</template>

<script>
import JobForm from "./JobForm";
import Dialog from "../UI/Dialog";
export default {
  components:{
    JobForm,Dialog
  },
  data(){
    return{
      success: false
    }
  },
  methods:{
    addJob(data){
      this.success = true;
      const newJob = {...data};
      this.$store.dispatch('addJob',newJob);
    },
    closeDialog(){
      this.$router.replace('/jobs');
    },
    clear(){
      this.success = false;
      this.$router.go();
    }
  }
}
</script>

<style scoped>

</style>