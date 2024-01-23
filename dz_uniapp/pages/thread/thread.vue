<template>
	<view class="">

		<view v-if="webtype==1">
			<web-view :src="webdomain"></web-view>
		</view>

		<view class="container" v-else>

 

			<mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="getcomments">



				<view>

					<view class="video-body" v-if="postlist[0] && (postlist[0].vids || postlist[0].videos && postlist[0].videos.attachment)">
					    <view class="video" v-if="postlist[0].videos && postlist[0].videos.attachment">
					        <video :src="postlist[0].videos.attachment" autoplay="true"></video>
					    </view>
					 

						<!-- #ifdef MP-WEIXIN -->
						<view class="txvlist" v-else>
							<txv-video id="tvp-id" playerid="tvp" :vid="postlist[0].vids[0]" controls>

							</txv-video>
						</view>
						<!-- #endif -->


						<view class="news-title text-xl">{{ title }}</view>
						<view class="sub-info">
							<view class="sub-left">
								<rich-text :nodes="diffTime"></rich-text>

								<text class="author" @click="cateClick()">{{ categoryName }}</text>
							</view>
							<view class="sub-right">{{ thread.views }}人看过</view>
						</view>

						<view class="news-content">
							<view class="article text-l">
								<mp-html :content="threaddetail" /> 
							</view>
						</view>
						<view class="post-note">
							<text style="font-weight: 800;">声明：</text>
							本站所有内容来自网友投稿发布。如若本站内容侵犯了原著者的合法权益，可联系{{wechat}}进行处理。
						</view>



					</view>
					<view class="" v-else>
						<!-- <view class="head">
							<nui-headbg height="140"></nui-headbg>
						</view> -->

						<view class="body">
							<!-- <view class="top">


								<view class="top_box" @click="userClick(postlist[0])" v-if="postlist[0] ">
									<view class="avatar">
<image v-if="postlist[0] && postlist[0].avatar" :src="postlist[0].avatar" mode="aspectFill" class="img">
									</view>
									<view class="user">
										<text class="username">{{ postlist[0].author }}</text>

									</view>
									<text class="lever"> {{ '这个人很懒，还没有签名'}}
									</text>
									<view class="top_follow "> 查看主页</view>
								</view>

							</view> -->




							<view class="news-title text-xl">{{ title }}</view>
							<view class="sub-info">
								<view class="sub-left">
									<rich-text :nodes="diffTime"></rich-text>

									<text class="author" @click="cateClick()">{{ categoryName }}</text>
								</view>
								<view class="sub-right">{{ thread.views }}人看过</view>
							</view>
							<view class="news-content">
								<view class="article text-l">
									<mp-html :content="threaddetail" />
								</view>
							</view>

							<view class="post-note">
								<text style="font-weight: 800;">声明：</text>
								本站所有内容来自网友投稿发布。如若本站内容侵犯了原著者的合法权益，可联系{{wechat}}进行处理。
							</view>
						</view>


					</view>

					<view class="bottom" v-if="commentsnum > 0">
						<view class="cmt-title">精彩评论（{{ commentsnum }}）</view>
						<view class="cmtbox">

							<view class="cmt-cell" v-for="(item, index) in comments" :key="index" v-if="index>0">
								<image :src="item.avatar" class="avatar" @click="userClick(item)" v-if="item.avatar"></image>
								<view class="cmt-detail">
									<view class="header-box" @click="userClick(item)">
										<view class="cmt-nickname">{{ item.author}}
											<text class="cmt-comauth" v-if="item.authorid == threaduserid">作者</text>
											<text class="cmt-comfirst bg-warning" v-else-if="index == 0">沙发</text>
											<text class="cmt-comfirst bg-info" v-else-if="index == 1">板凳</text>

										</view>
										<view class="fabulousprimary" :id="index"></view>
									</view>
									<view class="cmt-content text-l">
										<mp-html :content="item.message" lazy-load markdown />

									</view>
									<view class="reply-box" v-if="item.replyCount > 0">
										<nui-list-cell backgroundColor="#f2f2f2" :size="28"
											v-for="(items, index2) in item.lastThreeComments" :key="index2"
											:unlined="item.replyCount < 2">
											<view class="flex-1 reply-nickname text-base">
												<text @click="userClick(items)"> {{ items.user.nickname }}</text>

												<text class="cmt-comauth" v-if="items.user.id == threaduserid">作者</text>
												<text v-if="items.commentUser"
													style="margin:0 5px;opacity: 0.6;">回复</text>
												<text v-if="items.commentUser">{{ items.commentUser.nickname }}</text>
											</view>
											<view class="flex-1 ">
												<mp-html :content="items.content" />


											</view>
										</nui-list-cell>
										<nui-list-cell padding="20rpx 30rpx" backgroundColor="#f2f2f2" :size="28"
											:unlined="true" v-if="item.replyCount > 3" @tap="replyClick(item)">
											<view class="flex-1  cell-last">

												<text>查看全部{{ item.replyCount }}条回复</text>
												<icon name="arrowright" :size="22" color="var(--base)"></icon>
											</view>
										</nui-list-cell>
									</view>
									<view class="footer">
										<rich-text :nodes="item.dateline"></rich-text>
										<view class="primary ml" hover-class="opcity" :hover-start-time="150"
											@tap="replyClick1(item)">回复</view>
									</view>
								</view>
							</view>


						</view>

						<!--加载loadding-->

						<!--加载loadding-->
						<view class="safearea-bottom"></view>
					</view>
					<!-- 	<view class="replybox card" v-if="hasLogin">
						<view class="cmt-title">快速评论</view>
						<view class="textarea">
							<textarea v-model="content"></textarea>
						</view>
						<view style="text-align: right;">
							<button class="btn" @click="doReplyAction">发布</button>
						</view>
					</view> -->
					<nui-nomore backgroundColor="#fff" text="没有更多评论"></nui-nomore>
					<view class="operation">

						<view class="operation-right right-flex  ">
							<view class="operation-item" hover-class="opcity" :hover-stay-time="150" @tap="cmtAll">
						<!-- 		<image :src="userInfo.avatarUrl" mode="aspectFill" v-if="hasLogin"></image> -->
								<image src="/static/noavatar.gif" mode="aspectFill"  ></image>
							</view>


						</view>

						<view class="operation-left  ">
							<view class="btn-comment" @tap="btnCmt">发表你的评论...</view>
						</view>
					</view>

				</view>
			</mescroll-body>
		</view>
	</view>
</template>

<script>
	import {
		mapState,

	} from 'vuex'


	var Api = require("../../utils/api.js");


	var wxRequest = require("../../utils/wxRequest.js");
	import config from '../../utils/config.js';


	import MescrollMixin from '@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js';


	export default {
		mixins: [MescrollMixin],

		data() {
			return {
				content: "",
				thread: {},
				postlist: {},
				title: '',
				wechat: '', //微信号
 
				webtype: '', //webview开关
				domain: '', //域名
				webdomain: '', //详情页域名
				identifyData: [],
				threaduserid: '',
				threaddetail: '',
				categoryName: '',
				fid: '',
				diffTime: '',

				comments: {},
				commentsnum: 0,
				top: 0, //标题图标距离顶部距离
				opacity: 0,
				scrollTop: 0,
				tid: '',

			};
		},
		onShareAppMessage() {
			//console.log(this.data)
			this.webSiteName = config.WebsiteName;
			return {
				title: this.title + '——来自' + this.webSiteName + '的' + this.categoryName + '分类',

			}

		},
		//分享到朋友圈
		onShareTimeline(options) {
			//console.log(this.tid)
			this.webSiteName = config.WebsiteName;

			return {
				title: this.title + '——' + this.categoryName + '分类',
				query: 'id=' + this.tid,

			}

		},
		onLoad(options) {
			this.wechat = config.Wechat;


			// #ifndef MP-WEIXIN
			this.tid = options.id;
			// #endif
			// #ifdef MP-WEIXIN

			var obj = wx.getLaunchOptionsSync()
			if (options) {
				this.tid = options.id;
			} else {
				this.tid = obj.query.id;
			}
			// #endif
			this.webtype = config.WebType;

			this.domain = config.Domain;
			this.webdomain = 'https://' + config.Domain + '/thread/' + this.tid;

			this.getthreaddetail()


		},



		onShow() {

		},
		methods: {
			btnCmt: function() {
				if (!this.hasLogin) {
					uni.navigateTo({
						url: '../login/login'
					})
				} else {
					uni.navigateTo({
						url: '../comment/comment?id=' + this.tid
					})
				}
			},

			cateClick() {

				// 跳转到内部窗口并且传递链接

				var url = `/pages/list/list?id=` + this.fid + '&name=' + this.thread.forumnames;
				uni.navigateTo({
					url: url
				});
			},
			replyClick(data) {
				// 跳转到内部窗口并且传递链接
				// console.log(data)
				if (!this.hasLogin) {
					uni.navigateTo({
						url: '../login/login'
					})
				} else {
					var url = `/pages/thread/reply?id=` + data.id + '&tid=' + data.tid;
					console.log(url)
					uni.navigateTo({

						url: url
					});
				}
			},
			replyClick1(data) {
				// 跳转到内部窗口并且传递链接
				// console.log(data)
				if (!this.hasLogin) {
					uni.navigateTo({
						url: '../login/login'
					})
				} else {
					var url = `/pages/comment/comment?isComment=true&id=` + data.tid + '&replyId=' + data.id;
					console.log(url)
					uni.navigateTo({

						url: url
					});
				}
			},
			userClick(data) {
				// 跳转到内部窗口并且传递链接

				var url = `/pages/user/user?id=` + data.authorid;
				uni.navigateTo({
					url: url
				});
			},
			previewImage(index) {
				let photoList = this.threadimgs.map(item => {
					return item.thumbUrl;
				});
				uni.previewImage({
					current: index, // 当前显示图片的链接/索引值
					urls: photoList, // 需要预览的图片链接列表，photoList要求必须是数组
					loop: true // 是否可循环预览
				});
			},
			initNavigation(e) {
				this.opacity = e.opacity;
				this.top = e.top;
			},
			opacityChange(e) {
				this.opacity = e.opacity;
			},
			back() {
				uni.navigateBack();
			},
			getthreaddetail() {
				var getthreadRequest = wxRequest.getRequest(Api.getthreadByID(this.tid));

				getthreadRequest.then(res => {
					//联网成功的回调,隐藏下拉刷新和上拉加载的状态;
					this.postlist = res.data.Variables.postlist;
					this.thread = res.data.Variables.thread;
					this.title = this.thread.subject;
					this.categoryName = this.thread.forumnames;
					this.fid = this.thread.fid;
					this.diffTime = this.postlist[0].dateline;
					this.threaddetail = this.postlist[0].message
					this.threaduserid = this.postlist[0].authorid;
					this.commentsnum = this.thread.replies;

				}).catch(() => { //联网失败, 结束加载

				})
			},


			getcomments(page) {
				//console.log(data)
				//联网加载数据 
				var num = page.num;
				var size = page.size;
				var getpostslistRequest = wxRequest.getRequest(Api.getpostslist(this.tid, num,
					size));

				getpostslistRequest.then(res => {
					//联网成功的回调,隐藏下拉刷新和上拉加载的状态; 



					this.mescroll.endSuccess(res.data.Variables.postlist.length);
					if (page.num == 1) this.comments = [];
					//追加新数据
					this.comments = this.comments.concat(res.data.Variables.postlist);
				}).catch(() => { //联网失败, 结束加载
					this.mescroll.endErr();
				})
			},





		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		},
		computed: {
			...mapState(['hasLogin', 'userInfo']),
		},
	};
</script>

<style lang="scss">
	.top_follow {
		/* float: right; */
		position: absolute;
		right: 12px;
		top: 20px;
		height: 24px;
		line-height: 24px;
		padding: 0 6px;
		color: #fff;
		font-size: 12px;
		/* margin-top: 3px; */
		border-radius: 30px;
		background: var(--base);
	}



	.top_box {
		display: block;
		position: absolute;
		top: -40px;
		background: rgba(255, 255, 255, 0.25);
		box-shadow: 0 1px 10px 0 rgba(31, 38, 135, 0.37);
		backdrop-filter: blur(4px);
		-webkit-backdrop-filter: blur(4px);
		border-radius: 10px;
		border: 1px solid rgba(255, 255, 255, 0.18);
		height: 40px;
		width: 600rpx;
		padding: 12px;
		border-radius: 12px;
		overflow: hidden;

		.avatar {
			float: left;
			margin-right: 8px;
			width: 38px;
			height: 38px;
			border-radius: 50%;
			background: #f7f7f7;

			.img {
				width: 38px;
				height: 38px;
				border-radius: 50%;
			}
		}

		.user {
			display: block;
			height: 18px;
			line-height: 18px;
			padding: 2px 0;
			overflow: hidden;
			white-space: nowrap;

			.username {
				float: left;
				font-size: 14px;
				color: #333;
			}

		}

		.lever {

			font-size: 12px;
			color: #666;
			height: 20px;
			line-height: 20px;

		}
	}

	.sub-left {
		display: flex;
	}

	.replybox {
		padding: 0 30rpx;

		.rtitle {
			color: #000;
			font-weight: bold;
		}

		.textarea {
			margin-top: 15rpx;

			textarea {

				height: 150rpx;
				background: #ededed;
				color: #999;
				border-radius: 10rpx;
				padding: 10rpx;
				width: calc(100% - 20rpx);
			}
		}

		.btn {
			background-color: rgba(var(--base-rgb), 1);
			color: #fff;
			margin-top: 20rpx;
		}
	}

	.card {
		margin: 13px;
		padding: 12px;
		background-color: #fff;
		border-radius: 12px;
	}

	.container {
		padding-bottom: 120rpx;
		box-sizing: border-box;
	}

	/deep/ .md-p {
		margin: 5px 0;
	}

	.header {
		padding: 80rpx 90rpx 60rpx 90rpx;
		box-sizing: border-box;
	}

	.file-body {
		margin: 0 !important;
	}

	.title {
		color: #333;
		font-weight: 500;
	}

	.sub-title {
		font-size: 24rpx;
		color: #7a7a7a;
		padding-top: 18rpx;
	}

	.title {
		width: 100%;
		padding: 50rpx 30rpx 30rpx;
		box-sizing: border-box;
		font-weight: bold;
	}

	.header-bg {
		width: 100%;
		margin: 0;
	}

	.header-img {
		width: 100%;
		height: 440rpx;
		display: block;
	}

	.header-icon {
		width: 100%;
		position: fixed;
		top: 0;
		padding: 0 12rpx;
		display: flex;
		align-items: center;
		height: 32px;
		transform: translateZ(0);
		z-index: 99999;
		box-sizing: border-box;
	}

	.content-box {
		width: 100%;
		height: 44px;
		padding: 0 30rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
	}

	.avatar-box {
		width: 24px;
		height: 24px;
		border-radius: 50%;
		display: flex;
		margin-left: 10px;
		align-items: center;
		justify-content: center;
		border: 1px solid #eaeef1;
		flex-shrink: 0;

		.avatar {
			width: 20px;
			height: 20px;
			border-radius: 50%;
		}
	}

	.search-box {
		width: 100%;
		height: 32px;
		margin: 0 10rpx;
		border-radius: 18px;
		font-size: 14px;

		box-sizing: border-box;
		color: #fff;
		display: flex;
		align-items: center;
	}

	.mescroll-totop {
		margin-bottom: 50px !important;
	}

	.bg-white {
		background-color: #ffffff !important;
	}

	.search-text {
		padding-left: 10rpx;
	}

	.notice-box {
		position: relative;
		flex-shrink: 0;
		color: #fff;
	}

	video {
		width: 100%;
		height: 208px;
	}

	.video-body {
		background-color: #fff;
		border-radius: 0 0 12px 12px;
		padding-bottom: 13px;

		.post-note {
			margin: 12px;
		}

		.news-title,
		.sub-info {
			margin-left: 12px;
			margin-right: 12px;
		}

		.news-content {
			padding: 12px;
		}
	}

	.body {
		background-color: #ffffff;
		padding: 13px;
		margin: 0 ;
		border-radius: 0 0 12px 12px;
		position: relative;
	}

	.bottom {
		background-color: #ffffff;
		padding: 13px;
		margin: 13px;
		border-radius: 12px;

		.br {
			height: 6px;
			display: block;
		}

		._blockquote,
		.blockquote {
			font-size: 12px;
			line-height: 14px;
			border-left: 3px solid #78C0A8;
			position: relative;
			padding: 4px 8px;
			background-color: #f7f7f7;

			text {
				display: block;
			}
		}

		._blockquote::before,
		.blockquote::before {
			content: "“";
			color: #78C0A8;
			;
			font-size: 12px;
			position: absolute;
			left: 1px;
			top: 4px;
		}

		.aaa,
		.bbb {
			display: none;
		}
	}

	.post-note {
		position: relative;
		padding: 10px;
		margin-top: 10px;
		border: 1px solid transparent;
		border-radius: 12px;
		background-color: rgb(248, 249, 250);
		color: #555;
		border-color: #f8f9fa;
		font-weight: 400;
		font-size: 12px;
		line-height: 20px;
	}

	.news-title {
		 
		font-weight: 500;
	}

	.sub-info {
		padding-top: 12px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 14px;
		color: #333;
		opacity: 0.6;
	}

	.author {
		color: var(--base);
		border-radius: 30px;
		padding-left: 20rpx;
	}



	.txvlist {}

	.news-content {
		padding-top: 40rpx;
	}

	.article {
		/* text-indent: 2em; */

		padding-bottom: 13px;

		word-break: break-all;
		word-wrap: break-word;
	}

	.article-pic {
		width: 100%;
		display: block;
		margin-bottom: 40rpx;
	}

	.news-source {
		font-size: 24rpx;
		color: #999;
	}

	.operate-box {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 60rpx 40rpx;
		box-sizing: border-box;
	}

	.black {
		color: #333;
		padding-left: 12rpx;
	}

	.cmt-title {
		font-size: 16px;
		font-weight: bold;
		position: relative;
		padding-left: 13px;
	}

	.cmt-title::after {
		content: '';
		position: absolute;
		left: 0rpx;
		top: 18%;
		width: 6rpx;
		height: 64%;
		background: var(--base);
	}

	.cmtbox {
		padding-bottom: 20rpx;
	}

	.cmt-cell {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		padding-top: 44rpx;
	}

	.avatar {
		width: 64rpx;
		height: 64rpx;
		border-radius: 32rpx;
		display: block;
		flex-shrink: 0;
	}

	.cmt-detail {
		width: 100%;
		padding-left: 16rpx;
		box-sizing: border-box;
	}

	.header-box {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;

	}

	.cmt-nickname {
		color: var(--base);
	}

	.cmt-comauth {
		background: var(--base);
		opacity: 0.9;

	}

	.cmt-comauths {
		background: var(--base);
		opacity: 0.6;

	}

	.cmt-comfirst {

		opacity: 0.8;
	}

	.cmt-comauth,
	.cmt-comauths,
	.cmt-comfirst {


		display: inline-block;

		-webkit-text-size-adjust: none;
		-webkit-transform: scale(0.83, 0.83);
		margin-top: 1px;
		margin-left: 4px;
		font-size: 12px;
		height: 18px;
		line-height: 18px;

		border-radius: 4px;
		padding: 1px 4px;
		text-align: left;
		color: #fff;
	}

	.fabulous {
		color: #9a9a9a;
	}

	.fabulous text {
		padding-right: 4rpx;
		font-size: 24rpx;
	}

	.cmt-content {
		color: #333;

		padding-top: 8rpx;
		word-break: break-all;
		word-wrap: break-word;
	}

	.cmt-content-image {
		width: 150px;
		height: 150px;
	}

	.reply-box {
		border-radius: 12px;
		overflow: hidden;
		margin-top: 16rpx;
		padding: 0 10px;
		background-color: #f2f2f2;
	}

	.cell-last {
		display: flex;
		align-items: center;
		word-wrap: break-word;
		color: var(--base);
	}

	.flex-1 {
		flex: 1;

		display: inline;
	}

	.reply-nickname {
		color: #7a7a7a;
		font-weight: 600;
		padding-bottom: 8rpx;
	}

	.footer {
		display: flex;
		align-items: center;
		font-size: 24rpx;
		margin-top: 16rpx;
		color: #9a9a9a;
	}

	.primary {
		color: var(--base);
	}

	.ml {
		margin-left: 16rpx;
	}

	.operation {
		width: 100%;
		height: 112rpx;
		overflow: hidden;
		background: #fff;
		display: flex;
		align-items: center;

		position: fixed;
		left: 0;
		bottom: 0;
		padding: 0 26rpx;
		z-index: 99999;
		padding-bottom: env(safe-area-inset-bottom);
	}



	.operation::before {
		content: '';
		position: absolute;
		top: 0;
		right: 0;
		left: 0;
		border-top: 1rpx solid #eaeef1;
		-webkit-transform: scaleY(0.5);
		transform: scaleY(0.5);
	}

	.operation-left {
		display: flex;
		align-items: center;
		width: 612rpx;
		margin-left: 26rpx
	}

	.operation-item {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		position: relative;
	}

	.operation-item image {
		width: 60rpx;
		height: 60rpx;
		border-radius: 500px;
	}

	.operation-right {
		height: 112rpx;
		box-sizing: border-box;
		padding-top: 0;
	}

	.right-flex {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.btn-comment {
		height: 64rpx;
		width: 100%;
		background: #ededed;
		color: #999;
		border-radius: 25px;
		font-size: 28rpx;
		display: flex;
		align-items: center;
		padding-left: 20rpx;
		box-sizing: border-box;
		padding-top: 0;
	}



	.share-btn {
		display: block;
		background: none;
		margin: 0;
		padding: 0;
	}

	.nui-btn-box {
		padding: 10rpx 40rpx;
		box-sizing: border-box;
	}

	.nui-bottom-text {
		padding-top: 600px;
		text-align: center;
		font-size: 24rpx;
		color: #7a7a7a;
	}
</style>