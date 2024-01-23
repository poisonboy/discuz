 
<template>
	<view class="login-bg">
		<image class="img-a" src="@/static/bg1.png"></image>
		<view class="t-login">
			<view class="t-b">登 录</view>
			<form class="cl">
				<view class="t-a">
					<image src="../../static/user.png"></image>
					<input placeholder="请输入账号" autocomplete="off" v-model="name" :adjust-position="false">
					
				</view>
				<view class="t-a">
					<image src="@/static/pwd.png"></image>
					<input :password="true" placeholder="请输入密码" autocomplete="off" v-model="password" :adjust-position="false">
				</view>
				<!-- <view class="t-c" @tap="forgotPwd()">忘记密码</view> -->
				<button class="btn"  @click="doLogin" :disabled="disabled" :loading="btnloading">立 即 登 录</button>
			</form>
		</view>
	<!-- 	<view class="cardBox">
			<view>
				还没有登录账号？
				<text class="txt" @tap="reg()">立刻注册</text>
			</view>
		</view> -->
		<image class="img-b " src="../../static/bg2.png"></image>
	</view>
 
</template>
<script>
	import { mapState,
		mapMutations
	} from 'vuex';
	 import {
	 	doPwdlogin
	 } from '../../utils/api.js';
	export default {

		data() {
			return {
				name: '', //手机号码
				password: '' ,//密码
				btnloading:false,
				disabled:true,
			};
		},
		onLoad() {},
		watch:{
			name:function(a,b){
				if(a.length){
					this.disabled = false
				}else{
					this.disabled = true
				}
			},
			 
		},
		computed: {
			...mapState(['hasLogin', 'userInfo']),
		},
		methods: {
			...mapMutations(['userLogin']),
			StoredoLogin(provider) {
				this.userLogin(provider)
				uni.showToast({
					title: '登录成功！',
					icon: 'none'
				});
			},
		doLogin() {
			var that = this;
			if (!that.name) {
				uni.showToast({
					title: '请输入用户名',
					icon: 'none'
				});
				return;
			}
		
			if (!that.password) {
				uni.showToast({
					title: '请输入密码',
					icon: 'none'
				});
				return;
			}
			this.btnloading = that.disabled = true;
			doPwdlogin({
				username: that.name,
				password: that.password,
				type: "mobilebrowser_username_login"
			}).then(res => {
				that.btnloading = false;
				that.disabled = false
				if (res.data.Data.uid) {
					that.StoredoLogin(res.data.Data)
					uni.navigateBack({
						delta: 1
					})
				}else{
					uni.showToast({
						icon: 'none',
						title: res.data.Message,
						duration: 2000
					});
				}
			})
			
		},
			//忘记密码
			forgotPwd() {
				uni.showToast({
					title: '找回密码正在开发',
					icon: 'none'
				});
			},
			//立刻注册
			reg() {
				uni.showToast({
					title: '注册功能正在开发',
					icon: 'none'
				});
			}
		}
	};
</script>
<style lang="scss" scoped>
 
	
	.img-a {
		width: 100%;
	}
	.img-b {
		width: 100%;
		height: 45px;
		bottom: 0;
		position: absolute;
	}
	.login-bg {
		height: 100vh;
		background:var(--base-gradient)  ;
	}
	
	.t-login {
		width: 580rpx;
		padding: 55rpx;
		margin: 0 auto;
		font-size: 28rpx;
		background-color: #ffffff;
		border-radius: 20rpx;
		position: relative;
		margin-top: -200rpx;
		box-shadow: 0 5px 7px 0 rgba(0, 0, 0, 0.15);
		z-index: 9;
	}
	.t-login button {
		font-size: 28rpx;
		background: var(--base-gradient)  ;
		color: #fff;
		height: 90rpx;
		width: 580rpx;
		line-height: 90rpx;
		border-radius: 50rpx;
	}
	
	.t-login input {
		padding: 0 20rpx 0 120rpx;
		height: 90rpx;
		line-height: 90rpx;
		margin-bottom: 50rpx;
		background: #f6f6f6;
		border: 1px solid #f6f6f6;
		font-size: 28rpx;
		border-radius: 50rpx;
	}
	
	.t-login .t-a {
		position: relative;
	}
	
	.t-login .t-a image {
		width: 40rpx;
		height: 40rpx;
		position: absolute;
		left: 40rpx;
		top: 28rpx;
		padding-right: 20rpx;
	}
	
	.t-login .t-b {
		text-align: left;
		font-size: 46rpx;
		color:var(--base);
		font-weight: bold;
		margin: 0 0 50rpx 20rpx;
	}
	
	.t-login .t-d {
		text-align: center;
		color: #999;
		margin: 80rpx 0;
	}
	
	.t-login .t-c {
		text-align: right;
		color: #c0c0c0;
		margin: -20rpx 30rpx 40rpx 0;
	}
	
	.t-login .t-f {
		text-align: center;
		margin: 200rpx 0 0 0;
		color: #666;
	}
	
	.t-login .t-f text {
		margin-left: 20rpx;
		color: #aaaaaa;
		font-size: 27rpx;
	}
	
	.t-login .uni-input-placeholder {
		color: #aeaeae;
	}
	
	.cl {
		zoom: 1;
	}
	
	.cl:after {
		clear: both;
		display: block;
		visibility: hidden;
		height: 0;
		content: '\20';
	}
	.cardBox {
		-webkit-box-orient: horizontal;
		-webkit-box-direction: normal;
		-webkit-flex-direction: row;
		flex-direction: row;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		padding: 5px;
		background: #ffffff;
		opacity: 0.9;
		-webkit-border-radius: 20rpx;
		border-radius: 0 0 20rpx 20rpx;
		height: 70rpx;
		width: 600rpx;
		margin: 0 auto;
		position: relative;
		text-align: center;
		line-height: 70rpx;
		color: #aaa;
		font-size: 28rpx;
	}
	.cardBox .txt {
		color:var(--base);
	}
</style>
