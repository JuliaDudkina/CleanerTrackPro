<template>
  <wrapper>
    <form @submit.prevent="action">
      <slot name="title"></slot>
      <div class="flex" :class="{invalid: !type.isValid}">
        <label>Type of work:</label>
        <select v-model="type.val" @blur="clearValidity('type')">
          <option value="Office cleaning">Office cleaning</option>
          <option value="Home cleaning">Home cleaning</option>
          <option value="Deep cleaning">Deep cleaning</option>
          <option value="Outdoor cleaning">Outdoor cleaning</option>
          <option value="Industrial area cleaning">Industrial area cleaning</option>
        </select>
      </div>
      <div class="flex">
        <div class="form-control" :class="{invalid: !startDate.isValid}">
          <label for="startDate">Start Date</label>
          <input type="date" id="startDate" v-model="startDate.val" @blur="clearValidity('startDate')">
        </div>
        <div class="form-control" :class="{invalid: !endDate.isValid}">
          <label for="endDate">End Date</label>
          <input type="date" id="endDate" v-model="endDate.val" @blur="clearValidity('endDate')">
        </div>
      </div>
      <div class="form-control flex">
        <label for="hazard">Hazardous materials</label>
        <input type="checkbox" id="hazard" value="hazard" v-model="hazard">
      </div>
      <div class="form-control flex" :class="{invalid: !fee.isValid}">
        <label for="fee">Service Fee: $</label>
        <input type="number" id="fee" v-model="fee.val" @blur="clearValidity('fee')">
      </div>
      <div class="form-control flex" :class="{invalid: !chosenEmployee.isValid}">
        <label>Choose an employee:</label>
        <select v-model="chosenEmployee.val" @blur="clearValidity('chosenEmployee')">
          <option v-for="name in names" :key="name">
            {{ name}}
          </option>
        </select>
      </div>
      <div class="form-control ">
        <label>Choose necessary equipment:</label>
        <div class="flex">
          <div class="flex margin" v-for="itemName in itemNames" :key="itemName">
            <label :for="itemName">{{ itemName }}</label>
            <input type="checkbox" :id="itemName" :value="itemName" v-model="equipment">
          </div>
        </div>
      </div>
      <div class="form-control flex">
        <label>Status:</label>
        <select v-model="status">
          <option>Active</option>
          <option>Inactive</option>
        </select>
      </div>
      <slot name="button"></slot>
    </form>
  </wrapper>
</template>

<script>
export default {
  name: "JobForm",
  props: ['oldStartDate', 'oldType', 'oldEndDate', 'oldHazard', 'oldFee', 'oldChosenEmployee', 'oldEquipment', 'oldStatus'],
  data(){
    return{
      startDate:{
        val: this.oldStartDate || '',
        isValid: true,
      },
      type:{
        val: this.oldType || '',
        isValid: true,
      },
      endDate:{
        val: this.oldEndDate || '',
        isValid: true,
      },
      hazard: this.oldHazard || false,
      fee:{
        val: this.oldFee || null,
        isValid: true,
      },
      chosenEmployee:{
        val: this.oldChosenEmployee || '',
        isValid: true,
      },
      status: this.oldStatus || '',
      equipment: this.oldEquipment || [],
    }
  },
  computed:{
    names(){
      return this.$store.getters.names;
    },
    itemNames(){
      return this.$store.getters.itemNames;
    },
    booleanStatus(){
      if (this.status === 'Active'){
        return true;
      }
      return false;
    }
  },
  methods:{
    loadEmployeeNames(){
      try {
        this.$store.dispatch('loadNames');
      }catch (error) {
        this.error = error.message || 'Something went wrong!';
      }
    },
    loadItemNames(){
      try {
        this.$store.dispatch('loadItemNames');
      }catch (error) {
        this.error = error.message || 'Something went wrong!';
      }
    },
    clearValidity(input){
      this[input].isValid = true;
    },
    validateForm(){
      this.formIsValid = true;
      if (this.startDate.val === ''){
        this.startDate.isValid = false;
        this.formIsValid = false;
      }
      if (this.endDate.val === ''){
        this.endDate.isValid = false;
        this.formIsValid = false;
      }
      if (this.type.val === ''){
        this.type.isValid = false;
        this.formIsValid = false;
      }
      if (this.chosenEmployee.val === ''){
        this.chosenEmployee.isValid = false;
        this.formIsValid = false;
      }
      if (!this.fee.val || this.fee.val < 0){
        this.fee.isValid = false;
        this.formIsValid = false;
      }
    },
    action(){
      this.validateForm();
      if (!this.formIsValid){
        return;
      }
      const newJob = {
        startDate: this.startDate.val,
        type: this.type.val,
        endDate: this.endDate.val,
        hazard: this.hazard,
        fee: this.fee.val,
        chosenEmployee: this.chosenEmployee.val,
        equipment: this.equipment,
        status: this.booleanStatus
      }
      this.$emit('action',newJob);
    }
  },
  created() {
    this.loadEmployeeNames();
    this.loadItemNames();
  }
}
</script>

<style scoped>
.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input[type='checkbox'] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}

input{
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
}

input:focus{
  background-color: #e6fdfb;
  outline: none;
  border-color: #0d520d;
}
input[type='checkbox'] {
  display: inline;
  width: auto;
  border: none;
}
input[type='number'] {
  width: 30%;
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.invalid label {
  color: red;
}

.invalid input{
  border: 1px solid red;
}
.flex{
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
}
ul{
  list-style: none;
  margin: 0;
  padding: 0;
  border-left: #c2c2c2 solid 1px;
  border-right: #c2c2c2 solid 1px;
}
.margin{
  margin-right: 15px;
}
</style>