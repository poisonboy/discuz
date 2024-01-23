<template>
	<view class="container">
		<!-- 导航 -->
		<!-- <nui-navigation-bar @init="initNavigation" @change="opacityChange" :scrollTop="scrollTop" title="首页"
			background="var(--base)" /> -->
		<!-- 背景图 -->
		<nui-headbg height="200"></nui-headbg>

		<view class="dq_forum">

			<!-- 站点信息 -->
			<view class="dq_forum_top">
				<!--banner-->
				<view class="nui-banner-box">
					<swiper :indicator-dots="true" :autoplay="true" :interval="5000" :duration="150"
						class="nui-banner-swiper" :circular="true" previous-margin="60rpx" next-margin="60rpx">
						<swiper-item v-for="(item, index) in banner" :key="index" class="nui-banner-item"
							@click="clickbanner(item)">
							<image :src="item.image" class="nui-slide-image"
								:class="[current != index ? 'nui-banner-scale' : '']" mode="scaleToFill" lazy-load />
						</swiper-item>
					</swiper>
				</view>
				<!--banner-->

				<nui-list-sticks  :sticklist="sticklist"  beforetxt="精华"></nui-list-sticks >


				<view class="nui-classify-box">
					<navigator class="nui-classify-item" v-for="(item, index) in nav1" :key="index" :url="item.path">
						<image :src="item.img" class="nui-classify-img" lazy-load />
						<view class="nui-classify-name">{{ item.name }}</view>
					</navigator>
				</view>
				<!--classify-->


			</view>

			<!-- #ifdef MP-WEIXIN -->


			<view class="nui-nav2">
				<navigator class="nui-nav2-item" v-for="(item, index) in nav2" :key="index" :url="item.path">
					<image :src="item.img" class="nui-nav2-img" lazy-load />
					<view class="nui-nav2-name">{{ item.name }}</view>
				</navigator>
			</view>
			<!-- #endif -->
			<!-- 置顶列表 -->

			<!-- 列表 -->
			<!-- <nui-card :cardlist="hotuserlist"></nui-card> -->
 
			<nui-users-card :swiperlist="hotuserlist" :userlist="hotuserlist"></nui-users-card>
			<nui-list :indexlist="indexlist"></nui-list>

		</view>
		<!-- 站点信息 -->
		<view class="safearea-bottom"></view>


		<nui-nomore backgroundColor="#fff" text="没有更多帖子了"></nui-nomore>


	</view>
</template>

<script>
	import config from '@/utils/config.js';

	export default {

		 
		data() {
			return {
				banner: {},
				nav1: {},
				nav2: {},
				current: 0,


			};
		},
		props: {

			indexlist: {
				type: [Object, Array],

			},
			sticklist: {
				type: [Object, Array],

			},
			hotuserlist: {
				type: [Object, Array],

			},


			scrollTop: {
				type: Number,
				default: 0
			}
		},


		created() {

			this.banner = config._home_data.banner();
			this.nav1 = config._home_data.nav1();

			this.nav2 = config._home_data.nav2();
		},
		methods: {
			initNavigation(e) {
				this.opacity = e.opacity;

			},
			opacityChange(e) {
				this.opacity = e.opacity;
			},


			clickbanner(item) {

				var url = item.path;
				uni.navigateTo({
					url: url
				});
			},

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

	.container {
		position: relative;
	}

	.dq_forum {
		margin-top: -200px;
		position: relative;
	}

	.dq_forum_top {
		margin: 13px;
		background-color: #fff;
		border-radius: 12px;
		z-index: 2;
	}

	/*banner*/

	.nui-banner-box {
		width: 100%;
		padding-top: 20rpx;
		box-sizing: border-box;
		// background: #fff;
	}

	.nui-banner-swiper {
		width: 100%;
		height: 240rpx;
	}

	.nui-banner-item {
		padding: 0 16rpx;
		box-sizing: border-box;
	}

	.nui-slide-image {
		width: 100%;
		height: 240rpx;
		display: block;
		border-radius: 12rpx;
		/* transition: all 0.1s linear; */
	}

	.nui-banner-scale {
		transform: scaleY(0.9);
		transform-origin: center center;
	}

	/* #ifdef MP-WEIXIN */
	.nui-banner-swiper .wx-swiper-dot {
		width: 8rpx;
		height: 8rpx;
		display: inline-flex;
		background: none;
		justify-content: space-between;
	}

	.nui-banner-swiper .wx-swiper-dot::before {
		content: '';
		flex-grow: 1;
		background: rgba(255, 255, 255, 0.8);
		border-radius: 16rpx;
		overflow: hidden;
	}

	.nui-banner-swiper .wx-swiper-dot-active::before {
		background: #fff;
	}

	.nui-banner-swiper .wx-swiper-dot.wx-swiper-dot-active {
		width: 16rpx;
	}

	/* #endif */

	/* #ifndef MP-WEIXIN */
	>>>.nui-banner-swiper .uni-swiper-dot {
		width: 8rpx;
		height: 8rpx;
		display: inline-flex;
		background: none;
		justify-content: space-between;
	}

	>>>.nui-banner-swiper .uni-swiper-dot::before {
		content: '';
		flex-grow: 1;
		background: rgba(255, 255, 255, 0.8);
		border-radius: 16rpx;
		overflow: hidden;
	}

	>>>.nui-banner-swiper .uni-swiper-dot-active::before {
		background: #fff;
	}

	>>>.nui-banner-swiper .uni-swiper-dot.uni-swiper-dot-active {
		width: 16rpx;
	}

	/* #endif */
	/*banner*/

	/*headlines*/

	.nui-rolling-news {
		width: 100%;
		padding: 0 30rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-wrap: nowrap;
		background: #fff;
	}

	.nui-rolling-news::after {
		left: 0;
	}

	.nui-swiper {
		margin-left: 8rpx;
		font-size: 28rpx;
		height: 80rpx;
		flex: 1;
	}

	.nui-swiper-item {
		display: flex;
		align-items: center;
	}

	.nui-news-item {
		line-height: 28rpx;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		color: #555;
	}

	/*headlines*/

	/*classify*/

	.nui-classify-box {
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: left;
		padding: 28rpx 0;
		background-color: #fff;
		border-radius: 12px;
	}

	.nui-classify-item {
		width: 25%;
		text-align: center;
	}

	.nui-classify-img {
		width: 40px;
		height: 40px;

		border-radius: 50%;
	}

	.nui-classify-name {
		font-size: 14px;
		line-height: 20px;

		color: #333;
		white-space: nowrap;
	}

	.nui-nav2 {
		display: flex;
		flex-wrap: wrap;

		margin: 13px;
		padding: 12px;
		background-color: #fff;
		border-radius: 12px;
	}

	.nui-nav2-item {
		align-items: center;
		display: flex;
		justify-content: space-between;
		flex: 1;
		margin: 6px;
		padding: 12px;
		background: #F0F5FC;
		border-radius: 6px;
	}

	.nui-nav2-img {
		width: 40px;
		height: 40px;

		border-radius: 50%;
	}

	.nui-nav2-name {
		font-size: 14px;
		line-height: 20px;

		color: #333;
		white-space: nowrap;
	}
</style>