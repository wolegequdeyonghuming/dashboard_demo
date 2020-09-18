<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div class="test-date-picker" style="display: inline-block">
    <v-menu
            v-model="showDatePicker"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="290px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
                v-model="dateRangeText"
                label="日期选择"
                append-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
                dense
                solo
                hide-details
                outlined
                color="white"
        ></v-text-field>
      </template>
      <v-date-picker v-model="date" @input="onChange" range></v-date-picker>
    </v-menu>
  </div>
</template>

<script>
  export default {
    name: "TestDateRanger",
    data: ()=>({
      showDatePicker: false,
      date: [],
    }),
    methods:{
      onChange(){
        this.date.sort((a, b)=>{
          return new Date(a) - new Date(b);
        });
        this.$emit("input", this.date);
      }
    },
    computed:{
      dateRangeText () {
        return this.date.join(' ~ ')
      },
    }
  }
</script>

<style scoped lang="scss">
  .test-date-picker{
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