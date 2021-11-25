<template>
  <li>
    <wrapper class="wrapper">
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
        <div class="flex">
          <h3>Equipment:</h3>
          <ul>
            <li v-for="item in equipment"
                :key="item">
              {{ item }}
            </li>
          </ul>
        </div>
      </div>
      <div class="actions">
        <link-button class="m-b" @click="updateJob">Update</link-button>
        <link-button @click="deleteJob">Delete</link-button>
      </div>
    </wrapper>
  </li>
</template>

<script>
import Wrapper from "../UI/Wrapper";
export default {
  components: {Wrapper},
  props:['id','startDate', 'endDate', 'type', 'hazard', 'fee', 'employee', 'equipment'],
  computed:{
    isHazard(){
      if( this.hazard){
        return 'Yes';
      }else{
        return 'No';
      }
    }
  },
  methods: {
    deleteJob() {
      const jobID = this.id;
      this.$store.dispatch('deleteJob', jobID);
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
      }
      this.$store.dispatch('setOldJob',oldJob);
      this.$router.replace('/jobs/update');
    }
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
</style>