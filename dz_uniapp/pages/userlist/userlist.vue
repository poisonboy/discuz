<template>
	<view class="container">
		<!-- 站点信息 -->
		<mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback" :up="upOption">
 
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
				userId: 0,
				searchKey: "", 
				upOption: {
					page: {
						num: 1,
						size: 10, // 每页数据的数量,默认10
					},

				}
			}
		},
		onShow: function(options) {


		},
		onLoad: function(options) {
			console.log(options);

			// #ifdef MP-WEIXIN
			var obj = uni.getLaunchOptionsSync()
			if (options) { 
				this.userId = options.id;
			} else {
				this.userId = obj.query.id;
			}
			// #endif

			// #ifndef MP-WEIXIN 
			this.userId = options.id;
			// #endif
			 


		},
	 
	 
		methods: {
		 
			//获取分类列表



			upCallback(page) {
				//联网加载数据
				var num = '1';
				var size = '10';
				var id = this.userId
				console.log(id,'num',num)
				var getfollowRequest = wxRequest.getRequest(Api.getfollowList(id,num));


				getfollowRequest.then(dataList => {
					
					//如果是第一页需手动制空列表
					if (page.num == 1) this.dataList = [];
					//追加新数据
					this.dataList = this.dataList.concat(dataList.data.Data.pageData);
					//联网成功的回调,隐藏下拉刷新和上拉加载的状态;
					this.mescroll.endSuccess(dataList.data.Data.pageData.length);
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

</style>
