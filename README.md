> web上传文件到阿里云oss

基于vue2.0的上传页面，采用分片上传

[源码](https://github.com/taosin/alioss-js-upload)

#Install
* 1.git clone 
```bash
git clone https://github.com/taosin/alioss-js-upload.git
```
* 2.npm install
```bash
cd alioss-js-upload
```
* 3.node index.js
```bash
node index.js
```
* 4.npm install
```bash
cd public
```
* 5. npm run dev
```bash
npm run dev
```
------

#### 注： 具体配置方法可参照 [vue页面使用阿里oss上传功能（一）](http://iamtaoxin.com/2017/05/24/vue页面使用阿里oss上传功能-一/)  和 [vue页面使用阿里oss上传图片功能(二)](http://iamtaoxin.com/2017/05/24/vue页面使用阿里oss上传图片功能-二/)
---

* 1.前端页面中引入oss-sdk
```html
<script src="http://gosspublic.alicdn.com/aliyun-oss-sdk-4.4.4.min.js"></script>
```
* 2. 前端上传组件代码在 `public/src/components/upload.vue`中，主要如下：
```javascript
export default {
    name: 'upload',
    data () {
      return {
        region: '你的ossRegion',
        bucket: '你的ossBucket',
        id: 'id',
        percentage: 0   // 上传进度
      }
    }
}
```

* 3.server端（`service.js`）需要修改的代码如下：
```node
var sts = new STS({
	accessKeyId: '你的accessKeyId',
	accessKeySecret: '你的accessKeySecret',
});
var rolearn = '你的rolearn';

var policy = {
	"Version": "1",
	"Statement": [
	{
		"Effect": "Allow",
		"Action": [
		"oss:GetObject",
		"oss:PutObject"
		],
		"Resource": [
		"acs:oss:*:*:oss-upload",
		"acs:oss:*:*:oss-upload/*"
		]
	}
	]
};
```
End