<template>
	<view>
		<mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="getvideoList" :up="upOption"
			:toTop='toTop'>
			<nui-list-video :indexlist="videoList"></nui-list-video>
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
				videoList: {},
				upOption: {
					page: {
						num: 0,
						size: 8, // 每页数据的数量,默认10
					},

				},	toTop: {
					src: null,
					offset: 1000,
					duration: 300,
					zIndex: 9990,
					right: 20,
					bottom: 180,
					safearea: false,
					width: 72,
					radius: "50%",
					left: null
				}
			};
		},
	onShareAppMessage() {
		this.webSiteName = config.WebsiteName;
	
		return {
			title: this.webSiteName + '——' + '视频',
	
	
		}
	
	},
	//分享到朋友圈
	onShareTimeline() {
		this.webSiteName = config.WebsiteName;
		 
		return {
			title: this.webSiteName + '——' + '视频' 
		}
	
	},
		onLoad(page) {
			this.getvideoList(page);
			
		},
		methods: {
			getvideoList(page) {

				//联网加载数据
				var num = page.num;

				//console.log(page);
				var getvideoListRequest = wxRequest.getRequest(Api.getvideoList(num));
				getvideoListRequest.then(videoList => {
					//console.log(indexlist);
					//联网成功的回调,隐藏下拉刷新和上拉加载的状态;
					this.mescroll.endSuccess(videoList.data.Data.pageData.length);
					//如果是第一页需手动制空列表
					if (page.num == 1) this.videoList = [];
					//追加新数据
					this.videoList = this.videoList.concat(videoList.data.Data.pageData);
				}).catch(() => {
					//联网失败, 结束加载
					this.mescroll.endErr();
				})

			}
		},
	}
</script>

<style lang="scss">

</style>
