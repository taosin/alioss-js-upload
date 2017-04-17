<template>
  <div id="app">
    <h5>阿里OSS上传</h5>
    <div class="upload">
      <upload :id="id" :multiple="true" :url.sync="urls" :bucket-url="bucketUrl"></upload>
    </div>
    <h5>七牛上传</h5>
    <div class="upload">
      <qiniu :uploadurl.sync="uploadurl" :max.sync="max" :pickfiles = "pickfiles" :container = "container"></qiniu>
    </div>
    <div class="img-lists">
      <img :src="url" v-for="url in urls">
    </div>
  </div>
</template>

<script>
  import upload from './index.vue'
  import qiniu from './qiniu_upload.vue'
  export default {
    components: {
      upload,
      qiniu
    },
    data () {
      return {
        id:'uploadid',
        bucketUrl:'http://xgou-web-upload.oss-cn-shanghai.aliyuncs.com/',
        urls:[],
        uploadurl:[],
        max:2,
        pickfiles:'pickfiles',
        container:'container'
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
    text-align: center;
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
