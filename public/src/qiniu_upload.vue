<style type="text/css">
	.xg-upload{
		width: 100%;
	}
	.xg-upload-pickfiles{
		width: 100px;
		height: 100px;
		border:1px dashed #ddd;
		/*float: left;*/
		/*margin-right: 15px;*/
		cursor: pointer;
	}
	.xg-upload-pickfiles img{
		width: 98px;
		height: 98px;
	}
	.xg-upload-container{
		float: left;
	}
	.xg-upload-pickfiles-lists{
		float: left;
		text-align: center;
		width: 100px;
		margin-right: 10px;
	}
	.xg-upload-pickfiles-lists a{
		cursor: pointer;
	}

</style>
<template>
	<div class="xg-upload">
		<div class="xg-upload-pickfiles-lists" v-for="n in uploadurl.length" v-if="
		uploadurl.length>0">
			<div class="xg-upload-pickfiles">
				<img :src="uploadurl[n]">
			</div>
			<a @click="del($index)">删除</a>
		</div>
		<div :id="container" class="xg-upload-container">
			<div class="xg-upload-pickfiles" :id="pickfiles" v-if="uploadurl.length < max">
				<img src="./add_upload.png">
			</div>
		</div>
	</div>
</template>
<script>
// import { uptokenUrl, doMain } from './../../static/js/qiniuconfig.js';
	module.exports = {
		props:{
			max:{
				type:Number,
				twoWay:true
			}, 
			uploadurl:{
				type: Array,
				twoWay:false,
			},
			container:{
				type: String,
				twoWay:false
			},
			pickfiles:{
				type: String,
				twoWay:false
			}
		},
		data(){
			return{
			};
		},
		attached(){
			this.qiniu();
		},
		methods:{

			qiniu(){
				const self = this;
				const uploader = Qiniu.uploader({
					runtimes: 'html5,flash,html4',
					browse_button: self.pickfiles,
					container: self.container,
					drop_element: 'container',
					max_file_size: '100mb',
					flash_swf_url: 'js/plupload/Moxie.swf',
					dragdrop: false,
					chunk_size: '10mb',
					uptoken_url: uptokenUrl,
					domain: doMain,
					get_new_uptoken: false,
					auto_start: true,
					multi_selection:true,
					filters : {
						max_file_size : '100mb',
						prevent_duplicates: true,
						mime_types: [
                			{ title : 'Image files', extensions : 'JPEG,jpg,png' }, // 限定jpg,gif,png后缀上传
                			]
                		},
                		init: {
                        // 'FilesAdded': function (up, files) {
                        //     $('table').show();
                        //     $('#success').hide();
                        //     plupload.each(files, function (file) {
                        //     });
                        // },
                        // BeforeUpload(up, file) {
                        // },
                        // 'UploadProgress': function (up, file) {

                        // },
                        // 'UploadComplete': function () {

                        // },
                        FileUploaded(up, file, info) {
                        	const domain = up.getOption('domain');
                        	const res = JSON.parse(info);
                        	const sourceLink = domain + res.key;
                        	self.uploadurl.push(sourceLink);
                        	console.info(self.uploadurl);
                        },
                        Error(up, err, errTip) {
                            // $('table').show();
                            // const progress = new FileProgress(err.file, 'fsUploadProgress');
                            // progress.setError();
                            // progress.setStatus(errTip);
                        }
                    }
                });
			},
			del(index){
				this.uploadurl.splice(index, 1);
			}
		}
	};
</script>