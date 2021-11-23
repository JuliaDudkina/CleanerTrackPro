<template>
  <div>
    <wrapper class="header">
      <h1>Worksites</h1>
      <link-button link to="/worksites/register">Add a Worksite</link-button>
    </wrapper>
    <ul>
      <worksite-details
          v-for="worksite in worksites"
          :key="worksite.name"
          :id="worksite.id"
          :name="worksite.name"
          :address="worksite.address"
          :type="worksite.type"
      >
      </worksite-details>
    </ul>
  </div>
</template>

<script>
import WorksiteDetails from "./WorksiteDetails";
export default {
  name: "WorksitesList",
  components:{WorksiteDetails},
  computed: {
    worksites(){
      return this.$store.getters.worksites;
    }
  },
  methods:{
    async loadWorksites() {
      try {
        await this.$store.dispatch('loadWorksites');
      } catch (error) {
        this.error = error.message || 'Something went wrong!';
      }
    },
  },
  created(){
    this.loadWorksites();
  }
}
</script>

<style scoped>
.header{
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: none;
}
ul{
  list-style: none;
  padding: 0;
  margin: 0;
}
</style>