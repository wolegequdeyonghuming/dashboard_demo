<template>
  <section class="right-view">
    <slot></slot>
  </section>
</template>

<script>
  export default {
    name: "RightView"
  }
</script>

<style scoped lang="scss">
  .right-view{
    position: absolute;
    right: 0;
    top: 0;
    width: 420px;
    height: 100vh;
    /*background: rgba(255,255,200,0.5);*/
    padding: 76px 16px 16px 16px;
    z-index: 10;
    background: linear-gradient(to left, #000000c7, #000000aa 80%, #00000055 95%, transparent);
  }
</style>