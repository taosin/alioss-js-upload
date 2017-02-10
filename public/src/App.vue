<template>
  <div id="app">
    <upload></upload>
  </div>
</template>

<script>
  import upload from './index.vue'
  export default {
    components: {
      upload
    },
    data () {
      return {
      }
    }
  }
</script>

<style>
  html {
    height: 100%;
  }

  body {
    /*display: flex;
    align-items: center;*/
    height: 100%;
  }


</style>
