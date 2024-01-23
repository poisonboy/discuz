<template>
	<view>
		<view class="file">
			<view class="file-body">
				<view class="file-warp">
					<view class="left">

						<block
							v-if="extension=='xls'||extension=='mp4'||extension=='rar'||extension=='zip'||extension=='mp3'||extension=='ppt'||extension=='docx'||extension=='pdf'||extension=='doc'">
							<image class="image" :src="'/static/'+extension+'.png'">
							</image>
						</block>
						<block v-else>
							<image class="image" :src="'/static/file.png'">
							</image>
						</block>
						<view class="file-info"><text class="name">{{name}}</text>
							<view><text class="dec">{{extension}}</text></view>
						</view>
					</view>
					<view class="right">
						<!-- #ifndef MP-BAIDU -->
						<text class="links" @click="copy(link)">复制链接</text>
						<!-- #endif -->
						
					 
							<text class="down" @click="downFile(link)">点击下载</text>
				 
					</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		name: "nui-file",
		data() {
			return {

			};
		},
		props: {
			extension: {
				type: String,
				default: ''
			},
			name: {
				type: String,
				default: ''
			},
			size: {
				type: String,
				default: ''
			},
			link: {
				type: String,
				default: ''
			},

		},
		methods: {
			copy(value) {
				//提示模板

				//点击复制内容的后调函数
				//uni.setClipboardData方法就是讲内容复制到粘贴板
				// API `setClipboardData` is not yet implemented
				//意思是H5端没有这个接口！！！
				uni.setClipboardData({
					data: value, //要被复制的内容
					success: function() {
						//重点~做笔记
						//在success中加入uni.hideToast()可以解决
						uni.showToast({
							title: '复制成功，粘贴使用',
							duration: 2000,
							icon: 'none'
						});
						//以下就可自定义操作了~
					},
					fail: function(err) {
						uni.showToast({
							title: '复制失败',
							duration: 2000,
							icon: 'none'
						});
					}
				});


			},
			downFile(value) {
				uni.showLoading({
					title: '下载中...'
				})
				setTimeout(function() {
					uni.hideLoading();
				}, 2000);
				//console.log(value)
				let url = value;
				const downloadTask = uni.downloadFile({
					url: url, //仅为示例，并非真实的资源
					success: (res) => {
						if (res.statusCode === 200) {
							//console.log('下载成功');


							uni.showToast({
								icon: 'none',
								mask: true,
								title: '下载成功', //保存路径
								duration: 3000,
							});
						}
						let that = this;
						uni.saveFile({
							tempFilePath: res.tempFilePath, //临时路径
							success: function(res) {
								uni.showToast({
									icon: 'none',
									mask: true,
									title: '文件已保存：' + res.savedFilePath, //保存路径
									duration: 3000,
								});
								setTimeout(() => {
									//打开文档查看
									uni.openDocument({
										filePath: res.savedFilePath,
										success: function(res) {
											// console.log('打开文档成功');
										}
									});
								}, 3000)
							}
						});
					}
				});

				downloadTask.onProgressUpdate((res) => {

					//console.log('下载进度' + res.progress);
					//console.log('已经下载的数据长度' + res.totalBytesWritten);
					//console.log('预期需要下载的数据总长度' + res.totalBytesExpectedToWrite);
				});
			},
			fileClick(value) {
				// 跳转到内部窗口并且传递链接

				var url = `/pages/webview/webview?url=` + value;
				uni.navigateTo({
					url: url
				});
			}
		},


	}
</script>

<style lang="scss">
	.file {
		margin-bottom: 6px;
	}

	.file-body {
		position: relative;
		display: -webkit-box;
		display: flex;
		-webkit-box-pack: justify;
		justify-content: space-between;
		-webkit-box-align: center;
		align-items: center;
		padding: 0 13px;
		height: 50px;
		border-radius: 12px;
		background: #f5f7f8;
		margin: 0 0 8px 0;
	}

	.file-warp {
		width: 100%;
		display: -webkit-box;
		display: flex;
		-webkit-box-align: center;
		align-items: center;
		-webkit-box-pack: justify;
		justify-content: space-between;
	}

	.file-info {
		display: -webkit-box;
		display: flex;
		-webkit-box-orient: vertical;
		-webkit-box-direction: normal;
		flex-direction: column;
		overflow: hidden;
		white-space: nowrap;
		margin-left: 10px;
		margin-right: 8px;
		margin-top: 2px;
		font-size: 12px;
		line-height: 13px;
		-webkit-box-flex: 1;
		flex: 1;
	}

	.left {
		display: flex;
		-webkit-box-align: center;
		align-items: center;
		-webkit-box-flex: 1;
		flex: 1;
		overflow: hidden;

		.image {
			width: 17px;
			height: 20px;
		}

		.info {
			display: flex;
			-webkit-box-orient: vertical;
			-webkit-box-direction: normal;
			flex-direction: column;
			overflow: hidden;
			white-space: nowrap;
			margin-left: 10px;
			margin-right: 8px;
			margin-top: 2px;
			-webkit-box-flex: 1;
			flex: 1;

			.name {
				color: var(--black);
				font-size: 14px;
				display: block;
				overflow: hidden;
				text-overflow: ellipsis;
				line-height: 17px;
			}

		.title  {
			font-size: 16px;
			line-height: 22px;
		
			color: var(--black);
		}
		
		.dec {
			    word-break: break-all;
			    text-overflow: ellipsis;
			    display: -webkit-box;
			    -webkit-box-orient: vertical;
			    -webkit-line-clamp: 3;
			    overflow: hidden;
			    color: #333;
			    font-size: 12px;
		}

			cursor: pointer;
		}
	}

	.right {
		opacity: 0.8;
		min-width: 110px;
		font-size: 12px;

		color: var(--base);
		display: -webkit-box;
		display: flex;
		-webkit-box-pack: end;
		justify-content: flex-end;
		-webkit-box-align: center;
		align-items: center;
		flex-shrink: 0;

		.links {
			cursor: pointer;
		}

		.down {
			cursor: pointer;
			margin-left: 10px;
		}
	}
</style>
