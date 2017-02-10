<template>
  <div id="app">
    <div class="upload">
      <upload :id="id" :multiple="true" :url.sync="urls" :bucket-url="bucketUrl"></upload>
    </div>
    <div class="img-lists">
      <img :src="url" v-for="url in urls">
    </div>
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
        id:'uploadid',
        bucketUrl:'bucketUrl',
        urls:[]
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
    padding: 10px;
  }

  .upload{
      border: 1px solid #ddd;
      width: 100px;
      height: 100px;
      margin: 0 auto;
      border-radius: 4px;
      background: url('./add_upload.png');
      background-size: contain;
  }
  .upload:hover{
    opacity: 0.8;
    border: 1px solid #ddd;
  }
</style>
