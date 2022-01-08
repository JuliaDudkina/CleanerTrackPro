<template>
  <button v-if="!link" :class="mode">
    <slot></slot>
  </button>
  <router-link v-else :to="to" :class="mode">
    <slot></slot>
  </router-link>
</template>

<script>
export default {
  name: "BaseButton",
  props:{
    link: {
      type: Boolean,
      required: false,
      default: false
    },
    to:{
      type: String,
      required: false,
      default: '/'
    },
    mode:{
      type: String,
      required: false,
      default: null
    }
  }
}
</script>

<style scoped>
button,
a {
  text-decoration: none;
  padding: 0.75rem 1.5rem;
  font: inherit;
  background-color: #55bd8a;
  border: 1px solid #55bd8a;
  color: white;
  cursor: pointer;
  margin-right: 0.5rem;
  display: inline-block;
}

a:hover,
a:active,
button:hover,
button:active {
  background-color: #3d8d66;
  border-color: #3d8d66;
}

.flat {
  background-color: transparent;
  color: black;
  box-shadow: inset 0 0 rgb(63, 123, 252);
  transition: all 0.3s ease-out;
  font-size: 1.5em;
  min-width: 150px;
  text-align: center;
}

.flat:hover,
.flat:active{
  box-shadow: inset 12em 0 #3F7BFCFF;
  cursor: pointer;
  color: white;
}
.outline {
  background-color: transparent;
  border-color: #270041;
  color: #270041;
}

.outline:hover,
.outline:active {
  background-color: #edd2ff;
}
</style>