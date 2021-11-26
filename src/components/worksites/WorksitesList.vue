<template>
  <div>
    <wrapper class="header">
      <h1>Worksites</h1>
      <link-button link :to="addWorksiteLink">Add a Worksite</link-button>
    </wrapper>
    <ul v-if="clientWorksites.length > 0">
      <worksite-details
          v-for="worksite in clientWorksites"
          :key="worksite.name"
          :id="worksite.id"
          :name="worksite.name"
          :address="worksite.address"
          :type="worksite.type"
      >
      </worksite-details>
    </ul>
    <div v-else>
      <wrapper class="header">
        <h2>This client does not have any worksites yet.</h2>
      </wrapper>
    </div>
  </div>
</template>

<script>
import WorksiteDetails from "./WorksiteDetails";
import Wrapper from "../UI/Wrapper";
export default {
  name: "WorksitesList",
  components:{Wrapper, WorksiteDetails},
  computed: {
    clientWorksites(){
      return this.$store.getters.clientWorksites;
    },
    addWorksiteLink(){
      const link = this.$route.path + '/register';
      return link;
    }
  },
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