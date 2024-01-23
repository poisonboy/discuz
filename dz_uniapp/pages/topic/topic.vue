<template>
	<view class="container">





		<mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="gettopics" :up="upOption">

			<view class="forum_cate" v-for="(item,index) in topicsList" :key="index">

				<view class="topic_info">
					<view class="topic_item" @click="itemClick(item)">


						<view class="topic_name">
							<text class="topic_icon">#</text>
							{{item.content}}
						</view>
						<view class="topic_num">帖数: {{item.threadCount}} 浏览: {{item.viewCount}} </view>


						<!-- <view class="" v-for="(item, index1) in item.threads" :key="index1" v-if="index1 < 1">
							{{item.title}}  
					</view> -->
					</view>
				</view>


			</view>


			<view class="safearea-bottom"></view>
		</mescroll-body>
	</view>
</template>

<script>
	var Api = require("../../utils/api.js");
	var util = require("../../utils/util.js");
	var wxApi = require("../../utils/wxApi.js");
	const Adapter = require("../../utils/adapter.js");
	var wxRequest = require("../../utils/wxRequest.js");
	import config from '../../utils/config.js';

	import MescrollMixin from '@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js';



	let interstitialAd = null
	export default {
		mixins: [MescrollMixin],
		
		data() {
			return {
				topicsList: {},

				upOption: {
					page: {
						num: 0,
						size: 10, // 每页数据的数量,默认10
					},

				}
			}
		},
		onShow: function(options) {


		},
		onLoad: function(options) {
	 


		},
		onShareAppMessage() {
			this.webSiteName = config.WebsiteName;

			return {
				title: this.webSiteName + '——' + '话题',


			}

		},
		//分享到朋友圈
		onShareTimeline() {
			this.webSiteName = config.WebsiteName;

			return {
				title: this.webSiteName + '——' + '话题',
			}

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



			gettopics(page) {
				//联网加载数据
				var num = page.num;
				var size = page.size;
				var gettopicsListRequest = wxRequest.getRequest(Api.gettopicsList(num,
					size));


				gettopicsListRequest.then(res => {
					//联网成功的回调,隐藏下拉刷新和上拉加载的状态;
					this.mescroll.endSuccess(res.data.Data.pageData.length);
					//如果是第一页需手动制空列表
					if (page.num == 1) this.topicsList = [];
					//追加新数据
					this.topicsList = this.topicsList.concat(res.data.Data.pageData);
				}).catch(() => {
					//联网失败, 结束加载
					this.mescroll.endErr();
				})
			},


			back() {
				uni.navigateBack();
			},



		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		}
	};
</script>

<style lang="scss">
	page {
		background: #f7f7fa;
	}

	.container {
		margin: 13px;
		margin-bottom: 100px;

	}


	.forum_cate {
		margin-top: 13px;
		padding: 13px;
		/* border-bottom: 1px solid #efefef !important; */
		overflow: hidden;
		background-color: #fff;
		border-radius: 12px;
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
