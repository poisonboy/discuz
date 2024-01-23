<template>
	<view>
	<!-- 	<nui-navigation-bar backgroundColor="var(--base)" :isFixed="true" :isOpacity="false" title="排行榜">

		</nui-navigation-bar> -->
		

		<view class="tab_nav"  >

			<view class="navTitle" v-for="(item, index) in navList" :key="index"  >


				<view :class="{ active: isActive === index }" @click="checked(index)">{{ item.title }}</view>
			</view>
		</view><view style="width: 100%;height: 45px;" >

		</view>
		<view class="nav_item" v-if="isActive == 0">
			<nui-list :indexlist="newreplylist"></nui-list>
		</view>
		<view class="nav_item" v-if="isActive == 1">
			<nui-list :indexlist="hotlist"></nui-list>
		</view>
		 
		<view class="nav_item" v-if="isActive == 2">
			<nui-list :indexlist="essencelist"></nui-list>
		</view>
		<view class="safearea-bottom"></view>
		 
		
		<nui-nomore backgroundColor="#fff" text="排行榜仅显示前十篇帖子"></nui-nomore>
	</view>
</template>

<script>

	export default {

		
		data() {
			return {
				statusBarHeight: 0,
				 
				isActive: 0,
				navList: [{
						index: 0,
						title: '最新回复'
					},
					{
						index: 1,
						title: '热议帖子'
					},
					{
						index: 2, 
						title: '精选内容'
					}

				]
			};
		},
		props: {
			essencelist: {
				type: [Object, Array],

			},hotlist: {
				type: [Object, Array],

			}, 
			newreplylist: {
				type: [Object, Array],

			},
		},

		created() {

			uni.getSystemInfo({
				success: res => {
					this.statusBarHeight = res.statusBarHeight;


				}
			});
		},
		methods: {

			checked(index) {
				this.isActive = index;
			 
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


	.tab_nav {
		display: flex;
		justify-content: center;
		align-items: center;
		position: fixed;
width: 100%;
		z-index: 99;
	}

	.tab_nav .navTitle {
		height: 90rpx;
		line-height: 90rpx;
		background-color: var(--base);
		width: 100%;
		text-align: center;
		font-size: 32rpx;
		font-family: Alibaba PuHuiTi;
		color: #FFFFFF;
	}

	.active {
		position: relative;
		color: #FFFFFF;
		font-weight: 600;
	}

	.active::after {
		content: '';
		position: absolute;
		width: 100rpx;
		height: 4rpx;
		background-color: #FFFFFF;
		left: 0px;
		right: 0px;
		bottom: 3px;
		margin: auto;
		border-radius: 12px;
	}
</style>
