<template>
  <wrapper>
    <form @submit.prevent="action">
      <slot name="title"></slot>
      <div class="form-control" :class="{invalid: !name.isValid}">
        <label for="name">Name:</label>
        <input type="text" id="name" v-model.trim="name.val" @blur="clearValidity('name')">
      </div>
      <p v-if="!name.isValid"> Name cannot be empty!</p>
      <div class="form-control" :class="{invalid: !address.isValid}">
        <label for="address">Address:</label>
        <input type="text" id="address" v-model.trim="address.val" @blur="clearValidity('address')">
      </div>
      <p v-if="!address.isValid"> Address cannot be empty!</p>
      <div class=" form-control flex" :class="{invalid: !type.isValid}">
        <label>Type of place:</label>
        <select v-model="type.val" @blur="clearValidity('type')">
          <option value="Office">Office</option>
          <option value="Residential building">Residential building</option>
          <option value="Personal house">Personal house</option>
          <option value="Individual apartment">Individual apartment</option>
          <option value="Industrial area">Industrial area</option>
          <option value="Warehouse">Warehouse</option>
          <option value="Outdoor location">Outdoor location</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <p v-if="!type.isValid"> Please select the type of the worksite!</p>
      <slot name="button"></slot>
    </form>
  </wrapper>
</template>

<script>
export default {
  name: "AddWorksite",
  props:['oldName','oldAddress', 'oldType'],
  data(){
    return{
      name: {
        val: this.oldName || '',
        isValid: true,
      },
      address: {
        val: this.oldAddress || '',
        isValid: true,
      },
      type: {
        val: this.oldType || '',
        isValid: true,
      },

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
      if (this.address.val === ''){
        this.address.isValid = false;
        this.formIsValid = false;
      }
      if (this.type.val === ''){
        this.type.isValid = false;
        this.formIsValid = false;
      }
    },
    action(){
      this.validateForm();
      if (!this.formIsValid){
        return;
      }
      const newWorksite ={
        name: this.name.val,
        address: this.address.val,
        type: this.type.val
      }
      this.$emit('action',newWorksite);
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
.invalid label, p {
  color: red;
}

.invalid input{
  border: 1px solid red;
}
</style>