
> web上传文件到阿里云oss

基于vue2.0的上传页面，采用分片上传
![img](https://diycode.b0.upaiyun.com/photo/2017/0e11af972a262b19c8f38df754c88348.png)
>作者：Nix，博客:[www.iamtaoxin.com](http://www.iamtaoxin.com)

[源码](https://github.com/taosin/alioss-js-upload/tree/2.0)
[demo](http://imocco.coding.me/alioss-demo/)
**关乎H5直传的demo，在h5-direct分支；[h5-direct](https://github.com/taosin/alioss-js-upload/tree/h5-direct)


#### 注： 具体配置方法可参照 [vue页面使用阿里oss上传功能（一）](http://www.iamtaoxin.com/2017/05/24/vue页面使用阿里oss上传功能-一/)  和 [vue页面使用阿里oss上传图片功能(二)](http://www.iamtaoxin.com/2017/05/24/vue页面使用阿里oss上传图片功能-二/)
---



**前言**
*本文主要讲述在使用 Vue 开发的过程中，使用到阿里云 [OSS](https://help.aliyun.com/document_detail/31886.html) 功能。*


**源码**
github: [alioss-js-upload](https://github.com/taosin/alioss-js-upload/tree/2.0) ，源码在分支2.0


**Useage**
```
$ git clone https://github.com/taosin/alioss-js-upload.git   //克隆到本地
$ cd alioss-js-upload        
$ npm install             //安装依赖
$ node index.js      //启动server
$ cd public      
$ npm install
$ npm run dev     //启动本地前端
```


***注意：在使用 OSS 上传之前，需要对 OSS 进行相关配置！！！***

## 阿里云 OSS 控制台配置部分
注册阿里云账号已不需要再赘述，下面主要介绍如何配置 oss ：

*进入控制台，鼠标移到右上角用户名出，点击 `访问权限` ，如下图：*
![图片一](http://blog.xinsay.cn/oss_11.jpg )

*如果没有此功能，可将鼠标移至 `产品` -> `管理与控制` ，点击 `访问控制` 进入访问控制产品页，如下图示：* 
![图片二](http://blog.xinsay.cn/oss_123.png)

##### 1.新建授权策略
* 点击左侧的 `策略管理` -> `新建用户` ， 如下图：
![图片三](http://blog.xinsay.cn/oss_14.jpg)

##### 2.新建授权策略
* 点击左侧的 **策略管理** -> **新建用户** ， 如下图：

![图片四](http://blog.xinsay.cn/oss_15.jpg)

* 在弹出对话框中：选择`授权策略模板（使用空模板）`
* 编辑授权策略并提交：修改 `授权策略名称（自定义名称）`，备注，策略内容，并提交。
**示例**：一个 MNS 授权策略内容模版:
```js
{
   "Statement": [
      {
         "Action": "mns:*",
         "Effect": "Allow",
         "Resource": "acs:mns:*:*:*" 
      }
   ],
   "Version": "1"
}
```
**授权策略**是`json`格式的字符串，其中，
**Action** ： 表示要**授权**的操作， MNS  操作都以`mns:`开头。例如: "mns:SendMessage" 表示 MNS 服务的API：`SendMessage/BatchSenMessage`

**Effect** ： 表示**授权类型**。例如:`Allow`, `Deny`

**Resrouce** : 表示要授权的阿里云资源名 （ARN） ，格式为："acs:<云服务名>: <地域名>: <主账号UID>:<资源URI>"。例如：“acs:mns:cn-hangzhou:123456789:/queues/MyQueue1/messages”

##### 3.授权子账号访问 MNS
* 返回 `用户管理` ,找到第一步创建的**子账号**，点击右侧 `授权`
* 在弹出的对话框中，选择``授权策略名称``，并添加到右侧已选``授权策略``列表，点击 ``确定`` 提交，如下图：
![enter image description here](http://blog.xinsay.cn/add_policy_to_user.jpg)


##### 4.创建角色

* 点击左侧的 `角色管理` -> `新建角色`如下图：
![enter image description here](http://blog.xinsay.cn/oss_13.jpg)

![enter image description here](http://blog.xinsay.cn/oss_16.jpg)


##### 4.授权策略访问角色
* 点击左侧的 `角色管理` ,在右侧的角色列表中选择需要**授权的角色**，点击`授权`，如下图：
![enter image description here](http://blog.xinsay.cn/oss_17.jpg)

##### 5.注意事项
* server 端的代码中 
```js
var sts = new STS({
	accessKeyId: '子账号 accessKeyId',
	accessKeySecret: '子账号 accessKeySecret',
});
```
*注:accessKeyId 和 accessKeySecret 为第一步创建的子用户的 key*

* rolearn
```js
var rolearn = '对应角色的Arn值';
```
* policy
```js
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
		"acs:oss:*:*:BucketName",
		"acs:oss:*:*:BucketName/*"
		]
	}
	]
};
```
*这里的`policy` 必须和之前创建的策略一致。*


------
也可参考：
* [vue页面使用阿里oss上传功能（一）](http://iamtaoxin.com/2017/05/24/vue页面使用阿里oss上传功能-一/)  
* [vue页面使用阿里oss上传图片功能(二)](http://iamtaoxin.com/2017/05/24/vue页面使用阿里oss上传图片功能-二/)

----

至此，文章书写完成，如有疏漏，敬请指出，定虚心更正！
感谢阅读！！！
