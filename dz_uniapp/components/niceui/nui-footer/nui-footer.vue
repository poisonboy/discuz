<template>
	<view class="nui-footer-class nui-footer" :class="[fixed?'nui-fixed':'']"
		:style='{backgroundColor:backgroundColor}'>
		<view class="nui-footer-link" v-if="navigate.length>0">
			<block v-for="(item,index) in navigate" :key="index">
				<navigator class="nui-link" hover-class="nui-link-hover" :hover-stop-propagation="true"
					:style="{color:(item.color || '#596d96'),fontSize:(item.size || 28)+'rpx'}" :open-type="item.type"
					:url="item.url" :target="item.target" :delta="item.delta" :app-id="item.appid" :path="item.path"
					:extra-data="item.extradata" :bindsuccess="item.bindsuccess" :bindfail="item.bindfail">{{item.text}}
				</navigator>
			</block>
		</view>
		<view class="nui-footer-copyright" :style="{color:color,fontSize:size+'rpx'}">
			{{copyright}}
		</view>
	</view>
</template>

<script>
	export default {
		name: "nui-footer",
		props: {
			//type target url delta appid path extradata bindsuccess bindfail text color size
			//链接设置  数据格式对应上面注释的属性值
			navigate: {
				type: Array,
				default: function() {
					return []
				}
			},
			//底部文本
			copyright: {
				type: String,
				default: "All Rights Reserved."
			},
			//copyright 字体颜色
			color: {
				type: String,
				default: "#A7A7A7"
			},
			//copyright 字体大小
			size: {
				type: Number,
				default: 24
			},
			//footer背景颜色
			backgroundColor: {
				type: String,
				default: "transparent"
			},
			//是否固定在底部
			fixed: {
				type: Boolean,
				default: true
			}
		},
		methods: {}
	}
</script>

<style scoped lang="scss">


	.nui-footer {
		width: 100%;
		overflow: hidden;
		padding: 30rpx 24rpx;
		box-sizing: border-box;
	}

	.nui-fixed {
		position: fixed;
		z-index: 9999;
		bottom: 0;
		left: 0;
	}

	.nui-footer-link {
		color: #596d96;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 28rpx;
	}

	.nui-link {
		position: relative;
		padding: 0 18rpx;
		line-height: 1;
	}

	.nui-link::before {
		content: " ";
		position: absolute;
		right: 0;
		top: 0;
		width: 1px;
		bottom: 0;
		border-right: 1px solid #d3d3d3;
		-webkit-transform-origin: 100% 0;
		transform-origin: 100% 0;
		-webkit-transform: scaleX(0.5);
		transform: scaleX(0.5);
	}

	.nui-link:last-child::before {
		border-right: 0 !important
	}

	.nui-link-hover {
		opacity: 0.5
	}

	.nui-footer-copyright {
		font-size: 24rpx;
		color: #A7A7A7;
		line-height: 1;
		text-align: center;
		padding-top: 16rpx;
		padding-bottom: env(safe-area-inset-bottom);
	}
</style>
