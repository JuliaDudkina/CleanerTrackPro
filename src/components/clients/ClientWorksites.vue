<template>
  <div>
    <wrapper>
      <h2>Worksites</h2>
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
      <h2>This client does not have any worksites yet.</h2>
    </div>
  </div>
</template>

<script>
import WorksiteDetails from "../worksites/WorksiteDetails";
import Wrapper from "../UI/Wrapper";
export default {
  name: "ClientWorksites",
  components: {
    Wrapper,
    WorksiteDetails
  },
  computed: {
    clientWorksites(){
      return this.$store.getters.clientWorksites;
    }
  },
}
</script>

<style scoped>
ul{
  list-style: none;
  padding: 0;
  margin: 0;
}
.wrapper{
  box-shadow: none;
}
.wrapper h2{
  text-align: center;
}
</style>