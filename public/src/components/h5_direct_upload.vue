<template>
  <div class="list">
      <input type="file" @change="upload">
  </div>
</template>
<script>
var co = require("co");
var OSS = require("ali-oss");
export default {
  methods: {
    upload(event) {
      var client = new OSS({
        region: "your region",
        accessKeyId: "your accessKeyId",
        accessKeySecret: "your accessKeySecret",
        bucket: "your bucket"
      });
      var file = event.currentTarget.files[0];
      co(function*() {
        var result = yield client.multipartUpload(
          file.name,
          file);
        console.log(result);
      }).catch(function(err) {
        console.log(err);
      });
    }
  }
};
</script>