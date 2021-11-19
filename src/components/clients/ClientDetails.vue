<template>
  <wrapper>
    <h1>{{ name }}</h1>
    <p>Primary office address:</p>
    <address>
      {{ address }}
    </address>
    <p>Contact phone: <a :href="'tel:' + phone">{{ phone }}</a></p>
    <p>Contact person: {{ contactPerson }}</p>
    <p>Status: {{ status }}</p>
  </wrapper>
</template>

<script>
import Wrapper from "../UI/Wrapper";
export default {
  name: "ClientDetails",
  components: {Wrapper},
  props: ['name','address', 'phone', 'contactPerson', 'status'],
}
</script>

<style scoped>

</style>