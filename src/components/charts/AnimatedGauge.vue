<template>
  <div ref="chart" :style="{width: width + 'px', height: height + 'px'}"></div>
</template>

<script>
  import echarts from 'echarts';

  export default {
    name: "AnimatedGauge",
    props: {
      value: {
        type: Number,
        default: 50,
        required: true
      },
      height: {
        type: Number,
        default: 200,
        required: true
      },
      width: {
        type: Number,
        default: 200,
        required: true
      }
    },
    data(){
      return {
        angle: 0,

        chart: null,
        animationInterval: null,
      }
    },
    methods: {
      draw(){
        this.angle = this.angle + 3;
        this.chart.setOption(this.option, true)
      },
      getCirlPoint(x0, y0, r, angle) {
        let x1 = x0 + r * Math.cos(angle * Math.PI / 180);
        let y1 = y0 + r * Math.sin(angle * Math.PI / 180);
        return {
          x: x1,
          y: y1
        }
      },
    },
    computed: {
      option(){
        return {
          backgroundColor:"transparent",
          title: {
            text: '{a|'+ this.value +'}{c|%}',
            x: 'center',
            y: 'center',
            textStyle: {
              rich:{
                a: {
                  fontSize: 48,
                  color: '#29EEF3'
                },
                c: {
                  fontSize: 20,
                  color: '#ffffff',
                }
              }
            }
          },
          series: [
            {
            name: "ring5",
            type: 'custom',
            coordinateSystem: "none",
            renderItem: (params, api)=> {
              return {
                type: 'arc',
                shape: {
                  cx: api.getWidth() / 2,
                  cy: api.getHeight() / 2,
                  r: Math.min(api.getWidth(), api.getHeight()) / 2 * 0.8,
                  startAngle: (0 + this.angle) * Math.PI / 180,
                  endAngle: (90 + this.angle) * Math.PI / 180
                },
                style: {
                  stroke: "#0CD3DB",
                  fill: "transparent",
                  lineWidth: 1.5
                },
                silent: true
              };
            },
            data: [0]
          },
            {
            name: "ring5",
            type: 'custom',
            coordinateSystem: "none",
            renderItem: (params, api)=> {
              return {
                type: 'arc',
                shape: {
                  cx: api.getWidth() / 2,
                  cy: api.getHeight() / 2,
                  r: Math.min(api.getWidth(), api.getHeight()) / 2 * 0.8,
                  startAngle: (180 + this.angle) * Math.PI / 180,
                  endAngle: (270 + this.angle) * Math.PI / 180
                },
                style: {
                  stroke: "#0CD3DB",
                  fill: "transparent",
                  lineWidth: 1.5
                },
                silent: true
              };
            },
            data: [0]
          },
            {
            name: "ring5",
            type: 'custom',
            coordinateSystem: "none",
            renderItem: (params, api)=> {
              return {
                type: 'arc',
                shape: {
                  cx: api.getWidth() / 2,
                  cy: api.getHeight() / 2,
                  r: Math.min(api.getWidth(), api.getHeight()) / 2 * 0.85,
                  startAngle: (270 +- this.angle) * Math.PI / 180,
                  endAngle: (40 +- this.angle) * Math.PI / 180
                },
                style: {
                  stroke: "#0CD3DB",
                  fill: "transparent",
                  lineWidth: 1.5
                },
                silent: true
              };
            },
            data: [0]
          },
            {
            name: "ring5",
            type: 'custom',
            coordinateSystem: "none",
            renderItem: (params, api)=> {
              return {
                type: 'arc',
                shape: {
                  cx: api.getWidth() / 2,
                  cy: api.getHeight() / 2,
                  r: Math.min(api.getWidth(), api.getHeight()) / 2 * 0.85,
                  startAngle: (90 +- this.angle) * Math.PI / 180,
                  endAngle: (220 +- this.angle) * Math.PI / 180
                },
                style: {
                  stroke: "#0CD3DB",
                  fill: "transparent",
                  lineWidth: 1.5
                },
                silent: true
              };
            },
            data: [0]
          },
            {
            name: "ring5",
            type: 'custom',
            coordinateSystem: "none",
            renderItem: (params, api)=> {
              let x0 = api.getWidth() / 2;
              let y0 = api.getHeight() / 2;
              let r = Math.min(api.getWidth(), api.getHeight()) / 2 * 0.85;
              let point = this.getCirlPoint(x0, y0, r, (90 +- this.angle));
              return {
                type: 'circle',
                shape: {
                  cx: point.x,
                  cy: point.y,
                  r: 4
                },
                style: {
                  stroke: "#0CD3DB",//粉
                  fill: "#0CD3DB"
                },
                silent: true
              };
            },
            data: [0]
          },
            {
            name: "ring5",  //绿点
            type: 'custom',
            coordinateSystem: "none",
            renderItem: (params, api)=> {
              let x0 = api.getWidth() / 2;
              let y0 = api.getHeight() / 2;
              let r = Math.min(api.getWidth(), api.getHeight()) / 2 * 0.85;
              let point = this.getCirlPoint(x0, y0, r, (270 +- this.angle));
              return {
                type: 'circle',
                shape: {
                  cx: point.x,
                  cy: point.y,
                  r: 4
                },
                style: {
                  stroke: "#0CD3DB",      //绿
                  fill: "#0CD3DB"
                },
                silent: true
              };
            },
            data: [0]
          },
            {
              name: '环形进度条',
              type: 'pie',
              radius: ['76%', '60%'],
              silent: true,
              clockwise: true,
              startAngle: 90,
              z: 0,
              zlevel: 0,
              label: {
                normal: {
                  position: "center",

                }
              },
              data: [{
                value: this.value,
                name: "",
                itemStyle: {
                  normal: {
                    color: { // 完成的圆环的颜色
                      colorStops: [{
                        offset: 0,
                        color: '#4FADFD' // 0% 处的颜色
                      }, {
                        offset: 1,
                        color: '#28E8FA' // 100% 处的颜色
                      }]
                    },
                  }
                }
              }, {
                  value: 100 - this.value,
                  name: "",
                  label: {
                    normal: {
                      show: false
                    }
                  },
                  itemStyle: {
                    normal: {
                      color: "#173164"
                    }
                  }
                }
              ]
            },
            {
              name: "",
              type: "gauge",
              radius: "76%",
              center: ['50%', '50%'],
              startAngle: 0,
              endAngle: 359.9,
              splitNumber: 8,
              hoverAnimation: true,
              axisTick: {
                show: false
              },
              splitLine: {
                length: "24%",
                lineStyle: {
                  width: 4,
                  color: "#13264c"
                }
              },
              axisLabel: {
                show: false
              },
              pointer: {
                show: false
              },
              axisLine: {
                lineStyle: {
                  opacity: 0
                }
              },
              detail: {
                show: false
              },
              data: [{
                value: 0,
                name: ""
              }]
            },
          ],
          grid: {
            top: '0%',
            left: '10%',
            bottom: '0%',
            right: '10%',
          }
        };
      }
    },
    watch: {
      value(){

      },
      height(){
        if(this.chart){
          this.chart.resize();
        }
      }
    },
    mounted(){
      this.chart = echarts.init(this.$refs.chart);
      this.chart.setOption(this.option);

      this.animationInterval = setInterval(()=> {
        this.draw()
      }, 100);
    },
    destroyed(){
      clearInterval(this.animationInterval);
      this.animationInterval = null;
    }
  }
</script>

<style scoped>

</style>