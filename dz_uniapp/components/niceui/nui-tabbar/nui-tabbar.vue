<template>
	<view class="nui-bar tabbar bg-white ">

		<view class="action" :class="TabID == 0?'text-base':'text-black'" @tap="tabTap(0)">
			<text :class="TabID == 0?'nui-icon-smart-home':'nui-icon-smart-home'"></text>
			<view class="fs-20">首页</view>
		</view>
		<view class="action" :class="TabID == 1?'text-base':'text-black'" @tap="tabTap(1)">
			<text :class="TabID == 1?'nui-icon-layout-2':'nui-icon-layout-2'"></text>
			<view class="fs-20">频道</view>
		</view>

		<view class="action add-action" @tap="tabTap(2)">
			<text class=" nui-icon-plus  shadow" :class="TabID == 2?'bg-base':'bg-white'"></text>

		</view>

		<view class="action" :class="TabID == 3?'text-base':'text-black'" @tap="tabTap(3)">
			<text :class="TabID == 3?'nui-icon-award':'nui-icon-award'">
				<!-- 	<view class="nui-tag badge" v-if="MsgDot"></view> -->
			</text>
			<view class="fs-20">排行</view>
		</view>
		<view class="action" :class="TabID == 4?'text-base':'text-black'" @tap="tabTap(4)">
			<text :class="TabID == 4?'nui-icon-user':'nui-icon-user'"></text>
			<view class="fs-20">我的</view>
		</view>



	</view>
</template>

<script>
	export default {
		name: 'nui-tabbar',
		data() {
			return {
				TabID: 0,
				MsgDot: false,
			};
		},
		props: {
			tabID: {
				type: [String, Number],
				default: 0
			},
			msgDot: {
				type: Boolean,
				default: false
			},
		},
		created() {
			this.TabID = this.tabID;
			this.MsgDot = this.msgDot;
		},
		watch: {
			tabID() {

				this.TabID = this.tabID;

			},
			msgDot() {
				this.MsgDot = this.msgDot;
			}
		},
		methods: {
			tabTap(index) {
				if (index != this.TabID) {
					this.$emit('tabTap', index);
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.nui-bar.tabbar {
		/* #ifdef MP-TOUTIAO */
		padding-bottom: 15px;
		/* #endif */

		height: calc(100rpx + env(safe-area-inset-bottom) / 2);
		padding-bottom: calc(env(safe-area-inset-bottom) / 2);
	}




	.nui-bar {
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		width: 100%;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		min-height: 100rpx;
		-webkit-box-pack: justify;
		-webkit-justify-content: space-between;
		justify-content: space-between;
		position: fixed;
		z-index: 997;
		width: 100%;
		bottom: 0;
	}

	.nui-bar.tabbar .action {

		position: relative;
		-webkit-box-flex: 1;
		-webkit-flex: 1;
		flex: 1;
		text-align: center;
		padding: 0;
		display: block;
		height: auto;
		line-height: 1;
		margin: 0;
		background-color: inherit;
		overflow: initial;
	}


	.nui-bar .action {
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		height: 100%;
		-webkit-box-pack: center;
		-webkit-justify-content: center;
		justify-content: center;
		max-width: 100%;
	}

	.nui-bar.tabbar .action [class*="nui-icon-"] {
		width: 50px;
		position: relative;
		display: block;
		height: auto;
		margin: 0 auto 5rpx;
		text-align: center;
		font-size: 20px;
		line-height: 28px
	}




	.nui-bar.tabbar .action.add-action [class*="nui-icon-"] {
		position: absolute;
		width: 35px;
		z-index: 2;
		height: 35px;
		border-radius: 50%;
		font-size: 25px;

		top: -45rpx;
		left: 0;
		right: 0;
		margin: auto;
		padding: 0;
	}

	.nui-bar.tabbar .action.add-action::after {
		content: "";
		position: absolute;
		width: 100upx;
		height: 100upx;
		top: -60upx;
		left: 0;
		right: 0;
		margin: auto;
		box-shadow: 0 -3upx 8upx rgba(0, 0, 0, 0.08);
		border-radius: 50upx;
		background-color: inherit;
		z-index: 0;
	}
</style>
