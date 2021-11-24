<template>
  <div>
    <h2></h2>
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
export default {
  name: "ClientWorksites",
  components: {
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
</style>