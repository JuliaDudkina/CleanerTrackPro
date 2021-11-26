<template>
  <li>
    <wrapper class="flex">
      <div>
        <h3>Name: {{ name }}</h3>
        <h3>Address: {{ address }}</h3>
        <h3>Type of place: {{ type }}</h3>
      </div>
      <div>
        <link-button @click="updateWorksite">Update</link-button>
        <link-button @click="deleteWorksite">Delete</link-button>
      </div>
    </wrapper>
  </li>
</template>

<script>
import Wrapper from "../UI/Wrapper";
export default {
  name: "WorksiteDetails",
  components: {Wrapper},
  props: ['id','name', 'address', 'type'],
  methods:{
    updateWorksite(){
      const oldData = {
        id: this.id,
        name: this.name,
        address: this.address,
        type: this.type,
      }
      this.$store.dispatch('setOldData', oldData);
      const url = this.$route.path.substring(0, this.$route.path.length - 1) + '/' + this.id + '/update';
      this.$router.replace(url);
    },
    deleteWorksite(){
      const worksiteId = this.id;
      this.$store.dispatch('deleteWorksite',worksiteId);
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