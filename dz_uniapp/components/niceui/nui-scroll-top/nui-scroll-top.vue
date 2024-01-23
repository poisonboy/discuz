<template>
	<view class="nui-scroll-top_box" v-show=" (visible && toggle)" :style="{ bottom: bottom + 'px', right: right + 'px' }">
		 
		<view class="nui-scroll-top_item bg-base round-circle"   v-show="visible && toggle" @tap.stop="goTop">
			<nui-icon name="arrow-bar-to-up" color="#fff" size="16" margin="0 0 3px   0"></nui-icon>
		 
			<view class="nui-scroll-top_text tui-color-white">顶部</view>
		</view>
	</view>
</template>

<script>
/**
 * 注意：组件中使用的图片地址，将文件复制到自己项目中
 * 如果图片位置与组件同级，编译成小程序时图片会丢失
 * 拷贝static下整个components文件夹
 * 也可直接转成base64（不建议）
 * */
export default {
	name: 'nui-scroll-top',
	props: {
		//回顶部按钮距离底部距离 rpx
		bottom: {
			type: Number,
			default: 0
		},
		//回顶部按钮距离右侧距离 rpx
		right: {
			type: Number,
			default: 20
		},
		//距离顶部多少距离显示 px
		top: {
			type: Number,
			default: 200
		},
		//滚动距离
		scrollTop: {
			type: Number
		},
		//回顶部滚动时间
		duration: {
			type: Number,
			default: 120
		},
		 
		//回顶部icon
		topIcon: {
			type: String,
			default: 'arrow-bar-to-up'
		},
		 
	},
	watch: {
		scrollTop(newValue, oldValue) {
			this.change();
		}
	},
	data() {
		return {
			//判断是否显示
			visible: false,
			//控制显示，主要解决调用api滚到顶部fixed元素抖动的问题
			toggle: true
		};
	},
	methods: {
		goTop: function() {
			this.toggle = false;
			uni.pageScrollTo({
				scrollTop: 0,
				duration: this.duration
			});
			setTimeout(() => {
				this.toggle = true;
			}, 220);
		}, 
		change() {
			let show = this.scrollTop > this.top;
			if ((show && this.visible) || (!show && !this.visible)) {
				return;
			}
			this.visible = show;
		}
	}
};
</script>

<style scoped lang="scss">
.nui-scroll-top_box {
	width: 40px;
	height: 270rpx;
	position: fixed;
	z-index: 9999;
	    right: 20px;
	    bottom: 110px;
	font-weight: 400;
}

.nui-scroll-top_item {
	width: 40px;
	height: 40px;
	position: relative;
	    text-align: center;
	 
}

.nui-scroll-item_top {
	margin-top: 30rpx;
}

.nui-scroll-top_img {
	width: 40px;
	height: 40px;
	display: block;
}

.nui-scroll-top_text {
	width: 80rpx;
	text-align: center;
	font-size: 12px;
	line-height: 12px;
	 
	transform-origin: center center;
	position: absolute;
	left: 0;
	bottom: 15rpx;
}

.tui-color-white {
	color: #fff;
}
.tui-share-btn {
	background: transparent !important;
	padding: 0;
	margin: 0;
	display: inline;
	border: 0;
}
.tui-share-btn::after {
	border: 0;
}
</style>
