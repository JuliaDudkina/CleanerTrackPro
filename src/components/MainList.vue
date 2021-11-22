<template>
  <ul>
    <wrapper>
      <li>
        <h2>Clients</h2>
        <link-button :class="{disabled: !isAuthenticated}" mode="flat" link to="/clients">Edit</link-button>
      </li>
    </wrapper>
    <wrapper>
      <li>
        <h2>Worksites</h2>
        <link-button :class="{disabled: !isAuthenticated}" mode="flat" link to="/worksites">Edit</link-button>
        </li>
    </wrapper>
    <wrapper>
      <li>
        <h2>Employees</h2>
        <link-button :class="{disabled: !isAuthenticated}" mode="flat" link to="/employees">Edit</link-button>
        </li>
    </wrapper>
    <wrapper>
      <li>
        <h2>Equipment</h2>
        <link-button :class="{disabled: !isAuthenticated}" mode="flat" link to="/equipment">Edit</link-button>
        </li>
    </wrapper>
    <wrapper>
      <li>
        <h2>Jobs</h2>
        <link-button :class="{disabled: !isAuthenticated}" mode="flat" link to="/jobs">Edit</link-button>
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
    }
  }
}
</script>

<style scoped>
ul{
  list-style: none;
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
a.disabled {
  pointer-events: none;
}
</style>