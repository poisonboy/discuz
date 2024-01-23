<template>

	<view class="nui-spike-box">
<!-- 	  <view class="nui-spike-title list-item">置顶帖子</view> -->
		 
		<swiper :indicator-dots="false" :autoplay="true" :interval="5000" :duration="400" :circular="true"
			:display-multiple-items="1" :vertical="true" class="nui-spike-swiper">
			<swiper-item v-for="(item, index) in sticklist" :key="index" @click="itemClick(item)" v-if="item.special==0&item.price==0">
				<view class="nui-pro-item list-item" hover-class="hover" :hover-start-time="150"  >

					<view class="nui-pro-content">
						<view class="nui-pro-tit"> <text class="nui-pro-zhiding">{{beforetxt}}</text> {{ item.subject }}</view>

					</view>
				</view>
			</swiper-item>
		</swiper>
		<!--商品列表-->
	</view>

</template>

<script>
	export default {
		name: 'nui-list-sticks',
		data() {
			return {};
		},
		props: {
			sticklist: {
				type: [Object, Array],

			},
			beforetxt: {
				type: String,
			}
		},
		methods: {
			itemClick(data) {
				// 跳转到内部窗口并且传递链接
			 var url = `/pages/thread/thread?id=` + data.tid;
				uni.navigateTo({
					url: url
				});
			}
		}
	};
</script>

<style scoped lang="scss">
	/*spike*/
	
	.nui-spike-box {
	 
		    padding: 13px;
		 
	}
	
	.nui-spike-title {
		padding:0;
		box-sizing: border-box;
	    font-size: 16px;
	    height: 24px;
		line-height: 24px;
		color: var(--black);
		font-weight: bold;
		    margin-left: 10rpx;
	 
	}
	
	.nui-spike-title::after {
		left: 0;
	}
	
	.nui-spike-swiper {
		height: 27px;
		align-items: center;
	}
	
	.nui-pro-item {
		display: flex;
		width: 100%;
		background: #fff;
		box-sizing: border-box;
		border-radius: 12rpx;
		position: relative;
	}
	
	.nui-pro-item::after {
		left: 240rpx;
	}
	
	.nui-pro-zhiding {
	display: inline-block;
	    vertical-align: middle;
	    height: 16px;margin-bottom: 3px;
	    margin-right: 8px;
	    padding-right: 3px;
	    padding-left: 3px;
	    border-radius: 4px;
	    background-color: var(--base);
	    color: #fff;
	    font-size: 10px;
	    line-height: 16px;
	    letter-spacing: 0;
	    text-align: center;
	}
	
	.nui-pro-content {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		box-sizing: border-box;
		padding: 5px 0;
	}
	
	.nui-pro-tit {
		color: #2e2e2e;
	 
		font-size: 16px; 
		word-break: break-all;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
	}
	
 
 
	
</style>
