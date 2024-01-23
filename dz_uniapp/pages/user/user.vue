<template>
	<view class="container">
		<!-- 导航 -->
		 
		<!-- 背景图 -->
		<nui-headbg :height="120"></nui-headbg>

		<nui-user-headinfo :userdetail='userdetail'></nui-user-headinfo>
		<view class="dq-forum">




			<mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="getuserthread"
				:up="upOption">

				<nui-list :indexlist="dataList"></nui-list>
			</mescroll-body>
		</view>
		<view class="safearea-bottom"></view>


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


	export default {
		mixins: [MescrollMixin],
		
		data() {
			return {
				userdetail: {},
				dataList: {},
				userid: '',
				avatarUrl: '',
				show: false,
				mode: 'date',
				upOption: {
					page: {
						num: 0,
						size: 10, // 每页数据的数量,默认10
					},

				}

			};
		},
		onLoad: function(options) {
			this.userid = options.id
			this.getuserdetail(options);
			this.getuserthread(options);

		},

		methods: {

	back() {
				uni.navigateBack();
			},
			getuserdetail(page) {
				//联网加载数据
				var getuserdetailRequest = wxRequest.getRequest(Api.getuserdetail(this.userid));
				getuserdetailRequest.then(res => {
					//console.log(res.data)
					this.userdetail = res.data.Data;
					this.avatarUrl = res.data.Data.avatarUrl;
				}).catch(() => {
					//联网失败, 结束加载

				})
			},
			getuserthread(page) {
				//联网加载数据
				var num = page.num;
				var size = page.size;
				var getuserthreadRequest = wxRequest.getRequest(Api.getuserthread(this.userid, num,
					size));

				getuserthreadRequest.then(dataList => {
					console.log(dataList.data.Data.pageData)
					//联网成功的回调,隐藏下拉刷新和上拉加载的状态;
					this.mescroll.endSuccess(dataList.data.Data.pageData.length);
					//如果是第一页需手动制空列表
					if (page.num == 1) this.dataList = [];
					//追加新数据
					this.dataList = this.dataList.concat(dataList.data.Data.pageData);
				}).catch(() => {
					//联网失败, 结束加载
					this.mescroll.endErr();
				})
			},
			initNavigation(e) {
				this.opacity = e.opacity;

			},
			opacityChange(e) {
				this.opacity = e.opacity;
			}

		}
	}
</script>

<style lang="scss">
	.dq-forum {
		margin-top: 50px;
	}

	.container { 
		top: 10px !important;
	}
</style>
