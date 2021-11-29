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
          :status="worksite.status"
      >
      </worksite-details>
    </ul>
    <div v-else>
      <wrapper class="header">
        <h2>This client does not have any worksites yet.</h2>
      </wrapper>
    </div>
    <Dialog :show="successDeletion" title="Success!" @close="closeDialog">
      <h3>This worksite has been successfully deleted!</h3>
      <template v-slot:buttonText>Close</template>
    </Dialog>
  </div>
</template>

<script>
import WorksiteDetails from "./WorksiteDetails";
import Wrapper from "../UI/Wrapper";
import Dialog from "../UI/Dialog";
export default {
  name: "WorksitesList",
  components:{Wrapper, WorksiteDetails, Dialog},
  computed: {
    clientWorksites(){
      return this.$store.getters.clientWorksites;
    },
    addWorksiteLink(){
      const link = this.$route.path + '/register';
      return link;
    },
    successDeletion(){
      return this.$store.getters.successDeletion;
    }
  },
  methods:{
    closeDialog(){
      this.$store.dispatch('setSuccessDeletion');
    },
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