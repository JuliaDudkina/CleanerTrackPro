<template>
    <worksite-form  @action="saveData">
      <template v-slot:title>
        <h2>Add a new worksite</h2>
      </template>
      <template v-slot:button>
        <link-button>Submit</link-button>
      </template>
    </worksite-form>
</template>

<script>
import WorksiteForm from "./WorksiteForm";
export default {
  name: "AddWorksite",
  components:{ WorksiteForm },
  methods:{
    async saveData(data) {
      const newWorksite = data;
      this.$store.dispatch('addWorksite', newWorksite);
      await this.$store.dispatch('loadWorksites');
      this.$router.replace('/worksites');
    }
  }
}
</script>

<style scoped>

</style>