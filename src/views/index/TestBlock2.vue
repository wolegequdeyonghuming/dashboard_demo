<template>
  <div>
    <block-title title="空气质量">
      <test-input v-model="value"></test-input>
    </block-title>

    <block-content>
      <div>
        <test-date-picker v-model="date"></test-date-picker>{{date}}
      </div>
      <div style="margin-top: 16px;">
        <test-date-ranger v-model="range"></test-date-ranger>{{range}}
      </div>
      <div style="margin-top: 16px;">
        <test-datetime-picker v-model="datetime"></test-datetime-picker>{{datetime}}
      </div>
    </block-content>
  </div>
</template>

<script>
  import BlockTitle from "../../components/common/BlockTitle";
  import BlockContent from "../../components/common/BlockContent";
  import TestInput from "../../components/inputs/TestInput";
  import TestDatePicker from "../../components/inputs/TestDatePicker";
  import TestDateRanger from "../../components/inputs/TestDateRanger";
  import TestDatetimePicker from "../../components/inputs/TestDateTimePicker";
  export default {
    name: "TestBlock2",
    components: {TestDatetimePicker, TestDateRanger, TestDatePicker, TestInput, BlockContent, BlockTitle},
    data(){
      return{
        value: "",

        date: "",
        range: "",
        datetime: "",
      }
    },
    methods: {
      onDetailClick(){

      }
    },
    mounted(){

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

        &.green > .value{color: lime;}
        &.green > .unit{color: lime;}
        &.red > .value{color: #ff3c5f;}
        &.red > .unit{color: #ff3c5f;}
        &.orange > .value{color: #ff9041;}
        &.orange > .unit{color: #ff9041;}
      }
    }
  }
</style>