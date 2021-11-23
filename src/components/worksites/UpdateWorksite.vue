<template>
  <worksite-form @action="update"
    :old-name="oldData.name"
    :old-address="oldData.address"
    :old-type="oldData.type"
  >
    <template v-slot:title>
      <h2>Update the worksite</h2>
    </template>
    <template v-slot:button>
      <link-button>Update</link-button>
    </template>
  </worksite-form>
</template>

<script>
import WorksiteForm from "./WorksiteForm";
export default {
  name: "UpdateWorksite",
  components:{WorksiteForm},
  computed:{
    oldData(){
      return this.$store.getters.oldData;
    }
  },
  methods:{
    async update(data){
      const newData = {
        name: data.name,
        address: data.address,
        type: data.type,
      }
      await this.$store.dispatch('updateWorksite', newData);
      await this.$store.dispatch('loadWorksites');
      await this.$router.replace('/worksites');
    }
  }
}
</script>

<style scoped>

</style>