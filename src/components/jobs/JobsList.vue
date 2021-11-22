<template>
  <div>
    <wrapper class="header">
      <h1>Jobs</h1>
      <link-button link to="/jobs/register">Add a New Job</link-button>
    </wrapper>
  </div>
</template>

<script>
export default {
  name: "WorksiteList"
}
</script>

<style scoped>
.header{
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: none;
}
</style>