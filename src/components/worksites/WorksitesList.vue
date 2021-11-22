<template>
  <div>
    <wrapper class="header">
      <h1>Worksites</h1>
      <link-button link to="/worksites/register">Add a Worksite</link-button>
    </wrapper>
  </div>
</template>

<script>
export default {
  name: "WorksitesList"
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