<template>
  <h2>Hello, {{ Name }}!</h2>
</template>
<script>
module.exports = {
  props: ['Name']
}
</script>
<style scoped>
  h2 {
    font-size: 40px;
    color: mediumseagreen;
  }
</style>