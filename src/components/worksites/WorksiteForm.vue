<template>
  <wrapper>
    <form @submit.prevent="action">
      <slot name="title"></slot>
      <div class="form-control">
        <label for="name">Name:</label>
        <input type="text" id="name" v-model.trim="name.val">
      </div>
      <div class="form-control">
        <label for="address">Address:</label>
        <input type="text" id="address" v-model.trim="address.val">
      </div>
      <div class=" form-control flex">
        <label>Type of place:</label>
        <select v-model="type.val">
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
      },
      address: {
        val: this.oldAddress || '',
      },
      type: {
        val: this.oldType || '',
      },

    }
  },
  methods:{
    action(){
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
</style>