<template>
  <div>
    <block-title title="空气质量"></block-title>

    <div class="custom-table-wrapper">
      <vxe-table
              class="custom-table"
              :data="tableData"
              border="false"
              height="auto"
              row-class-name="custom-table-row"
              header-row-class-name="custom-header-row">
        <vxe-table-column type="seq" title="Seq" width="60"></vxe-table-column>
        <vxe-table-column field="name" title="Name"></vxe-table-column>
        <vxe-table-column field="sex" title="Sex"></vxe-table-column>
        <vxe-table-column field="address" title="Address"></vxe-table-column>
      </vxe-table>
    </div>
  </div>
</template>

<script>
  import BlockTitle from "../../components/common/BlockTitle";
  import BlockContent from "../../components/common/BlockContent";

  export default {
    name: "TestBlock3",
    components: {BlockTitle},
    data(){
      return {
        tableData: [
          { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', address: 'Shenzhen' },
          { id: 10002, name: 'Test2', role: 'Test', sex: 'Man', address: 'Guangzhou' },
          { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', address: 'Shanghai' },
          { id: 10004, name: 'Test1', role: 'Develop', sex: 'Man', address: 'Shenzhen' },
          { id: 10005, name: 'Test2', role: 'Test', sex: 'Man', address: 'Guangzhou' },
          { id: 10006, name: 'Test3', role: 'PM', sex: 'Man', address: 'Shanghai' },
          { id: 10007, name: 'Test1', role: 'Develop', sex: 'Man', address: 'Shenzhen' },
          { id: 10008, name: 'Test2', role: 'Test', sex: 'Man', address: 'Guangzhou' },
          { id: 10009, name: 'Test3', role: 'PM', sex: 'Man', address: 'Shanghai' },
          { id: 100010, name: 'Test1', role: 'Develop', sex: 'Man', address: 'Shenzhen' },
          { id: 100011, name: 'Test2', role: 'Test', sex: 'Man', address: 'Guangzhou' },
          { id: 100012, name: 'Test3', role: 'PM', sex: 'Man', address: 'Shanghai' },
        ]
      }
    }
  }
</script>

<style scoped lang="scss">

@import '~vxe-table/styles/variable.scss';

// 局部修改变量
// 有些不生效？
$vxe-font-size: 14px;
$vxe-table-font-color: white;
$vxe-table-header-background-color: black;
$vxe-table-border-color: transparent;
$vxe-table-background-color: red;
$vxe-table-row-hover-background-color: rgba(0,255,255,0.1);
$vxe-table-border-color: rgba(0,255,255,0.7);

@import '~vxe-table/styles/modules.scss';

.custom-table-wrapper{
  margin-top: 6px;
  height: 300px;

  ::v-deep .custom-header-row{
    color: cyan;
  }
  ::v-deep .vxe-table--header-wrapper{
    background: rgba(0,0,0,0.6) !important;
  }
  ::v-deep .vxe-table--body-wrapper{
    background: transparent !important;
  }
  ::v-deep .vxe-table--header-border-line, ::v-deep .vxe-table--border-line{
    border: none !important;
  }


  /*滚动条整体部分*/
  .custom-table ::v-deep div::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }
  /*滚动条的轨道*/
  .custom-table ::v-deep div::-webkit-scrollbar-track {
    background-color: rgba(0, 0, 0, 0.3);
  }
  /*滚动条里面的小方块，能向上向下移动*/
  .custom-table ::v-deep div::-webkit-scrollbar-thumb {
    background-color: rgba(0, 255, 255, 0.5);
    border-radius: 5px;
    border: none;
    box-shadow: inset 0 0 6px rgba(0,0,0,.3);
  }
  .custom-table ::v-deep div::-webkit-scrollbar-thumb:hover {
    background-color: rgba(0, 255, 255, 0.7);
  }
  .custom-table ::v-deep div::-webkit-scrollbar-thumb:active {
    background-color: rgba(0, 255, 255, 0.7);
  }
  /*边角，即两个滚动条的交汇处*/
  .custom-table ::v-deep div::-webkit-scrollbar-corner {
    background-color: rgba(0, 0, 0, 0.3);
  }
}

</style>