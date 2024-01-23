<template>
	<view class="nui-list-view nui-view-class" :style="{backgroundColor:backgroundColor,marginTop:marginTop}">
		<view class="nui-list-title"   v-if="title">{{title}}</view>
		<view class="nui-list-content" :class="[unlined?'nui-border-'+unlined:'']">
			<slot></slot>
		</view>
	</view>
</template>

<script>
	export default {
		name: "nuiListView",
		props: {
			title: {
				type: String,
				default: ''
			},
		 
		 
			backgroundColor:{
				type: String,
				default: 'transparent'
			},
			unlined: {
				type: String,
				default: '' //top,bottom,all
			},
			marginTop:{
				type:String,
				default:'0'
			}
		}
	}
</script>

<style scoped>
	.nui-list-title {
		margin-left: 10rpx;
		font-weight: 700;
		font-size: 16px;
		color: var(--black);
		line-height: 24px;
	}

	.nui-list-content {
		width: 100%;
		position: relative;
	}

	.nui-list-content::before {
		content: " ";
		position: absolute;
		top: 0;
		right: 0;
		left: 0;
	 
		-webkit-transform: scaleY(0.5) translateZ(0);
		transform: scaleY(0.5) translateZ(0);
		transform-origin: 0 0;
		z-index: 2;
		pointer-events: none;
	}

	.nui-list-content::after {
		content: '';
		width: 100%;
		position: absolute;
	 
		-webkit-transform: scaleY(0.5) translateZ(0);
		transform: scaleY(0.5) translateZ(0);
		transform-origin: 0 100%;
		bottom: 0;
		right: 0;
		left: 0;
	}

	.nui-border-top::before {
		border-top: 0;
	}

	.nui-border-bottom::after {
		border-bottom: 0;
	}

	.nui-border-all::after {
		border-bottom: 0;
	}

	.nui-border-all::before {
		border-top: 0;
	}
</style>
