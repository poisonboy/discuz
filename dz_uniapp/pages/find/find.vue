<template>
	<view class="container">
		<!-- 站点信息 -->
		<mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback" :up="upOption">

			<nui-list :indexlist="dataList"></nui-list>
		</mescroll-body>
		<nui-nomore backgroundColor="#fff" text="没有更多帖子了"></nui-nomore>
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
				dataList: {},
				cateinfo: {},
				catename: '',
				search: '',
				categories: 0,
				searchKey: "",
				isCategoryPage: "",
				upOption: {
					page: {
						num: 0,
						size: 5, // 每页数据的数量,默认10
					},

				}
			}
		},
		onShow: function(options) {


		},
		onLoad: function(options) {
		this.fetchPostsData();

		},
		onShareAppMessage() {
			this.webSiteName = config.WebsiteName;

			return {
				title: this.webSiteName + '——' + this.catename + '话题',


			}

		},
		//分享到朋友圈
		onShareTimeline() {
			this.webSiteName = config.WebsiteName;

			return {
				title: this.webSiteName + '——' + this.catename + '话题'
				
			}

		},
		methods: {
			getchaAd: function() {


				//#ifdef MP-WEIXIN	
				if (wx.createInterstitialAd) {
					interstitialAd = wx.createInterstitialAd({
						adUnitId: 'adunit-bb0c7ed29c490a71'
					})
					interstitialAd.onLoad(() => {})
					interstitialAd.onError((err) => {})
					interstitialAd.onClose(() => {})
				}
				if (interstitialAd) {
					interstitialAd.show().catch((err) => {
						console.error(err)
					})
				}
				//#endif	

			},
			formSubmit: function(e) {

				var url = '../list/list';

				if (e.detail.value.input != '') {
					url = url + '?search=' + e.detail.value.input;
				}

				uni.navigateTo({
					url: url
				});
			},
			//获取分类列表



			upCallback(page) {
				//联网加载数据
				var num = page.num;
				var size = page.size;
				var getCategoryRequest = wxRequest.getRequest(Api.getCategoryByID(this.categories, num,
					size));


				getCategoryRequest.then(dataList => {
					//联网成功的回调,隐藏下拉刷新和上拉加载的状态;
					this.mescroll.endSuccess(dataList.data.Variables.data.length);
					//如果是第一页需手动制空列表
					if (page.num == 1) this.dataList = [];
					//追加新数据
					this.dataList = this.dataList.concat(dataList.data.Variables.data);
				}).catch(() => {
					//联网失败, 结束加载
					this.mescroll.endErr();
				})
			},

			//获取文章列表数据
			fetchPostsData: function(data) {
				var self = this;
				if (!data) data = {};
				if (!data.page) data.page = 1;
				if (!data.categories) data.categories = 0;
				if (!data.search) data.search = '';
				if (data.page === 1) {
					self.postsList = []
				};
				self.isLoading = true

				var getPostsRequest = wxRequest.getRequest(Api.getPosts(data));
				getPostsRequest.then(response => {

				}).catch(function() {

				}).finally(function() {
					uni.hideLoading();

					self.isLoading = false

				});
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

</style>
