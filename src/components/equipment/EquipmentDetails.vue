<template>
  <li >
    <wrapper class="flex">
      <div>
        <h3>Name: {{name}}</h3>
        <h3>Fee: ${{ fee }}</h3>
        <h3>Storage Location: {{ storage }}</h3>
      </div>
      <div>
<!--        <link-button @click="updateItem">Update</link-button>-->
        <link-button @click="deleteItem">Delete</link-button>
      </div>
    </wrapper>
  </li>
</template>

<script>

export default {
  name: "EquipmentDetails",
  props:['id','name','fee', 'storage'],
  methods:{
    deleteItem(){
      const itemId = this.id;
      this.$store.dispatch('deleteEquipment', itemId)
    }
  }
}
</script>

<style scoped>
.flex{
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}
</style>