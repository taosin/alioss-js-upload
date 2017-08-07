<template>
  <div id="app">
    <router-view></router-view>
    <upload></upload>
  </div>
</template>

<script>
  import upload from './components/upload'
  export default {
    name: 'app',
    components:{
      upload
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
