<template>
  <div class="index">
    <div class="oss_file">
      <input type="file" :id="id" @change="doUpload"/>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'hello',
    data () {
      return {
        region: 'oss-cn-shanghai',
        bucket: 'aliyun-oss-upload',
        id: 'upload'
      }
    },
    methods:{
      doUpload () {
        const _this = this
        Vue.axios.get('/alioss/getOssToken').then((result) => {
          const client = new OSS.Wrapper({
            region: _this.region,
            accessKeyId: result.token.AccessKeyId,
            accessKeySecret: result.token.AccessKeySecret,
            stsToken: result.token.SecurityToken,
            bucket: _this.bucket
          })
          const files = document.getElementById(_this.id)
          if (files.files) {
            const fileLen = document.getElementById(_this.id).files
            let resultUpload = ''
            for (let i = 0; i < fileLen.length; i++) {
              const file = fileLen[i]
              const storeAs = file.name
              if (file.size / 1000 > 1000) {
                _this.$Message.warning('图片大小不能超过1M')
                return
              }
              client.multipartUpload(storeAs, file, {
              }).then((results) => {
                if (results) {
                  const url = 'http:/' + results.name
                  _this.Imgurl = url
                } else {
                  this.$Message().error('上传出错啦，再试试！')
                }
              }).catch((err) => {
                console.log(err)
              })
            }
          }
        })
      },
    }
  }
</script>

<style scoped>
</style>
