<template>
  <page>
    <head-view title="黔西南州数据中心驾驶舱">
      <button>返回</button>
      <button>跳转</button>
    </head-view>

    <left-view>
      <test-block2></test-block2>
      <test-block3 style="margin-top: 16px;"></test-block3>
      <test-block style="margin-top: 16px;"></test-block>
    </left-view>

    <right-view>
      <test-block></test-block>
      <test-block style="margin-top: 16px;"></test-block>
      <test-block style="margin-top: 16px;"></test-block>
    </right-view>

    <div class="map" ref="map">

      <!--overlay Container-->
      <div style="display: none">

        <!--点位窗口-->
        <div ref="infoWindow" class="info-window">
          <div class="info-window-title">
            <span>测试点位{{pointData.id}}</span>
            <i class="mdi mdi-close" @click="closeInfoWindow"></i>
          </div>
          <div class="info-window-content">
            <ul class="info-window-ul">
              <li class="single"><span class="label">AQI：</span><span >26</span></li>
              <li><span class="label">PM<sub>2.5</sub>：</span><span >50</span></li>
              <li><span class="label">PM<sub>10</sub>：</span><span >50</span></li>
              <li><span class="label">SO<sub>2</sub>：</span><span >50</span></li>
              <li><span class="label">NO<sub>2</sub>：</span><span >50</span></li>
              <li><span class="label">CO：</span><span >50</span></li>
              <li><span class="label">O<sub>3</sub>：</span><span >50</span></li>
              <li class="single"><span class="label">监测时间：</span><span >2020-09-08 15:00</span></li>
            </ul>
            <p class="info-window-footer">
              <v-btn color="cyan"><span style="color: white">详情</span></v-btn>
            </p>
          </div>
        </div>

      </div>
    </div>
  </page>
</template>

<script>
  import Page from "../../components/common/Page";
  import HeadView from "../../components/common/HeadView";
  import LeftView from "../../components/common/LeftView";
  import RightView from "../../components/common/RightView";
  import TestBlock from "./TestBlock";
  import MapMixin from "../../components/mixin/MapMixin";
  import TestBlock2 from "./TestBlock2";
  import TestBlock3 from "./TestBlock3";


  export default {
    name: "Index",
    components: {TestBlock3, TestBlock2, TestBlock, RightView, LeftView, HeadView, Page},
    mixins: [MapMixin],
    data: ()=>({
      points: [],
      pointData: {
        id: ''
      }
    }),
    async mounted (){
      await this.initMap();
      await this.initLayers();
      this.initEvent();
      this.addProvince();
      // this.addPoints(this.points, this.layers.pointLayer)
      this.getData();
    },
    methods: {
      getData(){
        this.points = [
          [105.5512615234375, 25.392244702148446, {id: 1}],
          [105.56636772460938, 25.10522687988282, {id: 2}],
          [105.31642875976563, 25.252169018554696, {id: 3}],
          [105.30818901367188, 25.65728986816407, {id: 4}],
          [104.95815239257813, 25.37439191894532, {id: 5}],
          [104.8469158203125, 25.16290510253907, {id: 6}],
          [105.05977592773438, 25.11895979003907, {id: 7}]
        ];
        let arr = [];
        this.points.forEach(point=>{
          arr.push({
            longitude: point[0],
            latitude: point[1],
            attr: point[2]
          })
        });
        this.addPoints(arr, this.layers.pointLayer);

      },

      getPointData(id){
        console.log(id);
        this.pointData.id = id;
      }
    }
  }
</script>

<style scoped lang="scss">

.map{
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 1;
}


  .info-window {
    background-color: rgba(0, 29, 50, 0.8);
    width: 300px;
    box-shadow: rgba(0,255,255,0.5) 0 0 10px;

    .info-window-title{
      color: cyan;
      font-weight: bold;
      padding: 4px 16px;
      display: flex;
      align-items: center;
      /*border-bottom: rgba(0,255,255,0.5) 1px solid;*/

      position: relative;
      background: linear-gradient(to right, rgb(0, 17, 95), rgba(2,57,126,0.4));

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
        width: 100%;
        height: 1px;
        left: 0;
        background: linear-gradient(to right, #00cfcf, transparent);
        position: absolute;
        bottom: 0;
      }


      i{
        margin-left: auto;
        cursor: pointer;
      }
    }

    .info-window-content{
      padding: 8px 0;
      font-size: 14px;

      .info-window-ul {
        list-style: none;
        padding: 0;
        display: flex;
        align-items: flex-start;
        flex-wrap: wrap;

        li {
          width: calc(50% - 32px);
          overflow: hidden;
          text-overflow: ellipsis;
          word-break: break-all;
          margin: 0 16px;

          &.single{
            width: 100%;
          }
          span {
            line-height: 24px;
            &.label{
              color: cyan;
              min-width: 60px;
              display: inline-block;
            }
          }
        }
      }
    }
    .info-window-footer {
      margin: 8px 16px 0 16px;
      display: flex;
      justify-content: flex-start;

      ::v-deep .v-btn{
        font-size: 14px;
        height: 32px;
        margin-left: auto;
      }
    }
  }
</style>