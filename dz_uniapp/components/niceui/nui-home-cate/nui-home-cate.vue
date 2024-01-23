<template>

	<view class="container">
		<!-- <nui-navigation-bar backgroundColor="var(--base)" :isFixed="true" :isOpacity="false" title="频道">

		</nui-navigation-bar> -->
		<!-- <view style="width:100%;margin-top: 44px;" :style="{ height: statusBarHeight + 'px' }">

		</view> -->

	 
	 


	<!-- 	<view class="forum_top">
			<view class="topic">
				<view class="topic_title "><text class="topic_title_more" @click="topicmore()">更多</text>热议话题</view>
				<view class="topic_list">
					<view class="topic_list_item" v-for="(item,index) in topicslist" :key="index"
						@click="topicClick(item)"><text class="topic_icon">#</text> {{item.content}}
					</view>

				</view>

			</view>
		</view> -->

		<view class="forum_cate">

			<view v-for="(item,index) in catelist" :key="index" class="cate_list">
				<view class="cate_item1" @click="itemClick(item)">

					<view class="cate_name">{{item.name}}</view>


				</view>
				<view v-for="(item1,index1) in item.children" :key="index1" class="cate_info"  >
					<view class="cate_item" @click="itemClick(item1)">
						<view class="cate_icon">
							<image class="img" v-if="item1.icon"
								:src="item1.icon" mode="aspectFill">
							<image class="img" v-else
								:src="'https://ui-avatars.com/api/?background=random&length=1&font-size=0.23&name='+item1.name">
						</view>
						<view class="cate_name">{{item1.name}}</view>
						<view class="cate_num">帖数:{{item1.threads}}  帖数:{{item1.posts}}</view>

					</view>
				</view>
				 
			</view>


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
			catelist: {
				type: [Object, Array],

			},
			setSite: {
				type: [Object, Array],


			},
			Sitenum: {
				type: [Object, Array],

			},
			topicslist: {
				type: [Object, Array],

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
			topicClick(data) {
				// 跳转到内部窗口并且传递链接
				//var url = `/pages/webview/webview?url=` + API_URL + 'thread/' + data.tid;
				var url = `/pages/list/lists?id=` + data.topicId + '&name=' + data.content;
				uni.navigateTo({
					url: url
				});
			},
			topicmore(data) {
				// 跳转到内部窗口并且传递链接
				//var url = `/pages/webview/webview?url=` + API_URL + 'thread/' + data.tid;
				var url = '/pages/topic/topic';
				uni.navigateTo({
					url: url
				});
			},
			itemClick(data) {
				// 跳转到内部窗口并且传递链接
				//var url = `/pages/webview/webview?url=` + API_URL + 'thread/' + data.tid;
				var url = `/pages/list/list?id=` + data.fid + '&name=' + data.name;
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

	.container {
		margin: 13px;
		padding-bottom: 100px;

	}

	.forum_ad {

		padding: 13px;
		position: relative;

		display: block;
		background-color: #ffffff;
		border-radius: 12px 12px 0 0;

		.forum_ad_img {
			width: 100%;
			max-height: 150px;
			vertical-align: top;
			border-radius: 12px;
			overflow: hidden;
		}

		.forum_ad_text {
			position: absolute;
			position: absolute;
			right: 16px;
			bottom: 16px;
			padding: 0 4px;
			width: 32px;
			height: 20px;
			line-height: 20px;
			background: rgba(0, 0, 0, 0.3);
			color: #f7f2f2;
			font-size: 12px;
			text-align: center;
			border-radius: 12px;
		}
	}

	.forum_top {

		padding: 13px;
		/* border-bottom: 1px solid #efefef !important; */
		overflow: hidden;
		background-color: #fff;
		border-radius: 0 0 12px 12px;
	}

	.topic {


		.topic_title {
			font-size: 16px;
			line-height: 24px;
			color: #000;
			font-weight: 700;

			.topic_title_more {
				float: right;
				font-size: 14px;
				font-weight: 400;
			}
		}

		.topic_list {
			height: 90px;
			padding-top: 3px;
			overflow: hidden;

			.topic_list_item {
				float: left;
				margin: 6px 6px 0 0;
				display: inline-block;
				height: 24px;
				line-height: 24px;
				overflow: hidden;
				padding: 0 8px;
				border-radius: 12px;
				border-color: #f1f1f1;
				background: #f9f9f9;
				color: #333
			}

			.topic_icon {
				font-size: 16px;
				color: var(--base);
				font-weight: 500;
				margin-right: 5px;
			}
		}

	}


	.forum_top_num {
		.item {
			float: left;
			text-align: center;
			width: 33.3%;

			box-sizing: border-box;
			color: #333;

			.text {
				display: block;
				font-size: 16px;
				line-height: 20px;

				overflow: hidden;
				color: #333;
			}

			.num {
				line-height: 16px;
				height: 16px;
				font-size: 12px;
				opacity: 0.8;
			}


		}

		.border {
			border-right: 1px solid #efefef !important;
		}

	}

	.forum_cate {
		margin-top: 13px;
	
		/* border-bottom: 1px solid #efefef !important; */
		overflow: hidden;
	
	}

	.cate_info {
		float: left;
		width: 48%;
		padding: 10px 1%;
	}

	.cate_list {
			padding: 13px;
		margin-bottom: 10px;
		overflow: hidden;
		background-color: #fff;
		border-radius: 12px;
	}

	.cate_item {

		display: flex;
		height: 46px;
		line-height: 25px;
		font-size: 16px;

		overflow: hidden;
		position: relative;

		.cate_icon {
			width: 46px;
			height: 46px;
			margin-right: 8px;

			.img {
				float: left;
				width: 46px;
				height: 46px;
				background-color: #f7f7fa;
				border-radius: 12px;
			}
		}

		.cate_name {
			display: block;
			font-size: 16px;
			height: 22px;
			line-height: 22px;
			padding-top: 4px;
			overflow: hidden;
			color: #333333;
		}

		.cate_num {
			position: absolute;
			top: 23px;
			left: 54px;
			display: block;
			height: 18px;
			line-height: 18px;
			font-size: 12px;
			padding-top: 6px;
			overflow: hidden;
			color: #bbbbbb !important;
		}
	}

	.cate_item1 {

		 
		height: 44px;
		line-height: 44px;
		overflow: hidden;

		.cate_name {
			font-size: 16px;
			height: 24px;
			line-height: 24px;
			margin: 10px 0;
			color: #333333;
			font-weight: 400;
			padding: 0 10px;
		}


	}
</style>
