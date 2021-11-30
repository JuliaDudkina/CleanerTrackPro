<template>
  <div>
    <li>
      <wrapper class="wrapper" :class="{scrollToMe: changed}">
        <div>
          <div class="flex">
            <div class="flex m-r">
              <h3>Start Date: </h3>
              <p>{{ startDate }}</p>
            </div>
            <div class="flex">
              <h3>End Date:</h3>
              <p> {{ endDate }}</p>
            </div>
          </div>
          <div class="flex">
            <h3>Type:</h3>
            <p> {{ type }}</p>
          </div>
          <div class="flex">
            <h3>Hazardous materials:</h3>
            <p> {{ isHazard }}</p>
          </div>
          <div class="flex">
            <h3>Fee:</h3>
            <p>${{ fee }}</p>
          </div>
          <div class="flex">
            <h3>Employee:</h3>
            <p> {{ employee }}</p>
          </div>
          <div class="flex" v-if="equipment">
            <h3>Equipment:</h3>
            <ul>
              <li v-for="item in equipment"
                  :key="item">
                {{ item }}
              </li>
            </ul>
          </div>
          <div class="flex">
            <h3>Status:</h3>
            <p>{{ stringStatus }}</p>
          </div>
        </div>
        <div class="actions">
          <link-button class="m-b" @click="updateJob">Update</link-button>
          <link-button @click="confirm">Delete</link-button>
        </div>
      </wrapper>
    </li>
    <Dialog @close="closeConfirmation" :show="isConfirm" title="Are you sure you want to delete this job?">
      <h3 v-if="!status">This job will be deleted immediately. You cannot undo this action.</h3>
      <h3 v-if="status">This job is active and cannot be deleted.</h3>
      <template v-slot:buttonText>Cancel</template>
      <template v-slot:actions>
        <link-button v-if="!status" @click="deleteJob">Delete anyway</link-button>
        <link-button v-if="status" @click="deactivate">Deactivate</link-button>
      </template>
    </Dialog>
    <Dialog :show="successDeactivation" title="Success!" @close="closeDialog">
      <h3>This job has been successfully deactivated!</h3>
      <template v-slot:buttonText>Close</template>
    </Dialog>
  </div>
</template>

<script>
import Wrapper from "../UI/Wrapper";
import Dialog from "../UI/Dialog";
export default {
  components: {Wrapper, Dialog},
  props:['id','startDate', 'endDate', 'type', 'hazard', 'fee', 'employee', 'equipment', 'status'],
  data(){
    return{
      isConfirm: false,
      successDeactivation: false,
      changed: false
    }
  },
  computed:{
    isHazard(){
      if( this.hazard){
        return 'Yes';
      }else{
        return 'No';
      }
    },
    stringStatus(){
      if (this.status) {
        return 'Active'
      }
      return 'Inactive';
    },
  },
  methods: {
    confirm(){
      this.isConfirm = true;
    },
    closeConfirmation(){
      this.isConfirm = false;
    },
    deactivate(){
      const jobId = this.id;
      this.$store.dispatch('deactivateJob', jobId);
      this.isConfirm = false;
      this.successDeactivation = true;
    },
    closeDialog(){
      this.successDeactivation = false;
    },
    deleteJob() {
      const jobID = this.id;
      this.$store.dispatch('deleteJob', jobID);
      this.isConfirm = false;
      this.$store.dispatch('setSuccessDeletion');
    },
    updateJob(){
      const oldJob = {
        id: this.id,
        startDate: this.startDate,
        endDate: this.endDate,
        type: this.type,
        hazard: this.hazard,
        fee: this.fee,
        employee: this.employee,
        equipment: this.equipment,
        status: this.stringStatus
      }
      this.$store.dispatch('setOldJob',oldJob);
      this.$router.replace('/jobs/update');
    },
    scrollToElement() {
      const el = document.querySelector('.scrollToMe');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  },
  watch:{
    hazard(){
      this.changed = true;
    },
    startDate(){
      this.changed = true;
    },
    endDate(){
      this.changed = true;
    },
    fee(){
      this.changed = true;
    },
    employee(){
      this.changed = true;
    },
    type(){
      this.changed = true;
    },
    stringStatus(){
      this.changed = true;
    }
  },
  updated() {
    this.scrollToElement();
  }
}
</script>

<style scoped>
.flex{
  display: flex;
  align-items: baseline;
}
.m-r{
  margin-right: 30px;
}
h3,p {
  margin: 5px;
}
.wrapper{
  display: flex;
  justify-content: space-between;
}
.actions{
  display: flex;
  flex-direction: column;
  align-items: normal;
}
.m-b{
  margin-bottom: 10px;
}
@keyframes highlight {
  from {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  }
  50% {
    box-shadow: 0 2px 40px rgba(0, 0, 0, 0.4);
  }
  to {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  }
}
.wrapper.scrollToMe{
  animation-duration: 3s;
  animation-name: highlight;
}
</style>