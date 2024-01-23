<template>
	<view>
		<!--首页-->
		<block :show="tabID==0?true:false" v-if="loadOn.home">
			<mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="getindexList" :up="upOption"
				:toTop='toTop'>
				 
				<nui-home-index :sticklist="sticklist" :hotuserlist='hotuserlist'  
					:indexlist="indexlist" :scrollTop="scrollTop" :opacity="opacity">
				</nui-home-index>
			</mescroll-body>
		</block>

		<!--发现-->

		<nui-home-cate  :topicslist="topicslist" :catelist="categories"
			:show="tabID==1?true:false" v-if="loadOn.cate"></nui-home-cate>

		<!--话题-->
		<nui-home-find :topicslist="topicslist" :webtype="webtype" :postdomain="postdomain" :show="tabID==2?true:false"
			v-if="loadOn.find" />

		<!--排行-->

		<nui-home-rank :newreplylist="newreplylist" :essencelist="essencelist" :hotlist="hotlist"
			:sequencelist="sequencelist" :show="tabID==3?true:false" v-if="loadOn.rank"></nui-home-rank>

		<!--我的-->
		<nui-home-user :hotuserlist='hotuserlist'   :uerInfo="uerInfo"
			:hasLogin="hasLogin" :bindLogin="bindLogin" :scrollTop="scrollTop" :opacity="opacity"
			:show="tabID==4?true:false" v-if="loadOn.my" />

		<!--底部导航-->
		<nui-tabbar :tabID='tabID' :msgDot='true' @tabTap='tabTap' />
		<!-- #ifndef MP -->
		<nui-ysxy @popupState="popupState" title="服务协议" protocolPath='../user/userxy' policyPath='../user/userys'
			policyStorageKey="has_read_privacy"></nui-ysxy>
		<!-- #endif -->
	</view>
</template>

<script>
	//加载组件

	import {
		mapState,
		mapMutations
	} from 'vuex';
	//固定组件

	var Api = require("../../utils/api.js");
	var util = require("../../utils/util.js");
	var wxApi = require("../../utils/wxApi.js");
	const Adapter = require("../../utils/adapter.js");
	var wxRequest = require("../../utils/wxRequest.js");
	import config from '../../utils/config.js';

	//工具函数
	import _tool from '@/components/niceui/tools.js';
	import MescrollMixin from '@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js';
	let interstitialAd = null

	export default {
		computed: mapState(['hasLogin', 'uerInfo']),
		mixins: [MescrollMixin],

		data() {
			return {
				loadOn: {
					home: true,
					cate: false,
					find: false,
					rank: false,
					my: false
				},
				statusBarHeight: 0,
				tabID: 0,
				tabIndex: 0,
				title: ' ',
				sharetitle: '',
				sharedec: '',
				webtype: '',
				postdomain: '',
				userdomain: '',
				domain: '',
			 
				categories: [], 
				topicslist: {},
				sticklist: {},
				hotuserlist: {},
				indexlist: {},
				Sitenav: {},
				essencelist: {},
				hotlist: {},
				sequencelist: {},
				newreplylist: {},
				isActive: 0,
				navList: [{
						index: 0,
						title: '最新回复'
					},
					{
						index: 1,
						title: '精华内容'
					},
					{
						index: 2,
						title: '站长推荐'
					}

				],
				top: 0, //标题图标距离顶部距离
				opacity: 0,
				scrollTop: 0,
				upOption: {
					page: {
						num: 0,
						size: 8, // 每页数据的数量,默认10
					},

				},
				toTop: {
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
			}
		},
		onShareAppMessage() {
			//console.log(this.data)
			let self = this
			return {
				title: self.sharetitle + '——' + self.sharedec,
				path: '/pages/index/index',

			}

		},
		//分享到朋友圈
		onShareTimeline(res) {
			let self = this
			return {
				title: self.sharetitle + '——' + self.sharedec,
				query: '',
				imageUrl: "this.sharetitle"
			}

		},

		onLoad() {
			//console.log(this.sharetitle)

			// this.getforumList();
			this.getstickList();
			this.getnewreplyList();
			this.gethotuserList();
			this.getcategoriesList();
			// this.gettopicsList();
			this.webtype = config.WebType;
			this.domain = config.Domain;
			this.siteName = config.WebsiteName
			this.postdomain = '/pages/webview/webview?url=https://' + config.Domain + '/thread/post/';


		},

		onReady() {

		},
		methods: {
			...mapMutations(['logout']),
			bindLogin() {
				if (this.hasLogin) {
					this.logout()
				} else {
					uni.navigateTo({
						url: '/pages/login/login'
					})
				}
			},
			popupState(state) {
				console.log(state);
			},

			tabTap(index) {
				this.tabIndex = this.tabID;
				if (index == 0 && !this.loadOn.home) {
					this.loadOn.home = true;
					this.loadOn.cate = false;
					this.loadOn.find = false;
					this.loadOn.rank = false;
					this.loadOn.my = false;
					uni.setNavigationBarTitle({
						title: this.siteName
					})
				}
				if (index == 1 && !this.loadOn.cate) {
					this.loadOn.home = false;
					this.loadOn.cate = true;
					this.loadOn.find = false;
					this.loadOn.rank = false;
					this.loadOn.my = false;
					uni.setNavigationBarTitle({
						title: '频道'
					})


				}
				if (index == 2 && !this.loadOn.find) {
					this.loadOn.home = false;
					this.loadOn.cate = false;
					this.loadOn.find = true;
					this.loadOn.rank = false;
					this.loadOn.my = false;
					uni.setNavigationBarTitle({
						title: '发现'
					})
				}
				if (index == 3 && !this.loadOn.rank) {
					this.loadOn.home = false;
					this.loadOn.cate = false;
					this.loadOn.find = false;
					this.loadOn.rank = true;
					this.loadOn.my = false;

					// this.getsequenceList();
					this.gethotList();
					this.getessenceList();
					uni.setNavigationBarTitle({
						title: '排行'
					})

				}
				if (index == 4 && !this.loadOn.my) {
					this.loadOn.home = false;
					this.loadOn.cate = false;
					this.loadOn.find = false;
					this.loadOn.rank = false;
					this.loadOn.my = true;
					uni.setNavigationBarTitle({
						title: '我的'
					})
				}
				this.tabID = index;
				//设置颜色

				uni.pageScrollTo({
					scrollTop: 0,
					duration: 0
				});
			},
			sellCloseTap() {
				this.tabTap(this.tabIndex);
			},



			itemClick(data) {
				// 跳转到内部窗口并且传递链接
				var url = `/pages/thread/thread?id=` + data.tid;
				uni.navigateTo({
					url: url
				});
			},

			 
			getcategoriesList() {

				var getcategoriesRequest = wxRequest.getRequest(Api.getcategoriesList());
				getcategoriesRequest.then(res => {
					console.log("API Response:", res); // 打印整个响应

					// 验证数据是否存在
					 

					this.catelist = res.data.Variables.catlist;
					this.forumlist = res.data.Variables.forumlist;

					 
					let categories = this.catelist.map(cat => ({
						...cat,
						children: []
					}));

					this.forumlist.forEach(forum => {
						let category = categories.find(cat => cat.forums && cat.forums.includes(forum
						.fid));
						if (category) {
							category.children.push(forum);
						} else {
							console.error("Category not found for forum:", forum);
						}
					});

					this.categories = categories;
				}).catch(error => {
					console.error("Error fetching categories:", error); // 日志记录错误
				});
			},

			// gettopicsList() {
			// 	var gettopicsRequest = wxRequest.getRequest(Api.gettopicsList());
			// 	gettopicsRequest.then(res => {
			// 		//console.log(res);
			// 		this.topicslist = res.data.Data.pageData;
			// 	}).catch(() => {})
			// },
			gethotuserList() {
				var gethotuserListRequest = wxRequest.getRequest(Api.gethotuserList());
				gethotuserListRequest.then(res => {
					//console.log(res);
					this.hotuserlist = res.data.Variables.rankusers;
				}).catch(() => {})
			},

			getstickList() {
				var getstickListRequest = wxRequest.getRequest(Api.getstickList());
				getstickListRequest.then(res => {
					//console.log(res);
					this.sticklist = res.data.Variables.data;
				}).catch(() => {})
			},

			getindexList(page) {
				// this.gethotuserList();
				//联网加载数据
				var num = page.num;
				var size = page.size;
				//console.log(page);
				var getIndexlistRequest = wxRequest.getRequest(Api.getIndexlist(num, size));
				getIndexlistRequest.then(res => {
					//console.log(res);
					//联网成功的回调,隐藏下拉刷新和上拉加载的状态;
					this.mescroll.endSuccess(res.data.Variables.data.length);
					//如果是第一页需手动制空列表
					if (page.num == 1) this.indexlist = [];
					//追加新数据
					this.indexlist = this.indexlist.concat(res.data.Variables.data);
				}).catch(() => {
					//联网失败, 结束加载
					this.mescroll.endErr();
				})

			},

			getessenceList() {


				var getessencelistRequest = wxRequest.getRequest(Api.getessencelist());
				getessencelistRequest.then(res => {

					this.essencelist = res.data.Variables.data;
				}).catch(() => {})

			},
			 


			gethotList() {

				//联网加载数据

				var gethotlistRequest = wxRequest.getRequest(Api.gethotlist());
				gethotlistRequest.then(res => {
					//console.log(res);

					this.hotlist = res.data.Variables.data;
				}).catch(() => {

				})

			},

			getnewreplyList() {

				//console.log(page);
				var getnewreplylistRequest = wxRequest.getRequest(Api.getnewreplylist());
				getnewreplylistRequest.then(res => {
					//console.log(res);

					this.newreplylist = res.data.Variables.data;
				}).catch(() => {

				})

			},

			checked(index) {
				this.isActive = index;
			},


			onClick(e) {
				var domain = config.Domain;
				var url = `/pages/webview/webview?url=` + domain + 'thread/post';
				uni.navigateTo({
					url: url
				});
			}
		},
		onPageScroll(e) {

			this.scrollTop = e.scrollTop;

		}
	}
</script>

<style lang="scss">
	//@import "/static/colorui/icon.css"; 
	// @import "../../components/niceui/app.scss";




	.tab_nav {
		display: flex;
		justify-content: center;
		align-items: center;
		position: sticky;
		top: 0;
		z-index: 99;
	}

	.tab_nav .navTitle {
		height: 90rpx;
		line-height: 90rpx;
		width: 100%;
		text-align: center;
		font-size: 32rpx;
		font-family: Alibaba PuHuiTi;
		color: #333;
	}

	.active {
		position: relative;
		color: #1f75fe;
	}

	.active::after {
		content: '';
		position: absolute;
		width: 100rpx;
		height: 4rpx;
		background-color: #1f75fe;
		left: 0px;
		right: 0px;
		bottom: 0px;
		margin: auto;
	}
</style>