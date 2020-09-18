<template>
  <div class="page">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: "Page"
  }
</script>

<style scoped>
.page{
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
}
</style>