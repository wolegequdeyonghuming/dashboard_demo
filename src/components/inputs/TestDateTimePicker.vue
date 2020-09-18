<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div class="test-datetime-picker">
    <v-menu transition="scale-transition"
            ref="dialog"
            v-model="modal"
            :return-value.sync="dateTime"
            :close-on-content-click="false">

      <template v-slot:activator="{ on }">
        <v-text-field :label="text"
                      v-model="dateTime"
                      readonly
                      v-on="on"
                      append-icon="mdi-clock"
                      :solo="solo"
                      :dense="dense"
                      :outlined="outlined">
        </v-text-field>
      </template>

      <transition name="slide-x-reverse-transition">
        <v-time-picker
                v-model="time"
                @click:minute="saveTime"
                format="24hr"
                v-if="chooseTime">
        </v-time-picker>
      </transition>

      <v-date-picker
              v-model="date"
              @input="saveDate"
              :allowed-dates="checkAllowed"
              v-if="chooseDate">
      </v-date-picker>

    </v-menu>
  </div>
</template>

<script>
  export default {
    name: "TestDatetimePicker",
    props: {
      value: String,
      text: String,
      format: String,
      solo: {
        type: Boolean,
        default: true
      },
      dense: {
        type: Boolean,
        default: true
      },
      outlined: {
        type: Boolean,
        default: true
      }
    },
    data(){
      return{
        modal: false,
        dateTime: "",
        date: "",
        time: "",
        chooseDate: false,
        chooseTime: false,
        defaultTime: null,
      }
    },
    mounted(){
      this.defaultTime = this.value?new Date(this.value):new Date();
      this.dateTime = this.value || this.dateFormat('yy-MM-dd,HH:mm', this.defaultTime);
      this.date = this.dateFormat('yy-MM-dd', this.defaultTime);
      this.time = this.dateFormat('HH:mm', this.defaultTime);
    },
    methods: {
      checkAllowed(date){
        return new Date(date) <= new Date()
      },
      close(){
        this.chooseDate = false;
        this.chooseTime = false;
        this.modal = false;
      },
      saveDate(){
        this.chooseDate = false;
        this.chooseTime = true;
      },
      saveTime(){
        this.dateTime = this.dateFormat(this.format||'yy-MM-dd,HH:mm', new Date(this.date + " " + this.time));
        this.chooseTime = false;
        this.modal = false;
        this.$refs.dialog.save(this.dateTime)
      },
      dateFormat(fmt, d){
        if(!d) d = new Date();
        var o = {
          "M+" : d.getMonth()+1,
          "d+" : d.getDate(),
          "h+" : d.getHours()%12 == 0 ? 12 : d.getHours()%12,
          "H+" : d.getHours(),
          "m+" : d.getMinutes(),
          "s+" : d.getSeconds(),
          "q+" : Math.floor((d.getMonth()+3)/3),
          "S" : d.getMilliseconds()
        };
        var week = {"0" : "日", "1" : "一", "2" : "二", "3" : "三", "4" : "四", "5" : "五", "6" : "六"};
        if(/(y+)/.test(fmt)){
          fmt=fmt.replace(RegExp.$1, (d.getFullYear()+"").substr(2 - RegExp.$1.length));
        }
        if(/(E+)/.test(fmt)){
          fmt=fmt.replace(RegExp.$1, ((RegExp.$1.length>1) ? (RegExp.$1.length>2 ? "星期" : "周") : "")+week[d.getDay()+""]);
        }
        for(var k in o){
          if(new RegExp("("+ k +")").test(fmt)){
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
          }
        }
        return fmt;
      }
    },
    watch:{
      modal(v) {
        this.chooseTime = false;
        v && (this.chooseDate = true);
      },
      dateTime(){
        this.$emit('input', this.dateTime)
      }
    },
  }
</script>


<style scoped lang="scss">
  .test-datetime-picker{
    width: 240px;
    margin-right: 24px;

    ::v-deep .v-input__control, ::v-deep .v-input__slot {
      min-height: 26px !important;
      height: 26px;
      background: rgba(0,0,0,0.3) !important;
    }
    ::v-deep .v-input__slot fieldset{
      color: rgba(255, 255, 255, 0.4) !important;
    }
    ::v-deep input{
      color: white !important;
    }
    ::v-deep .v-icon{
      color: rgba(255,255,255,0.8) !important;
      font-size: 16px;
      margin-right: -8px;
    }
    ::v-deep .v-input__prepend-outer{
      margin: 0 !important;

    }
  }
</style>