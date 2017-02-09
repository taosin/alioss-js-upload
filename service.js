'use strict'

var OSS = require('ali-oss');
var STS = OSS.STS;
var co = require('co');

var sts = new STS({
	accessKeyId: 'LTAI5d5SNCZdsd9n5G',
	accessKeySecret: 'NU9RE6ssRlj5QnQB3LvfjZCsNLzpWAsf',
});
var rolearn = 'acs:ram::1308832347557048:role/ramuploadonly';

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
		"acs:oss:*:*:upload",
		"acs:oss:*:*:upload/*"
		]
	}
	]
};

class Service {

	getOssToken(req, res){
		var result = co(function* () {
			var token = yield sts.assumeRole(rolearn, policy, 15 * 60, 'taoosossss');
			res.json({
				token:token.credentials
			})
		}).catch(function (err) {
		});
	}
}

module.exports = new Service()