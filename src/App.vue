<template>
  <v-app id="app">
    <router-view/>
  </v-app>
</template>

<style lang="scss">
#app {
  background-color: black;
  color: white;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>

<style>
  * {
    box-sizing: border-box;
  }

  .mdi{
    font-size: 20px;
  }

  .province-overlay{
    background-color: rgba(0,0,0,0.6);
    font-size: 12px;
    color: rgba(255,255,255,0.8);
    padding: 4px 8px;
    border-radius: 3px;
  }
</style>
