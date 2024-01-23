<template>
	<view class="nui-nodata-box" :class="[fixed?'nui-nodata-fixed':'']">
		<image v-if="imgUrl" :src="imgUrl" class="nui-tips-icon" :style="{width:imgWidth+'rpx',height:imgHeight+'rpx'}"></image>
		<view class="nui-tips-content">
			<slot></slot>
		</view>
		<view class="nui-tips-btn" hover-class="nui-btn__hover" :hover-stay-time="150" :style="{width:btnWidth+'rpx',height:btnHeight+'rpx',background:backgroundColor,borderRadius:radius,fontSize:size+'rpx'}" v-if="btnText"  @tap="handleClick">{{btnText}}</view>
	</view>
</template>

<script>
	export default {
		name: "nui-no-data",
		props: {
			//是否垂直居中
			fixed: {
				type: Boolean,
				default: true
			},
			//图片地址，没有则不显示
			imgUrl: {
				type: String,
				default: ""
			},
			//图片宽度
			imgWidth: {
				type: Number,
				default: 200
			},
			//图片高度
			imgHeight:{
				type: Number,
				default: 200
			},
			//按钮宽度
			btnWidth:{
				type: Number,
				default: 200
			},
			btnHeight:{
				type: Number,
				default: 60
			},
			//按钮文字，没有则不显示
			btnText:{
				type:String,
				default: ""
			},
			//按钮背景色
			backgroundColor:{
				type:String,
				default: "#EB0909"
			},
			size:{
				type:Number,
				default:28
			},
			radius:{
				type:String,
				default:'8rpx'
			}
		},
		methods: {
			handleClick(e) {
				this.$emit('click', {});
			}
		}
	}
</script>

<style scoped>
	nuinodata-box {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	nuinodata-fixed {
		width: 90%;
		position: fixed;
		left: 50%;
		top: 50%;
		-webkit-transform: translate(-50%, -50%);
		transform: translate(-50%, -50%);
	}

	nuitips-icon {
		display: block;
		flex-shrink: 0;
		width: 280rpx;
		height: 280rpx;
		margin-bottom: 40rpx;
	}

	nuitips-content {
		text-align: center;
		color: #666666;
		font-size: 28rpx;
		padding: 0 50rpx 28rpx 50rpx;
		box-sizing: border-box;
		word-break: break-all;
		word-wrap: break-word;
	}

	nuitips-btn {
		color: #fff;
		margin: 0;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	nuibtn__hover{
		opacity: 0.5;
	}
	
</style>
