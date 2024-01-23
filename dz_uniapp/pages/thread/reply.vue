<template>
	<view class="container">
		<mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="getcomments">
			<view class="nui-cmt-primary nui-card">
				<view class="nui-cmt-cell nui-cell-last">
					<view class="nui-header-box">
						<view class="nui-userinfo-box" @click="userClick(comment)">
							<image :src="comment.user.avatar" class="nui-avatar"></image>
							<view class="nui-nickname-box">
								<view class="nui-cmt-nickname">{{comment.user.nickname}}</view>
								<view class="nui-cmt-time">{{comment.createdAt}}</view>
							</view>
						</view>

					</view>
					<view class="nui-cmt-content">{{comment.content}}</view>
				</view>
				<view class="nui-operation">
					<view class="nui-operation-inner">
						<view class="nui-btn-comment" @tap="btnCmt(comment)">回复楼主...</view>
					</view>
				</view>
			</view>

			<view class="nui-card">


				<view class="nui-cmt-title" v-if="comment.replyCount">全部回复（{{comment.replyCount}}）</view>
				<view class="nui-cmtbox">
					<view class="nui-cmt-cell" v-for="(item, index) in comments" :key="index">
						<view class="nui-header-box">
							<view class="nui-userinfo-box" @click="userClick(item)">
								<image :src="item.user.avatar" class="nui-avatar"></image>
								<view class="nui-nickname-box">
									<view class="nui-cmt-nickname">{{ item.user.nickname }}<text v-if="item.commentUser"
							style="margin:0 5px;opacity: 0.6;">回复</text>
						<text v-if="item.commentUser">{{ item.commentUser.nickname }}</text></view>

								</view>
							</view>

						</view>

						<view class="nui-cmt-content">
							<mp-html :content="item.content" />
						</view>
						<view class="footer">
							{{ item.createdAt }}
							<view class="primary ml" hover-class="opcity" :hover-start-time="150" @tap="btnCmt1(item)">回复
							</view>
						</view>
					</view>
				</view>



				<!--加载loadding-->

				<nui-nomore backgroundColor="#fff" text="没有更多回复"></nui-nomore>
				<!--加载loadding-->
			</view>
			<view class="nui-safearea-bottom"></view>
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

				comments: {},
				comment: {
					user: {}
				},
				tid: '',
				commentsnum: 0,
				top: 0, //标题图标距离顶部距离
				opacity: 0,
				scrollTop: 0,
				commentid: '',
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
			//console.log(this.commentid)
			this.webSiteName = config.WebsiteName;

			return {
				title: this.title + '——' + this.categoryName + '分类',
				query: 'id=' + this.commentid,

			}

		},
		onLoad(options) {

			// #ifndef MP-WEIXIN
			this.commentid = options.id;
			this.tid = options.tid;
			// #endif
			// #ifdef MP-WEIXIN
			this.getchaAd();
			var obj = wx.getLaunchOptionsSync()
			if (options) {
				this.commentid = options.id;
				this.tid = options.tid;
			} else {
				this.commentid = obj.query.id;
				this.tid = obj.query.tid;
			}
			// #endif

			console.log(this.pid)
			//this.getpostsdetail(this.commentid);
			//this.getcomments(this.commentid);


		},



		onShow() {

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

			},	refresh(){
				this.getcomments({
					size: 10,
					num: 1
				});
			},
			btnCmt(data) {
				// 跳转到内部窗口并且传递链接

				var url = `/pages/comment/comment?isComment=true&id=` + this.tid + '&replyId=' + data.id;
				uni.navigateTo({
					url: url
				});
			},
			btnCmt1(data) {
				// 跳转到内部窗口并且传递链接
			
				var url = `/pages/comment/comment?isComment=true&id=` + this.tid + '&replyId=' + data.id + '&commentPostId=' + data.id ;
				uni.navigateTo({
					url: url
				});
			},
			
			userClick(data) {
				// 跳转到内部窗口并且传递链接

				var url = `/pages/user/user?id=` + data.userId;
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


			getcomments(page) {
				//联网加载数据
				var num = page.num;
				var size = page.size;
				var getpostsdetailRequest = wxRequest.getRequest(Api.getpostsdetail(this.commentid, num,
					size));


				getpostsdetailRequest.then(res => {
					// console.log('666',res)
					//如果是第一页需手动制空列表

					this.comments = res.data.Data.commentPosts;
					this.comment = res.data.Data
					this.commentsnum = res.data.Data.totalCount;
					//联网成功的回调,隐藏下拉刷新和上拉加载的状态;
					this.mescroll.endSuccess(res.data.Data.commentPosts.length);


				}).catch(() => {
					//联网失败, 结束加载
					this.mescroll.endErr();
				})
			},

		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		}
	};
</script>

<style lang="scss">
	page {

		color: #333;
	}

	.footer {
		display: flex;
		align-items: center;
		font-size: 24rpx;
		margin-bottom: 16rpx;
		color: #9a9a9a;
	}

	.ml {
		margin-left: 16rpx;
	}

	.primary {
		color: var(--base);
	}

	.container {
		padding-bottom: 110rpx;
		box-sizing: border-box;
	}

	.nui-card {
		background-color: #ffffff;
		padding: 13px;
		margin: 0 13px 20px 13px;
		border-radius: 12px;
	}

	.nui-empty {
		width: 100%;
		height: 10rpx;
		background-color: #eaeef1;
	}

	.nui-cmt-title {
		font-size: 30rpx;
		font-weight: bold;
		position: relative;
		padding: 20rpx 30rpx;
		box-sizing: border-box;
		margin-bottom: 20rpx;
	}

	.nui-cmt-title::after {
		content: '';
		position: absolute;
		left: 12rpx;
		top: 30%;
		width: 6rpx;
		height: 40%;
		background: var(--base);
	}

	.nui-cmt-cell {
		width: 100%;
		padding: 13px 0;
		box-sizing: border-box;
		position: relative;
	}



	.nui-cell-last::after {
		border-bottom: 0 !important;
	}

	.nui-header-box {
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 28rpx;
	}

	.nui-userinfo-box {
		display: flex;
		align-items: center;
	}

	.nui-avatar {
		width: 64rpx;
		height: 64rpx;
		border-radius: 32rpx;
		display: block;
		flex-shrink: 0;
	}

	.nui-nickname-box {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding-left: 12rpx;
		padding-top: 4rpx;
		height: 60rpx;
	}

	.nui-cmt-nickname {
		color: var(--base);
		line-height: 28rpx;
	}

	.nui-cmt-time {
		font-size: 24rpx;
		line-height: 24rpx;
		color: #9a9a9a;
		transform: scale(0.8);
		transform-origin: 0 100%;
	}

	.nui-fabulous {
		color: #9a9a9a;
	}

	.nui-fabulous text {
		padding-right: 4rpx;
		font-size: 24rpx;
	}

	.nui-cmt-content {
		font-size: 32rpx;
		color: #333;
		text-align: justify;
		padding: 13px 0;
		word-break: break-all;
		word-wrap: break-word;
	}

	.nui-reply-box {
		border-radius: 8rpx;
		overflow: hidden;
		margin-top: 16rpx;
	}

	.nui-cell-class {
		flex-direction: column;
		justify-content: flex-start !important;
		padding: 20rpx !important;
		text-align: justify;
		word-break: break-all;
		word-wrap: break-word;
	}

	.nui-flex-1 {
		flex: 1;
		width: 100%;
	}

	.nui-reply-nickname {
		font-size: 24rpx;
		color: #7a7a7a;
		padding-bottom: 8rpx;
	}

	.nui-operation {
		width: 100%;
		padding: 0 30rpx;
		box-sizing: border-box;
		overflow: hidden;
		background: rgba(255, 255, 255, 0.95);
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 99999;
	}

	.nui-operation-inner {
		height: 100rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-bottom: env(safe-area-inset-bottom);
	}

	.nui-safearea-bottom {
		width: 100%;
		height: env(safe-area-inset-bottom);
	}

	.nui-operation::before {
		content: '';
		position: absolute;
		top: 0;
		right: 0;
		left: 0;
		border-top: 1rpx solid #eaeef1;
		-webkit-transform: scaleY(0.5);
		transform: scaleY(0.5);
	}

	.nui-btn-comment {
		height: 64rpx;
		width: 100%;
		background: #ededed;
		color: #999;
		border-radius: 8rpx;
		font-size: 28rpx;
		display: flex;
		align-items: center;
		padding-left: 20rpx;
		box-sizing: border-box;
		padding-top: 0;
	}

	.nui-primary {
		color: var(--base);
	}
</style>
