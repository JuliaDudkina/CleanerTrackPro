<template>
  <wrapper>
    <form @submit.prevent="action">
      <slot name="title"></slot>
      <div class="form-control">
        <label for="name">Name:</label>
        <input type="text" id="name" required v-model.trim="name.val">
      </div>
      <div class="form-control flex">
        <label for="fee">Service Fee: $</label>
        <input type="number" id="fee" v-model="fee.val">
      </div>
      <div class="form-control">
        <label for="storage">Storage location:</label>
        <input type="text" id="storage" v-model="storage.val">
      </div>
      <slot name="button"></slot>
    </form>
  </wrapper>

</template>

<script>
export default {
  name: "AddEquipment",
  props: [ 'oldName','oldFee','oldStorage'],
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
    }
  },
  methods:{
    action(){
      const newEquipment = {
        name: this.name.val,
        fee: this.fee.val,
        storage: this.storage.val,
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
</style>