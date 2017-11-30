<template>
  <div class="index">
    <div class="oss_file">
      <input type="file" :id="id" @change="doUpload"/>
      <hr> 
      <p>
        上传进度：{{percentage}}
      {{percentage===1?"success!":(percentage===0?'waiting...':'uploading')}}
      </p>
      <hr>
      <ul>
        <li v-for="u in urls">{{u}}</li>
      </ul>
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
        percentage: 0,
        url:'',
        urls:[]
      }
    },
    methods:{
      doUpload () {
        const _this = this
        const urls = [];
        _this.axios.get('http://106.15.89.254:8188/alioss/getOssToken').then((result) => {
          const client = new OSS.Wrapper({
            region: _this.region,
            accessKeyId: result.data.data.AccessKeyId,
            accessKeySecret: result.data.data.AccessKeySecret,
            stsToken: result.data.data.SecurityToken,
            bucket: _this.bucket
          })
          _this.percentage = 0;
          const files = document.getElementById(_this.id)
          if (files.files) {
            const fileLen = document.getElementById(_this.id).files
            let resultUpload = ''
            for (let i = 0; i < fileLen.length; i++) {
              const file = fileLen[i]
              // 随机命名
              let random_name = this.random_string(6) + '_' + new Date().getTime() + '.' + file.name.split('.').pop()

              // 上传
              client.multipartUpload(random_name, file, {
                progress: function* (percentage, cpt) {
                  // 上传进度
                  _this.percentage = percentage
                }
              }).then((results) => {
                // 上传完成
                const url = 'http://oss-upload.oss-cn-hangzhou.aliyuncs.com/'+ results.name;
                _this.url = url;
                console.log(url);
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
    },
    watch:{
      url(val){
        if(val){
        this.urls.push(val);
        }
      }
    }
  }
</script>
