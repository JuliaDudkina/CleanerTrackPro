<template>
  <wrapper>
    <form @submit.prevent="action">
      <slot name="title"></slot>
      <div class="form-control" :class="{invalid: !name.isValid}">
        <label for="name">Name:</label>
        <input type="text" id="name" v-model.trim="name.val" @blur="clearValidity('name')">
      </div>
      <p v-if="!name.isValid">Name cannot empty!</p>
      <div class="form-control flex" :class="{invalid: !fee.isValid}">
        <label for="fee">Service Fee: $</label>
        <input type="number" id="fee" v-model="fee.val" @blur="clearValidity('fee')">
      </div>
      <p v-if="!fee.isValid">Fee cannot be zero or less!</p>
      <div class="form-control" :class="{invalid: !storage.isValid}">
        <label for="storage">Storage location:</label>
        <input type="text" id="storage" v-model="storage.val" @blur="clearValidity('storage')">
      </div>
      <p v-if="!storage.isValid">Storage cannot empty!</p>
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
  name: "AddEquipment",
  props: [ 'oldName','oldFee','oldStorage', 'oldStatus'],
  data(){
    return{
      name:{
        val: this.oldName || '',
        isValid: true
      },
      fee:{
        val: this.oldFee || null,
        isValid: true,
      },
      storage:{
        val: this.oldStorage || '',
        isValid: true
      },
      status: this.oldStatus || '',
    }
  },
  computed:{
    booleanStatus(){
      if (this.status === 'Active'){
        return true;
      }
      return false;
    }
  },
  methods:{
    clearValidity(input){
      this[input].isValid = true;
    },
    validateForm(){
      this.formIsValid = true;
      if (this.name.val === ''){
        this.name.isValid = false;
        this.formIsValid = false;
      }
      if (this.storage.val === ''){
        this.storage.isValid = false;
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
      const newEquipment = {
        name: this.name.val,
        fee: this.fee.val,
        storage: this.storage.val,
        status: this.booleanStatus
      }
      this.$emit('action',newEquipment);
    }
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

input[type='number'] {
  width: 30%;
}
.flex{
  display: flex;
  align-items: baseline;
}
.invalid, .invalid label, p {
  color: red;
}

.invalid input{
  border: 1px solid red;
}
</style>