<template>
  <div>
    <Dialog @close="closeDialog" :show="success" title="Success!">
      <h3>A new worksite has been successfully created!</h3>
      <template v-slot:buttonText>Go to Worksites' List</template>
    </Dialog>
    <worksite-form  @action="saveData">
      <template v-slot:title>
        <h2>Add a new worksite</h2>
      </template>
      <template v-slot:button>
        <link-button>Submit</link-button>
      </template>
    </worksite-form>
  </div>
</template>

<script>
import WorksiteForm from "./WorksiteForm";
import Dialog from "../UI/Dialog";
export default {
  name: "AddWorksite",
  components:{ WorksiteForm, Dialog },
  data(){
    return{
      success: false
    }
  },
  methods:{
    async saveData(data) {
      this.success = true;
      const newWorksite = {...data};
      await this.$store.dispatch('addWorksite', newWorksite);
      await this.$store.dispatch('loadClientWorksites');
    },
    closeDialog(){
      this.$router.go(-1);
    }
  }
}
</script>

<style scoped>

</style>