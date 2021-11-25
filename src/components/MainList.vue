<template>
  <ul>
    <wrapper>
      <li>
        <h2>Clients</h2>
        <link-button mode="flat" link :to="link('/clients')">Edit</link-button>
      </li>
    </wrapper>
    <wrapper>
      <li>
        <h2>Worksites</h2>
        <link-button mode="flat" link :to="link('/worksites')">Edit</link-button>
        </li>
    </wrapper>
    <wrapper>
      <li>
        <h2>Employees</h2>
        <link-button mode="flat" link :to="link('/employees')">Edit</link-button>
        </li>
    </wrapper>
    <wrapper>
      <li>
        <h2>Equipment</h2>
        <link-button mode="flat" link :to="link('/equipment')">Edit</link-button>
        </li>
    </wrapper>
    <wrapper>
      <li>
        <h2>Jobs</h2>
        <link-button mode="flat" link :to="link('/jobs')">Edit</link-button>
        </li>
    </wrapper>
  </ul>
</template>

<script>
import Wrapper from "./UI/Wrapper";
export default {
  name: "MainList",
  components: {Wrapper},
  computed:{
    isAuthenticated(){
      return this.$store.getters.isAuthenticated;
    },
  },
  methods:{
    link(path){
      const splicedPath = path.substr(1);
      return this.isAuthenticated ? path : `/auth?redirect=${splicedPath}`;
    }
  }
}
</script>

<style scoped>
ul{
  list-style: none;
  margin: 0;
  padding: 0;
}
li{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 50px;
}
h2{
  margin: 20px 0;
}
a{
  text-decoration: none;
  margin: 20px 0;
  font-size: 1.5em;
}
.wrapper{
  padding: 0;
}
</style>