<template>
	<view class="nui-tag" :hover-class="hover ? 'nui-tag-opcity' : ''" :hover-stay-time="150" :class="[originLeft ? 'nui-origin-left' : '', originRight ? 'nui-origin-right' : '', getClassName(shape, plain), getTypeClass(type, plain)]"
	 :style="{ transform: `scale(${scaleMultiple})`, padding: padding, margin: margin, fontSize: size, lineHeight: size }"
	 @tap="handleClick">
		<slot></slot>
	</view>
</template>

<script>
	export default {
		name: 'nui-tag',
		props: {
			type: {
				type: String,
				default: 'primary'
			},
			//padding
			padding: {
				type: String,
				default: '16rpx 26rpx'
			},
			margin: {
				type: String,
				default: '0'
			},
			//文字大小 rpx
			size: {
				type: String,
				default: '28rpx'
			},
			// circle, square，circleLeft，circleRight
			shape: {
				type: String,
				default: 'square'
			},
			//是否空心
			plain: {
				type: Boolean,
				default: false
			},
			//点击效果
			hover: {
				type: Boolean,
				default: false
			},
			//缩放倍数
			scaleMultiple: {
				type: Number,
				default: 1
			},
			originLeft: {
				type: Boolean,
				default: false
			},
			originRight: {
				type: Boolean,
				default: false
			},
			index: {
				type: Number,
				default: 0
			}
		},
		methods: {
			handleClick() {
				this.$emit('click', {
					index: this.index
				});
			},
			getTypeClass: function(type, plain) {
				return plain ? 'nui-' + type + '-outline' : 'nui-' + type;
			},
			getClassName: function(shape, plain) {
				//circle, square，circleLeft，circleRight
				var className = plain ? 'nui-tag-outline ' : '';
				if (shape != 'square') {
					if (shape == 'circle') {
						className = className + (plain ? 'nui-tag-outline-fillet' : 'nui-tag-fillet');
					} else if (shape == 'circleLeft') {
						className = className + 'nui-tag-fillet-left';
					} else if (shape == 'circleRight') {
						className = className + 'nui-tag-fillet-right';
					}
				}
				return className;
			}
		}
	};
</script>

<style scoped>
	/* color start*/

	.nui-primary {
		background-color: #5677fc !important;
		color: #fff;
	}

	.nui-light-primary {
		background-color: #5c8dff !important;
		color: #fff;
	}

	.nui-dark-primary {
		background-color: #4a67d6 !important;
		color: #fff;
	}

	.nui-dLight-primary {
		background-color: #4e77d9 !important;
		color: #fff;
	}

	.nui-danger {
		background-color: #ed3f14 !important;
		color: #fff;
	}

	.nui-red {
		background-color: #ff201f !important;
		color: #fff;
	}

	.nui-warning {
		background-color: #ff7900 !important;
		color: #fff;
	}

	.nui-green {
		background-color: #19be6b !important;
		color: #fff;
	}

	.nui-high-green {
		background-color: #52dcae !important;
		color: #52dcae;
	}

	.nui-black {
		background-color: #000 !important;
		color: #fff;
	}

	.nui-white {
		background-color: #fff !important;
		color: #333 !important;
	}

	.nui-translucent {
		background-color: rgba(0, 0, 0, 0.7);
	}

	.nui-light-black {
		background-color: #333 !important;
	}

	.nui-gray {
		background-color: #ededed !important;
	}

	.nui-phcolor-gray {
		background-color: #ccc !important;
	}

	.nui-divider-gray {
		background-color: #eaeef1 !important;
	}

	.nui-btn-gray {
		background-color: #ededed !important;
		color: #999 !important;
	}

	.nui-hover-gray {
		background-color: #f7f7f9 !important;
	}

	.nui-bg-gray {
		background-color: #fafafa !important;
	}

	.nui-light-blue {
		background-color: #ecf6fd;
		color: #4dabeb !important;
	}

	.nui-light-brownish {
		background-color: #fcebef;
		color: #8a5966 !important;
	}

	.nui-light-orange {
		background-color: #fef5eb;
		color: #faa851 !important;
	}

	.nui-light-green {
		background-color: #e8f6e8;
		color: #44cf85 !important;
	}

	.nui-primary-outline::after {
		border: 1px solid #5677fc !important;
	}

	.nui-primary-outline {
		color: #5677fc !important;
		background-color: none;
	}

	.nui-danger-outline {
		color: #ed3f14 !important;
		background-color: none;
	}

	.nui-danger-outline::after {
		border: 1px solid #ed3f14 !important;
	}

	.nui-red-outline {
		color: #ff201f !important;
		background-color: none;
	}

	.nui-red-outline::after {
		border: 1px solid #ff201f !important;
	}

	.nui-warning-outline {
		color: #ff7900 !important;
		background-color: none;
	}

	.nui-warning-outline::after {
		border: 1px solid #ff7900 !important;
	}

	.nui-green-outline {
		color: #44cf85 !important;
		background-color: none;
	}

	.nui-green-outline::after {
		border: 1px solid #44cf85 !important;
	}

	.nui-high-green-outline {
		color: #52dcae !important;
		background-color: none;
	}

	.nui-high-green-outline::after {
		border: 1px solid #52dcae !important;
	}

	.nui-gray-outline {
		color: #999 !important;
		background-color: none;
	}

	.nui-gray-outline::after {
		border: 1px solid #ccc !important;
	}

	.nui-black-outline {
		color: #333 !important;
		background-color: none;
	}

	.nui-black-outline::after {
		border: 1px solid #333 !important;
	}

	.nui-white-outline {
		color: #fff !important;
		background-color: none;
	}

	.nui-white-outline::after {
		border: 1px solid #fff !important;
	}

	/* color end*/

	/* tag start*/

	.nui-tag {
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 6rpx;
		flex-shrink: 0;
	}

	.nui-tag-outline {
		position: relative;
		background-color: none;
		color: #5677fc;
	}

	.nui-tag-outline::after {
		content: ' ';
		position: absolute;
		width: 200%;
		height: 200%;
		transform: scale(0.5) translateZ(0);
		transform-origin: 0 0;
		box-sizing: border-box;
		left: 0;
		top: 0;
		border-radius: 12rpx;
	}

	.nui-tag-fillet {
		border-radius: 50rpx;
	}

	.nui-white.nui-tag-fillet::after {
		border-radius: 80rpx;
	}

	.nui-tag-outline-fillet::after {
		border-radius: 80rpx;
	}

	.nui-tag-fillet-left {
		border-radius: 50rpx 0 0 50rpx;
	}

	.nui-tag-fillet-right {
		border-radius: 0 50rpx 50rpx 0;
	}

	.nui-tag-fillet-left.nui-tag-outline::after {
		border-radius: 100rpx 0 0 100rpx;
	}

	.nui-tag-fillet-right.nui-tag-outline::after {
		border-radius: 0 100rpx 100rpx 0;
	}

	/* tag end*/
	.nui-origin-left {
		transform-origin: 0 center;
	}

	.nui-origin-right {
		transform-origin: 100% center;
	}

	.nui-tag-opcity {
		opacity: 0.5;
	}
</style>
