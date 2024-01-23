<template>
	<view class="container">
		<view class="user">
			<view class="user__left">
				<view class="user__avatar">
					<image :src="userInfoData.avatarUrl||'/static/noavatar.gif'"></image>
				</view>
			</view>
			<view class="user__body" @click="doLogin">
				<text class="user__title">
					<text>{{ userInfoData.nickname || userInfoData.username ||'点击登录'}}</text>
				</text>
				<view class="user__groupname" v-if="userInfoData.group">
					 <text> {{userInfoData.group.groupName||'登录后可查看更多内容'}} </text>
				
				</view>
				<view class="user__subtitle">
					<text> {{userInfoData.signature||'' }}</text>

				</view>
			</view>
		</view>
		<view class="nav">
			<view class="grid grid-3 p-20 text-white text-bold">
		
				<view>
					粉丝
		
					<text style="margin-left: 3px;"> {{ userInfoData.fansCount||'0' }}</text>
				</view>
				<view>
					关注
					<text style="margin-left: 3px;"> {{ userInfoData.followCount||'0' }}</text>
				</view>
				<view>
					发帖
					<text style="margin-left: 3px;"> {{ userInfoData.threadCount ||0}}</text>
				</view>
		
		
			</view>
		</view>
		<!-- <view class="nav">
			<view class="grid grid-3 p-20 text-white text-bold">

				<view>
					<nui-icon name="message-2" color="#fff" size="16" margin="0 3px 0 0"></nui-icon>

					<text>{{ Sitenum.countPosts }}</text>
				</view>
				<view>
					<nui-icon name="friends" color="#fff" size="16" margin="0 3px 0 0"></nui-icon>

					<text>{{ Sitenum.countUsers }}</text>
				</view>
				<view>
					<nui-icon name="float-left" color="#fff" size="16" margin="0 3px 0 0"></nui-icon>

					<text>{{ Sitenum.countThreads }}</text>
				</view>


			</view>
		</view>
 -->
		<!-- <view class="user__join-btn">
			<nui-icon name="search" color="#ffffff" :bold="true" size="16"></nui-icon>
			<text style="margin-left: 5px;">搜索一下你感兴趣的内容</text>
		</view> -->
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'

	var Api = require("@/utils/api.js");
	var util = require("@/utils/util.js");
	var wxApi = require("@/utils/wxApi.js");
	const Adapter = require("@/utils/adapter.js");
	var wxRequest = require("@/utils/wxRequest.js");
	import config from '@/utils/config.js';
	export default {
		name: 'nui-headinfo',
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
			};
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
		
		props: {

		}
	};
</script>

<style lang="scss">
	.container {
	 
	    width: 698rpx;
	    position: absolute;
	    bottom: 0;
	    top: 20px;
	    right: 0;
	    z-index: 10;
	    height: 160px;
	    margin: 13px;
 
	background-color: var(--base);
		opacity: 1;
		box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 6px -1px;
		border-radius: 12px;
	}

	.user {
		padding: 20px 13px;
		overflow: hidden;
	}

	.user__left {
		padding-right: 13px;
	}

	.user__avatar {
		overflow: hidden;
		width: 56px;
		height: 56px;
		border: 1px solid #fff;
		background-color: var(--white);
		border-radius: 500px;

		image {
			width: 56px;
			height: 56px;
		}
	}

	.user__body {
		overflow: hidden;
		padding-top: 8px;
		margin-left: 10px;

	}

	.user__body,
	.user__left,
	.user__right {
		display: table-cell;
		vertical-align: top;
	}

	.user__title {
		color: #fff;
		font-weight: 400;
		font-size: 20px;
		line-height: 20px;
	}

	.user__subtitle {
		margin-top: 0;
		color: #fff;
		font-size: 14px;
		line-height: 20px;
	}
	
	.user__groupname {
		margin-top: 0;
		color: #fff;
		font-size: 12px;
		line-height: 16px;
		opacity: 0.8;
	}

	.user__right {
		padding-top: 12px;
	}

	.nav {
		margin: 3px;
	}

	.user__join-btn {
		display: inline-block;

		margin: 0 13px;
		width: 646rpx;
		border-radius: 6px;
		color: #e9e6ec;
		background-color: #3069e4;
		justify-content: center;
		text-align: center;
	}

	.user__join-btn text {
		display: inline-block;
		vertical-align: middle;

		font-size: 14px;
		line-height: 30px;
	}
</style>
