<template>
  <div class="test-input">
    <!--<a-input placeholder="Basic usage" />-->
      <v-select
              :items="items"
              label="Outlined style"
              outlined
              dense
              hide-details
              light
              solo
              v-model="value"
              background-color="#fff"
              color="#fff"
              flat
              @change="handleChange"
      ></v-select>
  </div>
</template>

<script>

  export default {
    name: "TestInput",
    data: () => ({
      items: ['Foo', 'Bar', 'Fizz', 'Buzz'],
      value: 'Foo',
    }),
    methods: {
      handleChange(){
        this.$emit("input", this.value);
      }
    },
    mounted(){
      console.log('12')
    }
  }
</script>

<style scoped lang="scss">
  .test-input{
    width: 120px;
    margin-right: 24px;

    ::v-deep .v-input__control, ::v-deep .v-input__slot {
      min-height: 26px !important;
      height: 26px;
      background: rgba(0,0,0,0.3) !important;
    }
    ::v-deep .v-input__slot fieldset{
      color: rgba(255, 255, 255, 0.4) !important;
    }
    ::v-deep .v-select__selection{
      color: white !important;
    }
  }
</style>