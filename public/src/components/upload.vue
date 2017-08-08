<template>
  <div class="index">
    <div class="oss_file">
      <input type="file" :id="id" @change="doUpload"/>
      {{percentage}}
    </div>
  </div>
</template>

<script>
  export default {
    name: 'upload',
    data () {
      return {
        region: 'oss-cn-hangzhou',
        bucket: 'aliyun-oss-upload',
        id: 'upload',
        percentage: 0
      }
    },
    methods:{
      doUpload () {
        const _this = this
        _this.axios.get('/alioss/getOssToken').then((result) => {
          const client = new OSS.Wrapper({
            region: _this.region,
            accessKeyId: result.data.token.AccessKeyId,
            accessKeySecret: result.data.token.AccessKeySecret,
            stsToken: result.data.token.SecurityToken,
            bucket: _this.bucket
          })
          const files = document.getElementById(_this.id)
          if (files.files) {
            const fileLen = document.getElementById(_this.id).files
            let resultUpload = ''
            for (let i = 0; i < fileLen.length; i++) {
              const file = fileLen[i]
              let random_name = this.random_string(6) + '_' + new Date().getTime() + '.' + file.name.split('.').pop()
              client.multipartUpload(random_name, file, {
                progress: function* (percentage, cpt) {
                  // 上传进度
                  _this.percentage = percentage
                }
              }).then((results) => {
                // 上传完成
                console.log('http://oss-upload.oss-cn-hangzhou.aliyuncs.com/'+ results.name);
              }).catch((err) => {
                console.log(err)
              })
            }
          }
        })
      },

      // 随机生成文件名
      random_string(len) {
        　　len = len || 32;
        　　var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';   
        　　var maxPos = chars.length;
        　　var pwd = '';
        　　for (let i = 0; i < len; i++) {
          　　pwd += chars.charAt(Math.floor(Math.random() * maxPos));
        }
        return pwd;
      }
    }
  }
</script>
