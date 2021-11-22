<template>
  <wrapper>
    <form @submit.prevent="submitData">
      <h2>Add a new piece of equipment</h2>
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
      <link-button>Submit</link-button>
    </form>
  </wrapper>

</template>

<script>
export default {
  name: "AddEquipment",
  data(){
    return{
      name:{
        val: '',
        isValid: true
      },
      fee:{
        val: null,
        isValid: true,
      },
      storage:{
        val: '',
        isValid: true
      },
    }
  },
  methods:{
    submitData(){
      const newEquipment = {
        name: this.name.val,
        fee: this.fee.val,
        storage: this.storage.val,
      }
      this.$store.dispatch('addEquipment',newEquipment);
      this.$router.replace("/equipment");
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