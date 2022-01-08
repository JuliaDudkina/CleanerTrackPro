<template>
  <header>
    <nav>
      <h1>
        <router-link to="/">
          CleanerTrackPro
        </router-link>
      </h1>
      <ul>
        <li>
          <link-button v-if="!isAuthenticated" link to="/auth">
            Log in/Sign up
          </link-button>
          <link-button v-if="isAuthenticated" link to="/" @click="logout">
            Log out
          </link-button>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  name: "TheHeader",
  computed:{
    isAuthenticated(){
      return this.$store.getters.isAuthenticated;
    },
  },
  methods: {
    logout(){
      this.$store.dispatch('logout');
      this.$router.replace('/');
    }
  }
}
</script>

<style scoped>
header {
  width: 100%;
  height: 5rem;
  background-color: #55bd8a;
  display: flex;
  justify-content: center;
  align-items: center;
}

header a {
  text-decoration: none;
  color: white;
  display: inline-block;
  padding: 0.75rem 1.5rem;
  border: 1px solid transparent;
}

a:active,
a:hover,
a.router-link-active {
  border: 1px solid white;
}

h1 {
  margin: 0;
}

h1 a {
  color: white;
  margin: 0;
}

h1 a:hover,
h1 a:active,
h1 a.router-link-active {
  border-color: transparent;
}

header nav {
  width: 90%;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

header ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

li {
  margin: 0 0.5rem;
}
</style>