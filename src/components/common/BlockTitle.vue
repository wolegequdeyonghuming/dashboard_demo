<template>
  <div class="block-title">
    <span>{{title}}</span>

    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: "BlockTitle",
    props: {
      title: String
    }
  }
</script>

<style scoped lang="scss">
.block-title{
  /*background: url("../../assets/img/title-bg.png") left repeat-y;*/
  /*background-repeat: repeat-y;*/

  height: 36px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 16px;
  position: relative;

  background: linear-gradient(to right, rgb(2, 68, 156), rgba(2,57,126,0.4));

  &::before{
    content: "";
    display: block;
    height: 100%;
    width: 3px;
    background-color: #00cfcf;
    position: absolute;
    left: 0;
  }
  &::after{
    content: "";
    display: block;
    height: 100%;
    width: 3px;
    background-color: black;
    position: absolute;
    left: 4px;
  }

  >span{
    color: cyan;
    font-weight: bold;
    font-size: 16px;
  }
}
</style>