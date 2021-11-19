<template>
  <ul>
    <wrapper>
      <li>
        <h2>Clients</h2>
        <router-link to="/clients">Edit</router-link>
      </li>
    </wrapper>
    <wrapper>
      <li>
        <h2>Worksites</h2>
        <router-link to="/worksites">Edit</router-link>
        </li>
    </wrapper>
    <wrapper>
      <li>
        <h2>Employees</h2>
        <router-link to="/employees">Edit</router-link>
        </li>
    </wrapper>
    <wrapper>
      <li>
        <h2>Equipment</h2>
        <router-link to="/equipment">Edit</router-link>
        </li>
    </wrapper>
    <wrapper>
      <li>
        <h2>Jobs</h2>
        <router-link to="/jobs">Edit</router-link>
        </li>
    </wrapper>
  </ul>
</template>

<script>
import Wrapper from "./UI/Wrapper";
export default {
  name: "MainList",
  components: {Wrapper}
}
</script>

<style scoped>
ul{
  list-style: none;
}
li{
  display: flex;
  justify-content: space-between;
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
</style>