<template>
  <wrapper>
    <form @submit.prevent="update">
      <h2>Update this piece of equipment</h2>
      <div class="form-control">
        <label for="name">Name:</label>
        <input type="text" id="name" required v-model.trim="name.val" :placeholder="item.name">
      </div>
      <div class="form-control flex">
        <label for="fee">Service Fee: $</label>
        <input type="number" id="fee" v-model="fee.val" :placeholder="item.fee">
      </div>
      <div class="form-control">
        <label for="storage">Storage location:</label>
        <input type="text" id="storage" v-model="storage.val" :placeholder="item.storage">
      </div>
      <link-button>Update</link-button>
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
  computed:{
    item(){
      return this.$store.getters.item;
    }
  },
  methods:{
    async update(){
      const updatedItem = {
        name: this.name.val,
        fee: this.fee.val,
        storage: this.storage.val,
      }
      await this.$store.dispatch('updateItem',updatedItem);
      await this.$store.dispatch('loadEquipment');
      await this.$router.replace("/equipment");
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