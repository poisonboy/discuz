<template>
	<view class="container">
		<!-- 导航 -->
	<!-- 	<nui-navigation-bar @init="initNavigation" @change="opacityChange" :scrollTop="scrollTop" title="用户中心"
			background="var(--base)" /> -->
		<!-- 背景图 -->
		<nui-headbg height="140"></nui-headbg>

		<view class="dq-forum">

			<!-- 站点信息 -->
			<nui-headinfo :setSite="userInfoData"  ></nui-headinfo>



			<!-- <nui-user-card :userlist="hotuserlist"></nui-user-card> -->
			<view class="card">
				<nui-list-view title="更多服务">




					<nui-list-cell @click="clickgg" :arrow="true">
						<view class="nui-item-box">
							<nui-icon name="bell" :size="24" color="#ff7900"></nui-icon>
							<text class="nui-list-cell_name">官方公告</text>
						</view>
					</nui-list-cell>

					<nui-list-cell @click="clickauthor" :arrow="true">
						<view class="nui-item-box">
							<nui-icon name="info-circle" :size="24" color="#5677fc"></nui-icon>
							<view class="nui-list-cell_name">关于我们</view>
						</view>
					</nui-list-cell>
					<nui-list-cell @click="clickplan" :arrow="true">
						<view class="nui-item-box">
							<nui-icon name="building-store" :size="23" color="#ed3f14"></nui-icon>
							<view class="nui-list-cell_name">更新日志</view>
							<view class="nui-right">进入查看</view>
						</view>
					</nui-list-cell>
					<!-- #ifndef MP-BAIDU||MP-TOUTIAO-->


					<nui-list-cell :arrow="true">

						<view class="nui-item-box ">
							<nui-icon name="send" :size="24" color="#19be6b"></nui-icon>
							<view class="nui-list-cell_name">建议反馈</view>
							<!-- 	<view class="nui-ml-auto">
								<nui-tag padding="10rpx 12rpx" margin="0 30rpx 0 0" size="24rpx" type="light-green"
									shape="circle">欢迎留言</nui-tag>
							</view>
 -->
						</view><button open-type="feedback" class="nui-item-box-btn">
						</button>
					</nui-list-cell>
					<!-- #endif -->
				</nui-list-view>
			</view>

			<view class="card">
				<nui-list-view>

					<nui-list-cell>

						<view class="nui-item-box " @click="doLogin" v-if="!hasLogin">
							<nui-icon name="user" :size="24" color="#878988"></nui-icon>
							<view class="nui-list-cell_name">未知用户</view>

							<view class="nui-ml-auto">
								<nui-tag padding="10rpx 12rpx" margin="0 30rpx 0 0" size="24rpx" type="light-green"
									shape="circle">立即登录</nui-tag>
							</view>

						</view>
						<view class="nui-item-box " @click="loginout" v-else>
							<nui-icon name="user" :size="24" color="#ff7900"></nui-icon>
							<view class="nui-list-cell_name">{{userInfoData.nickname}} </view>
							<view class="nui-ml-auto">
								<nui-tag padding="10rpx 12rpx" margin="0 30rpx 0 0" size="24rpx" type="light-orange"
									shape="circle">退出账号</nui-tag>
							</view>

						</view>
					</nui-list-cell>

				</nui-list-view>
			</view>


		</view>
		<nui-footer :fixed="false" :copyright="copyright" :navigate="navigate" class="nui-custom">
		</nui-footer>
		<!-- 站点信息 -->
		<view class="safearea-bottom"></view>





	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'

	var Api = require("@/utils/api.js");
 
	var wxRequest = require("@/utils/wxRequest.js");
	import config from '@/utils/config.js';

	export default {


		computed: {
			...mapState(['hasLogin', 'userInfo']),
		},
		watch: {
			hasLogin: function(a, b) {
				if (a) {
					this.getUserData()
				}
			}
		},
		mounted() {
			if (this.hasLogin) {
				this.getUserData()
			}
		},
		data() {
			return {
				userInfoData: [],
				navigate: [{
					url: "/pages/user/userxy",
					type: "navigate",
					text: "用户协议"
				}, {
					url: "/pages/user/userys",
					type: "navigate",
					text: "隐私协议"
				}],
				copyright: " Copyright © 2021 Discuz!Q",


			};
		},
		props: {
			setSite: {
				type: [Object, Array],

			},
			Sitenum: {
				type: [Object, Array],


			},
			sticklist: {
				type: [Object, Array],

			},
			hotuserlist: {
				type: [Object, Array],

			},
			Sitenav: {
				type: [Object, Array],

			},

			scrollTop: {
				type: Number,
				default: 0
			}
		},


		methods: {
			getUserData() {
				let _this = this;
				var getUserRequest = wxRequest.getRequest(Api.getUser(this.userInfo.uid));
				getUserRequest.then(res => {
					uni.setStorage({
						key: "userData",
						data: res.data.Data
					})

					_this.userInfoData = res.data.Data

				})
			},
			initNavigation(e) {
				this.opacity = e.opacity;

			},
			opacityChange(e) {
				this.opacity = e.opacity;
			},

			doLogin() {
				uni.navigateTo({
					url: '/pages/login/login'
				});
			},
			loginout() {
				
				            let that = this;
				            uni.showModal({
				                title:'提示',
				                content:'确定清除缓存吗?',
				                confirmText:'立即清除',
				                success(res) {
				                    if(res.confirm){
				                        uni.clearStorageSync();
				                        //重新获取并显示清除后的缓存大小 
				                        uni.showToast({
				                            title:'清除成功'
				                        })
				                    }
				                }
				            })
			},
			clickgg(e) {
				var url = config.Notice;
				console.log(url)
				uni.navigateTo({
					url: url
				});
			},
			clickauthor(e) {
				var url = config.About;

				uni.navigateTo({
					url: url
				});
			},
			clickplan(e) {
				var url = config.Update;

				uni.navigateTo({
					url: url
				});
			}

		},

		onPageScroll(e) {

			this.scrollTop = e.scrollTop;

		},

	};
</script>

<style lang="scss">
	page {
		background: #f7f7fa;
	}
	.dq-forum{
		margin-top:55px ;
	}
 
	.nui-item-box {
		width: 100%;
		display: flex;
		align-items: center;
		position: relative;
	}

	.nui-item-box-btn {
		position: absolute;
		top: 0;
		left: 0;
		opacity: 0;
		height: 40px;
		width: 100%;
	}

	.nui-list-cell_name {
		padding-left: 20rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.nui-ml-auto {
		margin-left: auto;
	}

	.nui-right {
		margin-left: auto;
		margin-right: 34rpx;
		font-size: 26rpx;
		color: #999;
	}

	.card {
		background-color: #fff;
		border-radius: 12px;
		padding: 13px;
		margin: 13px;
	}

	nuicustom {
		margin-bottom: 15px;
	}
</style>
