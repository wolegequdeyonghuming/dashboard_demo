<template>
  <header class="head-view">
    <h1 class="page-name">
      <img :src="logo">
      <span :style="titleStyle">{{title}}</span>
    </h1>
    <div class="extra">
      <slot></slot>
    </div>
  </header>
</template>

<script>
  export default {
    name: "HeadView",
    props: {
      title: {
        type: String,
        required: true,
        default: '大屏展示'
      },
      titleStyle: {
        type: Object,
        default: ()=> {}
      }
    },
    data(){
      return{
        logo: require("../../assets/img/zhb-white.png")
      }
    }
  }
</script>

<style scoped lang="scss">

  .head-view{
    width: 100%;
    height: 60px;
    position: absolute;
    background: linear-gradient(to bottom, #000000c7, #00000055 60%, transparent);
    z-index: 20;
  }

  .page-name {
    text-align: center;
    font-size: 32px;
    color: white;
    letter-spacing: 4px;
    line-height: 60px;
    text-shadow: 0px 3px 6px rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 500px;
    margin: 0 auto;

    img{
      width: 48px;
      height: 48px;
    }
  }

  .extra{
    position: absolute;
    display: flex;
    top: 0;
    width: 100%;
    height: 100%;
    padding: 8px 16px;
  }
</style>