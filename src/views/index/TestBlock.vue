<template>
  <div>
    <block-title title="空气质量">
      <i class="mdi mdi-menu detail-button" @click="onDetailClick"></i>
    </block-title>

    <block-content class="flex">
      <div>
        <div class="sub-title">空气质量优良率</div>
        <animated-gauge :value="value" :height="160" :width="160"></animated-gauge>
      </div>

      <ul class="describes">
        <li class="good"><div class="label">全年优良率：</div><div class="value">90</div><div class="unit">%</div></li>
        <li class="total"><div class="label">有效监测天数：</div><div class="value">321</div><div class="unit">天</div></li>
        <li class="bad"><div class="label">超标天数：</div><div class="value">24</div><div class="unit">天</div></li>
      </ul>
    </block-content>
  </div>
</template>

<script>
  import BlockTitle from "../../components/common/BlockTitle";
  import BlockContent from "../../components/common/BlockContent";
  import AnimatedGauge from "../../components/charts/AnimatedGauge";
  export default {
    name: "TestBlock",
    components: {AnimatedGauge, BlockContent, BlockTitle},
    data(){
      return{
        value: 0,
      }
    },
    methods: {
      onDetailClick(){

      }
    },
    mounted(){
      //示例
      setInterval(()=>{
        this.value = Math.round(Math.random() * 100);
      }, 3000)
    }
  }
</script>

<style scoped lang="scss">

  .detail-button {
    cursor: pointer;
    color: cyan;
    margin-right: 16px;
  }

  .flex{
    display: flex;
    justify-content: space-around;
    align-items: center;

    .sub-title {
      text-align: center;
      font-weight: bold;
    }

    .describes {
      list-style: none;
      padding: 0;

      >li{
        display: flex;
        margin: 16px 0;
        align-items: baseline;

        .value {
          font-size: 24px;
          font-weight: bold;
        }
        .unit {
          margin-left: 6px;
        }

        &.good > .value{color: lime;}
        &.good > .unit{color: lime;}
        &.bad > .value{color: #ff3c5f;}
        &.bad > .unit{color: #ff3c5f;}
        &.total > .value{color: cyan;}
        &.total > .unit{color: cyan;}
      }
    }
  }
</style>