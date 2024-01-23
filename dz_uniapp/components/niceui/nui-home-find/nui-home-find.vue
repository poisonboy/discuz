<template>

	<view class="container">
		<!-- <nui-navigation-bar backgroundColor="var(--base)" :isFixed="true" :isOpacity="false" title="话题">

		</nui-navigation-bar> -->
		<!-- <view style="width:100%;margin-top: 44px;" :style="{ height: statusBarHeight + 'px' }">

		</view>
 -->

		<view class="module_head">


			<view class="head_title">热门话题</view>
			<scroll-view scroll-x="true" class="forum">
				<view class="forum_cate" v-for="(item,index) in topicslist" :key="index">

					<view class="topic_info">
						<view class="topic_item" @click="itemClick(item)">


							<view class="topic_name">
								<text class="topic_icon">#</text>
								{{item.content}}
							</view>
							<view class="topic_num">帖数: {{item.threadCount}} 浏览: {{item.viewCount}} </view>



						</view>
					</view>


				</view>


			</scroll-view>

		</view>

		<view v-if="webtype==1">
			<navigator class="post" open-type="redirect" :url="postdomain">
				<text>发布话题</text>
			</navigator>
		</view>


		<view class="safearea-bottom"></view>

	</view>
</template>

<script>

	export default {

		
		data() {
			return {
				statusBarHeight: 0
			};
		},
		props: {
			topicslist: {
				type: [Object, Array],

			},
			webtype: {
				type: String,
				default: '1'
			},
			postdomain: {
				type: String,
				default: '1'
			}

		},

		created() {

			uni.getSystemInfo({
				success: res => {
					this.statusBarHeight = res.statusBarHeight;


				}
			});
		},
		methods: {

			itemClick(data) {
				// 跳转到内部窗口并且传递链接
				//var url = `/pages/webview/webview?url=` + API_URL + 'thread/' + data.tid;
				var url = `/pages/list/lists?id=` + data.topicId + '&name=' + data.content;
				uni.navigateTo({
					url: url
				});
			},
			initNavigation(e) {
				this.opacity = e.opacity;
				this.top = e.top;
			},
			opacityChange(e) {
				this.opacity = e.opacity;
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
.post{
	    position: fixed;
	    bottom: 150px;
	    left: 39%;
	    width: 22%;
	    margin: 0 auto;
	    text-align: center;
	    border-radius: 50px;
	    font-size: 16px;
	    font-weight: 600;
	    color: #fff;
	    height: 26px;
	    line-height: 26px;
	    background-color: var(--base);
}
	.module_head {
		position: relative;

		height: 110px;
		margin-top: 13px;
		padding: 13px;
		overflow: hidden;
		background-color: #fff;
		border-radius: 12px;
	}

	.module_head:after {
		content: '';
		position: absolute;
		left: 13px;
		top: 25px;
		width: 40px;
		height: 11px;
		background: linear-gradient(to right, rgba(47, 162, 255, 0.8), #ffffff);
		border-radius: 5px 0 0 5px;
		z-index: 1;
	}

	.head_title {
		position: absolute;
		left: 13px;
		top: 16px;
		font-size: 16px;
		font-weight: 600;
		color: #000;
		z-index: 2;
	}

	.container {
		margin: 13px;
		margin-bottom: 100px;

	}

	.forum {
		white-space: nowrap;
		position: absolute;
		top: 36px;
		left: 0;
	}

	.forum_cate {
		margin: 13px 0 0 13px;
		padding: 12px;
		border-radius: 6px;
		background: #082ac312;
		overflow: hidden;
		display: inline-block;
	}

	.topic_info {

		width: 100%;

	}

	.topic_item {



		line-height: 25px;
		font-size: 16px;

		overflow: hidden;


		.topic_icon {
			font-size: 16px;
			color: var(--base);
			font-weight: 500;
			margin-right: 5px;
		}

		.topic_name {
			display: block;
			font-size: 16px;
			height: 22px;
			font-weight: 600;
			line-height: 22px;
			padding-top: 4px;
			overflow: hidden;
			color: #333333;
		}

		.topic_num {

			display: block;
			height: 18px;
			line-height: 18px;
			font-size: 12px;
			padding-top: 2px;
			overflow: hidden;
			color: #bbbbbb !important;
		}
	}
</style>
