<template>
  <div class="block-content" :style="{height: height + 'px'}">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: "BlockContent",
    props:{
      height: {
        type: Number,
        // required: true
      }
    }
  }
</script>

<style scoped lang="scss">
.block-content{
  width: 100%;
  /*background: rgba(28, 51, 96, 0.54);*/
  margin-top: 4px;
  padding: 16px
}
</style>