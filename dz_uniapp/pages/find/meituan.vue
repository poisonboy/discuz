<template>
	<view class="">
		<scroll-view scroll-x class="nav text-center" :style="{backgroundColor:(TabCur== '外卖'?'#FEBD0B':'#F67329')}">
			<view class="cu-item text-bold" :class="item.title==TabCur?'text-white cur':''"
				v-for="(item,index) in tabbar" :key="index" @tap="tabSelect(item)" :data-id="index">
				{{item.title}}
			</view>
		</scroll-view>

		<view v-if="TabCur== '外卖'?true:''" style="padding-bottom: 50upx;">
			<image src="https://game.shengqianxiong.com.cn/img/20210519/efe6283d4db849e9a744982c188112c0.png"
				class="top_view_image"></image>
			<view class="center_view">
				<image src="../../static/img/meituan/meituanjianbian.png" class="center_view_backgroundImage"></image>
				<view class="center_view_item">
					<view style="display: flex;">
						<image src="../../static/img/meituan/meituanlogo.png" class="logo"></image>
						<view class="logo_text">美团外卖返利</view>
					</view>

					<view class="view_item_jieshao">
						<view>
							<image src="../../static/img/meituan/lingjuan.png" class="jieshao_image"></image>
							<view class="jieshao_text">先领券</view>
						</view>
						<image class="jieshao_right" src="../../static/img/meituan/xiangyou.png"></image>
						<view>
							<image src="../../static/img/meituan/xiadan.png" class="jieshao_image"></image>
							<view class="jieshao_text">再下单</view>
						</view>
						<image src="../../static/img/meituan/xiangyou.png" class="jieshao_right"></image>
						<view>
							<image src="../../static/img/meituan/fanli.png" class="jieshao_image"></image>
							<view class="jieshao_text">享优惠</view>
						</view>
					</view>

					<view class="youhui_view">
						<image src="https://tk.gomyorder.cn/img/20210705/ba5a72a350c8428da379a817af505e36.png"
							class="youhui_image"></image>

					</view>

					<view class="Hongbao" @tap="goHongbao">领红包点外卖</view>
					<view class="flex justify-around">
						<button @click="copy('http://dpurl.cn/W5nt0GQz')" class="cu-btn text-bold round lg"
							style="padding: 0px 70rpx;font-size: 30rpx;background: linear-gradient(0deg, #FFB447 0%, #FFE59F 100%);color: #6C3906;">分享文案</button>
						<!-- #ifndef MP-WEIXIN -->

						<button @click.stop="saveImgToLocal()" class="cu-btn text-bold round lg"
							style="padding: 0px 70rpx;font-size: 30rpx;background: linear-gradient(0deg, #FFB447 0%, #FFE59F 100%);color: #6C3906;">生成海报</button>
						<!-- #endif -->
						<!-- #ifdef MP-WEIXIN -->
						<button open-type="share" class="cu-btn text-bold round lg"
							style="padding: 0px 70rpx;font-size: 30rpx;background: linear-gradient(0deg, #FFB447 0%, #FFE59F 100%);color: #6C3906;">分享好友</button>
						<!-- #endif -->

					</view>
				</view>
			</view>


			<view class="fanli_view">
				<view class="zhuyi">注意事项</view>
				<view class="item_view">
					<view class="yuan"></view>
					<view class="text">美团外卖，必须使用带渠道专享标记的优惠券有</view>
				</view>
				<view class="item_view">
					<view class="yuan"></view>
					<view class="text">领券后在红包有效期内下单均有。</view>
				</view>
				<view class="item_view">
					<view class="yuan"></view>
					<view class="text">收货后半小时内会有通知提醒</view>
				</view>
				<view class="item_view">
					<view class="yuan"></view>
					<view class="text">无论美团新老用户，每个手机号每天可领一次，红包金额随机发放</view>
				</view>
			</view>

			<view class="cu-modal" :class="modalName=='Modal'?'show':''">
				<view class="cu-dialog">
					<view class="cu-bar bg-white justify-end">
						<view class="content">长按复制分享给好友</view>
						<view class="action" @tap="hideModal">
							<text class="nui-icon-x nui-icon-class niceicons text-red"></text>
						</view>
					</view>
					<view class="padding">
						<text user-select='true' selectable="true"
							style="width: 100%;word-break: break-all;">{{ fenxiang }}</text>
					</view>
				</view>
			</view>
			<canvas canvas-id="poster" class="poster_canvas"></canvas>
		</view>

		<view v-if="TabCur== '生鲜'?true:''" style="padding-bottom: 50upx;background-color: #F67329;">
			<image src="https://game.shengqianxiong.com.cn/img/20210519/a7aca4b29153426e98a0f386bc7a4611.png"
				class="top_view_image"></image>
			<view class="center_view">
				<image src="../../static/img/meituan/jianbian.png" class="center_view_backgroundImage"></image>
				<view class="center_view_item">
					<view style="display: flex;">
						<image src="../../static/img/meituan/meituanlogo.png" class="logo"></image>
						<view class="logo_text">美团商超生鲜</view>
					</view>

					<view class="view_item_jieshao">
						<view>
							<image src="../../static/img/meituan/xianlingjuan.png" class="jieshao_image"></image>
							<view class="jieshao_text">先领券</view>
						</view>
						<image class="jieshao_right" src="../../static/img/meituan/right.png"></image>
						<view>
							<image src="../../static/img/meituan/xiadan1.png" class="jieshao_image"></image>
							<view class="jieshao_text">再下单</view>
						</view>
						<image src="../../static/img/meituan/right.png" class="jieshao_right"></image>
						<view>
							<image src="../../static/img/meituan/fanli1.png" class="jieshao_image"></image>
							<view class="jieshao_text">享优惠</view>
						</view>
					</view>

					<view class="youhui_view">
						<image src="https://tk.gomyorder.cn/img/20210705/b670c828ce0e407ba0f9c4f5b416ddff.png"
							class="youhui_image"></image>

					</view>

					<view class="Hongbao" @tap="goHongbao">领红包点外卖</view>
					<view class="flex justify-around">
						<button @click="copy('http://dpurl.cn/W5nt0GQz')" class="cu-btn text-bold round lg"
							style="padding: 0px 70rpx;font-size: 30rpx;background: linear-gradient(0deg, #FFB447 0%, #FFE59F 100%);color: #6C3906;">分享文案</button>

						<!-- #ifndef MP -->

						<button @click="saveImgToLocal()" class="cu-btn text-bold round lg"
							style="padding: 0px 70rpx;font-size: 30rpx;background: linear-gradient(0deg, #FFB447 0%, #FFE59F 100%);color: #6C3906;">生成海报</button>
						<!-- #endif -->
						<!-- #ifdef MP -->
						<button open-type="share" class="cu-btn text-bold round lg"
							style="padding: 0px 70rpx;font-size: 30rpx;background: linear-gradient(0deg, #FFB447 0%, #FFE59F 100%);color: #6C3906;">分享好友</button>
						<!-- #endif -->
					</view>
				</view>
			</view>


			<view class="fanli_view">
				<view class="zhuyi">注意事项</view>
				<view class="item_view">
					<view class="yuan"></view>
					<view class="text">美团外卖，必须使用带渠道专享标记的优惠券</view>
				</view>
				<view class="item_view">
					<view class="yuan"></view>
					<view class="text">领券后在红包有效期内下单</view>
				</view>
				<view class="item_view">
					<view class="yuan"></view>
					<view class="text">收货后半小时内会有通知提醒</view>
				</view>
				<view class="item_view">
					<view class="yuan"></view>
					<view class="text">无论美团新老用户，每个手机号每天可领一次，红包金额随机发放</view>
				</view>
			</view>

			<view class="cu-modal" :class="modalName=='Modal'?'show':''">
				<view class="cu-dialog">
					<view class="cu-bar bg-white justify-end">
						<view class="content">长按复制分享给好友</view>
						<view class="action" @tap="hideModal">
							<text class="nui-icon-x nui-icon-class niceicons text-red"></text>
						</view>
					</view>
					<view class="padding">
						<text user-select='true' selectable="true"
							style="width: 100%;word-break: break-all;">http://dpurl.cn/W5nt0GQz</text>
					</view>
				</view>
			</view>
		 
		</view>

	</view>
</template>

<script>
	//import configdata from '../../common/config.js';
	let settingWritePhotosAlbum = false;
	export default {
		data() {
			return {
				releationId: 0,
				shareUrl: '',
				activityId: '',
				url: '',
				hbImage: '',
				sxImage: '',
				bgImg: '',
				modalName: '',
				TabCur: '外卖',
				tabbar: [{
						title: '外卖',
						value: 127
					},
					{
						title: '生鲜',
						value: 132
					}
				],
				activityId: '',
				fenxiang: '',
				checkModel: '是',
				wenan: ''
			}
		},
		onLoad(opction) {

			switch (opction.title) {
				case '美团外卖':
					this.TabCur = '外卖'
					this.activityId = 127
					break;
				case '美团生鲜':
					this.TabCur = '生鲜'
					this.activityId = 132
					break;
			}

		},
		methods: {
			copy(value) {
				//提示模板
				uni.showModal({
					content: value, //模板中提示的内容
					confirmText: "点击复制",
					success: () => { //点击复制内容的后调函数
						//uni.setClipboardData方法就是讲内容复制到粘贴板
						uni.setClipboardData({
							data: value, //要被复制的内容
							success: () => { //复制成功的回调函数
								uni.showToast({ //提示
									title: "复制成功，快去分享给好友吧！"
								})
							}
						});
					}
				});
			},
			//切换navbar
			tabSelect(e) {
				this.TabCur = e.title
				this.activityId = e.value
			 
			},

			//关闭弹框
			hideModal(e) {
				this.modalName = null
			},


			goHongbao() {
				// #ifdef MP-WEIXIN
				uni.navigateToMiniProgram({
					appId: 'wxde8ac0a21135c07d',
					path: '/index/pages/h5/h5?f_userId=1&f_token=1&s_cps=1&weburl=https%3A%2F%2Fdpurl.cn%2FW5nt0GQz',
					fail(res) {
						console.error(res)
					}
				})
				// #endif

				// #ifdef H5
				window.location.href = 'http://dpurl.cn/W5nt0GQz';
				//#endif

				// #ifdef APP-PLUS
				// url=' + meituanOpen  + '' + relation_id 
				uni.navigateTo({
					url: '/pages/webview/webview?url=http://dpurl.cn/W5nt0GQz'
				});
				// #endif
			},
			//获取背景图
			saveImgToLocal: function(e) {

				uni.showModal({
					title: '提示',
					content: '确定保存到相册吗',
					success: function(res) {
						if (res.confirm) {

							uni.downloadFile({
								url: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-b75adcc0-9db8-4e32-b53d-4af9957454d1/c4dca9b2-7ea8-47ff-b9c0-30cd72bd3470.jpeg', //图片地址
								success: (res) => {
									if (res.statusCode === 200) {
										uni.saveImageToPhotosAlbum({
											filePath: res.tempFilePath,
											success: function() {
												uni.showToast({
													title: "保存成功",
													icon: "none"
												});
											},
											fail: function() {
												uni.showToast({
													title: "保存失败",
													icon: "none"
												});
											}
										});
									}
								}
							})


						} else if (res.cancel) {

						}
					}
				});

			}
		},
		config: function(name) {
			var info = null;
			if (name) {
				var name2 = name.split("."); //字符分割
				if (name2.length > 1) {
					info = configdata[name2[0]][name2[1]] || null;
				} else {
					info = configdata[name] || null;
				}
				if (info == null) {
					let web_config = cache.get("web_config");
					if (web_config) {
						if (name2.length > 1) {
							info = web_config[name2[0]][name2[1]] || null;
						} else {
							info = web_config[name] || null;
						}
					}
				}
			}
			return info;
		},
	}
</script>

<style lang="scss">
	@import "/static/colorui/main.css";

	page {
		background: #FEBD0B;
	}

	.poster_canvas {
		width: 750upx;
		height: 1334upx;
		position: fixed;
		top: -10000upx;
		left: 0;
	}

	.top_view_image {
		width: 750upx;
		height: 438upx;
		background-size: 100%;
	}

	.center_view {
		height: 650upx;
		margin: 0 32upx;
		margin-top: -7upx;
	}

	.fanli_view {
		width: 686upx;
		height: 492upx;
		background: #FFFFFF;
		border-radius: 20upx;
		margin: 20upx 32upx;
		text-align: center;

		.zhuyi {
			font-size: 30upx;
			color: #333333;
			font-weight: bold;
			padding-top: 23upx;
		}

		.item_view {
			display: flex;
			margin-left: 31upx;
			margin-top: 38upx;
			text-align: left;
		}

		.yuan {
			width: 12upx;
			height: 12upx;
			background: #FCCF17;
			border-radius: 50%;
			margin-top: 13upx;
		}

		.yuan1 {
			width: 12upx;
			height: 12upx;
			background: #F67329;
			border-radius: 50%;
			margin-top: 13upx;
		}

		.text {
			font-size: 24upx;
			font-weight: 600;
			color: #3E393E;
			margin-left: 15upx;
		}
	}

	.btn_view {
		height: 80upx;
		display: flex;
		margin: 32upx;

		.btn_view1 {
			width: 680upx;
			height: 80upx;
			background: #FF1A1F;
			border-radius: 8upx;
			font-size: 30upx;
			color: #FFFFFF;
			text-align: center;
			line-height: 80upx;
		}

		.btn_view2 {
			width: 327upx;
			height: 80upx;
			background: #FFFFFF;
			border-radius: 8upx;
			font-size: 30upx;
			color: #333333;
			text-align: center;
			margin-left: 32upx;
			line-height: 80upx;
		}
	}

	.center_view_backgroundImage {
		width: 686upx;
		height: 650upx;
		background-size: 100%;
		position: absolute;
		border-radius: 12px;
	}

	.center_view_item {
		position: absolute;
		margin-left: 30upx;

		.Hongbao {
			text-align: center;
			line-height: 80upx;
			font-weight: bold;
			margin: 27upx 20upx;
			width: 594rpx;
			height: 80upx;
			background: linear-gradient(0deg, #FFB447 0%, #FFE59F 100%);
			border-radius: 40px;
			font-size: 30upx;
			color: #6C3906;
		}

		.youhui_view {
			width: 638upx;
			height: 175upx;
			margin-top: 37upx;

			.item_view {
				position: absolute;
				display: flex;
				margin: 50upx;
				width: 100%;
			}

			.youhui_image {
				width: 638upx;
				height: 175upx;
				position: absolute;
				background-size: 100%;
			}

			.item_name {
				font-size: 30upx;
				color: #6C3906;
				font-weight: 800;
			}

			.zuigao {
				font-size: 24upx;
				color: #333333;
				font-weight: bold;
				margin-top: 10upx;
			}

			.item_zhekou {
				font-size: 20upx;
				color: #FDBF60;
				margin-top: 10upx;
				font-weight: 500;
			}
		}

		.logo {
			width: 64upx;
			height: 65upx;
		}

		.logo_text {
			font-size: 30upx;
			color: #6C3906;
			font-weight: 800;
			margin-left: 20upx;
			margin-top: 20upx;
		}

		.view_item_jieshao {
			display: flex;
			align-items: center;
			margin-top: 31upx;
			margin-left: 20upx;

			.jieshao_image {
				width: 70upx;
				height: 70upx;
			}

			.jieshao_text {
				font-size: 24upx;
				color: #666666;
			}

			.jieshao_right {
				width: 64upx;
				height: 21upx;
				margin-left: 58upx;
				margin-right: 64upx;
			}
		}
	}
</style>
