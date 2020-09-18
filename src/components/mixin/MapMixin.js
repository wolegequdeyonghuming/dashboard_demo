//ol组件，按需引用
import "ol/ol.css";
import {Map, Feature, View, Overlay} from "ol";
import {Point} from "ol/geom";
import {Vector as VectorSource, XYZ} from "ol/source";
import {Tile as TileLayer, Vector as VectorLayer} from "ol/layer";
import {Fill, Stroke, Style, Circle} from "ol/style";
import {defaults as defaultControls, ScaleLine} from 'ol/control';
import GeoJSON from 'ol/format/GeoJSON.js';
import EsriJSON from 'ol/format/EsriJSON.js';
import {unByKey} from 'ol/Observable';
import {easeOut} from 'ol/easing';
import {click} from 'ol/events/condition';
import {Select} from 'ol/interaction';
import {getVectorContext} from 'ol/render'

import districtData from "@/assets/data/522300";


export default {
  name: "MapView",
  data() {
    return {
      map: null,
      layers: {
        provinceLayer: null,
        pointLayer: null,
      },
      overlays: [],
      infoWindow: null,
      infoWindowContent: '',

      //波纹动画相关
      currentFeature: null,
      highLightKey: null,
    }
  },
  methods:{

    /***
     * 初始化地图
     */
    async initMap () {
      this.map = new Map({
        target: this.$refs.map,
        layers: [
          //谷歌地图
          new TileLayer({
            source: new XYZ({
              url: 'http://mt3.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}',
            })
          }),
          //谷歌地图标注
          new TileLayer({
            source: new XYZ({
              url: 'http://mt3.google.cn/maps/vt?lyrs=h@189&gl=cn&x={x}&y={y}&z={z}',
            })
          }),
        ],
        //视图
        view: new View({
          center: [105.42491875, 25.321520214843755],
          zoom: 10,
          projection: 'EPSG:4326',
        }),
        interactions: null,
        //控制组件：比例尺
        controls: defaultControls().extend([
          new ScaleLine()
        ])
      });
    },

    /***
     * 加图层
     * @return {Promise<void>}
     */
    async initLayers(){

      //行政区划边界图层
      this.layers.provinceLayer = new VectorLayer({
        renderMode: "vector",
        source: new VectorSource(),
        zIndex: 0,
      });
      this.map.addLayer(this.layers.provinceLayer);

      //点位图层
      this.layers.pointLayer = new VectorLayer({
        renderMode: "vector",
        source: new VectorSource(),
        style: this.getPointStyle,
        zIndex: 100,
      });
      this.map.addLayer(this.layers.pointLayer);
    },

    /***
     * 初始化事件
     */
    initEvent(){

      const clickSelect = new Select({
        condition: click,
        layers: [this.layers.pointLayer,]
      });
      clickSelect.on('select', (e)=> {

        unByKey(this.highLightKey);
        this.currentFeature = null;

        const features = e.selected;
        features.forEach((feature)=>{
          feature.setStyle(this.getPointStyle(feature));
          this.onPointClick(feature)
        });
      });
      this.map.addInteraction(clickSelect);

      // this.map.on("singleclick", (e)=>{
      //   console.log(e);
      //   this.map.forEachFeatureAtPixel(feature =>{
      //     this.onPointClick(feature)
      //   });
      // });
    },

    /***
     * 加省市边界
     */
    addProvince(){
      districtData.features.forEach((featureJSON)=>{
        let feature = new GeoJSON().readFeature(featureJSON);
        feature.setStyle(new Style({
          stroke: new Stroke({  //边框
            color: "rgb(0, 200, 255, 0.8)",
            width: 1
          }),
          fill: new Fill({    //填充
            color: 'rgba(0, 200, 255, 0.2)'
          })
        }));
        this.layers.provinceLayer.getSource().addFeature(feature);
        this.addProvinceOverlay(feature);
      });
    },


    /***
     * 加悬浮框
     * @param feature
     */
    addProvinceOverlay(feature){
      //生成内容HTML元素
      let el = document.createElement("div");
      el.className = "province-overlay";
      el.innerHTML = feature.get("name"); // + "<br>数量：" + Math.ceil(Math.random() * 50); //模拟数据

      //创建overlay
      let overlay = new Overlay({
        element: el,
        offset: [-30, 5],
      });
      this.map.addOverlay(overlay);
      this.overlays.push(overlay);

      if(feature.getGeometry().getType() === 'Polygon'){
        overlay.setPosition(feature.getGeometry().getInteriorPoint().getCoordinates());
      }else{
        overlay.setPosition(feature.getGeometry().getInteriorPoints().getCoordinates()[0]);
      }
    },


    /***
     * 加点
     * @param points  [{longitude,latitude,attr}]
     * @param layer
     */
    addPoints(points, layer){
      let arr = [];
      points.forEach(point=>{
        const feature = new Feature({
          geometry: new Point([point.longitude, point.latitude]),
          type: "point"
        });
        feature.setProperties(point.attr);
        arr.push(feature);
      });
      layer.getSource().addFeatures(arr);
    },

    /***
     * 获取style对象
     * @param feature
     */
    getPointStyle(feature){
      let color;
      switch (feature.get('id') % 3){
        case 0: color = "cyan"; break;
        case 1: color = "orange"; break;
        case 2: color = "yellow"; break;
      }
      return new Style({
        image: new Circle({
          radius: 8,
          stroke: new Stroke({
            color: 'rgba(0, 50, 20, 0.8)',
            width: '1'
          }),
          fill: new Fill({
            color: color,
          })
        })
      })
    },

    /***
     * 点位点击事件
     * @param feature
     */
    onPointClick(feature){
      const attributes = feature.getProperties();
      this.map.getView().animate({
        center: attributes.geometry.flatCoordinates,
        duration: 500,
      });
      console.log(attributes)
      this.highLight(feature);
      this.currentFeature = feature;
      this.setInfoWindow(this.$refs.infoWindow, attributes.geometry.flatCoordinates);
      this.getPointData(attributes.id); //获取点位数据填充信息窗口，如有必要的话
      // this.layers.pointLayer.getSource().refresh();
    },


    /***
     * 根据站点ID查找点位并点击
     * @param id
     */
    findPoint(id){
      const feature = this.layers.pointLayer.getSource().getFeatureById(id);
      if(feature){
        this.onPointClick(feature);
      }
    },

    /***
     * 点位添加波纹
     * 动画效果会覆盖原有的点位图标，设置zIndex没用
     * API原文：
     * Note that since this is an immediate rendering API, any zIndex on the provided style will be ignored.
     */
    highLight(){

      const duration = 2000;
      let start = new Date().getTime();

      this.highLightKey = this.layers.pointLayer.on('postrender', (event)=>{
        const feature = this.currentFeature;

        let vectorContext = getVectorContext(event);
        //style生成
        const flashGeom = feature.getGeometry().clone();
        const elapsed = event.frameState.time - start;
        const elapsedRatio = elapsed / duration;
        // radius will be 5 at start and 30 at end.
        const radius = easeOut(elapsedRatio) * 20 + 5;
        const opacity = easeOut(1 - elapsedRatio);
        const style = new Style({
          image: new Circle({
            radius: radius,
            stroke: new Stroke({
              color: 'rgba(0, 255, 0, ' + opacity + ')',
              width: 0.1 + opacity
            }),
            fill: new Fill({
              color: 'rgba(0, 255, 0, ' + (opacity/3) + ')',
            })
          })
        });
        vectorContext.setStyle(style);
        vectorContext.drawGeometry(flashGeom);
        //设置重复运行
        if (elapsed > duration) {
          start = new Date().getTime();
        }
        this.map.render();
      });
    },

    /***
     * 设置点位悬浮窗
     * @param el
     * @param coords
     */
    setInfoWindow(el, coords){
      this.infoWindow = new Overlay({
        element: el,
        autoPan: true,
        autoPanAnimation: {
          duration: 250
        },
        insertFirst: false,
        offset: [30, -100]
      });
      this.map.addOverlay(this.infoWindow);
      this.infoWindow.setPosition(coords);
    },

    /**
     * 关闭点位窗口
     * */
    closeInfoWindow(){
      this.infoWindow.setPosition(undefined);
      this.infoWindow = null;
      unByKey(this.highLightKey);
      this.currentFeature = null;
    },
  }
}