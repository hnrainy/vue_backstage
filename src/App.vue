<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
#app,
body {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background-color: black !important;
  color: rgba(0, 0, 0, 0.65);
  font-size: 14px;
}
</style>
