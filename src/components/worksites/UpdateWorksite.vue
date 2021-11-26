<template>
  <div>
    <Dialog @close="closeDialog" :show="success" title="Success!">
      <h3>A new worksite has been successfully updated!</h3>
      <template v-slot:buttonText>Go to Worksites' List</template>
    </Dialog>
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
  </div>
</template>

<script>
import WorksiteForm from "./WorksiteForm";
export default {
  name: "UpdateWorksite",
  components:{WorksiteForm},
  data(){
    return{
      success: false
    }
  },
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
        clientId: data.clientId
      }
      await this.$store.dispatch('updateWorksite', newData);
      await this.$store.dispatch('loadClientWorksites');
      const index = this.$route.path.indexOf('worksite')
      const url = this.$route.path.substring(0, index + 8) + 's';
      this.$router.replace(url);
    },
    closeDialog(){
      this.$router.go(-1);
    }
  }
}
</script>

<style scoped>

</style>