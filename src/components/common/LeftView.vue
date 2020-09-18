<template>
  <section class="left-view">
    <slot></slot>
  </section>
</template>

<script>
  export default {
    name: "LeftView"
  }
</script>

<style scoped lang="scss">
  .left-view{
    position: absolute;
    left: 0;
    top: 0;
    width: 420px;
    height: 100vh;
    padding: 76px 16px 16px 16px;
    z-index: 10;
    /*background: rgba(0,0,0,0.3);*/
    background: linear-gradient(to right, #000000c7, #000000aa 80%, #00000055 95%, transparent);
  }
</style>