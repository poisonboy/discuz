<template>
	<view class="card" v-if="hasLogin">
		<view class="cells">
			<textarea class="textarea" name="desc" placeholder="发表你的评论..." maxlength="500" v-model="content"
				placeholder-class="phcolor-color" @input="descInput($event)" auto-focus></textarea>
			<view class="textarea-counter">{{remnant}}/500</view>
		</view>

		<view class="cmt-btn">
			<button class="circle btn bg-base" @click="doReplyAction">发表</button>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	import {
		doReply
	} from '../../utils/api.js';

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
				remnant: "0",
				content: "",
				id: '',
				replyId: '',
				isComment: false,
				commentPostId: '',
			};
		},


		onLoad(options) {

			this.replyId = options.replyId;
			this.id = options.id;
			this.isComment = options.isComment;

			this.commentPostId = options.commentPostId;
			if (!this.hasLogin) {
				console.log('未登录')
			} else {
				console.log('已登录')
			}

		},



		onShow() {

		},
		methods: {
			descInput: function(e) {

				this.remnant = e.detail.cursor
			},

			doReplyAction() {

				let _this = this
				let postData = {
					content: this.content,
					id: this.id,
					isComment: this.isComment,
					commentPostId: this.commentPostId,
					replyId: this.replyId,
				}
				doReply(postData).then(res => {
					if (res.data.Code === 0) {
						//

						_this.content = ""
						uni.showToast({
							icon: 'success',
							title: '回复成功',
							duration: 2000
						});
						let pages = getCurrentPages(); // 当前页面
						let beforePage = pages[pages.length - 2]; // 前一个页面
						console.log("beforePage", beforePage);
						console.log(pages);
						uni.navigateBack({

							success: function() {
								beforePage.$vm.refresh(); // 执行前一个页面的刷新
							}
						});


					}
					else{
					uni.showToast({
						icon: 'error',
						title: res.data.Message,
						duration: 2000
					});
					}
				})
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


		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		},
		computed: {
			...mapState(['hasLogin', 'userInfo']),
		},
	};
</script>


<style>
	.card {
		margin: 13px;
		padding: 12px;
		background-color: #fff;
		border-radius: 12px;
	}



	.container {
		padding: 30rpx;
		box-sizing: border-box;
	}

	.cells {
		border-radius: 6px;
		height: 280rpx;
		background: #ededed;
		color: #333;
		box-sizing: border-box;
		padding: 20rpx 20rpx 0 20rpx;
		position: relative;
	}



	.textarea {
		height: 210rpx;
		width: 100%;
		color: #333;
		font-size: 28rpx;
	}

	.phcolor-color {
		color: #999;
	}

	.textarea-counter {
		font-size: 24rpx;
		color: #333;
		text-align: right;
		height: 40rpx;
		line-height: 40rpx;
		padding-top: 4rpx;
	}

	.enclosure {
		display: flex;
		align-items: center;
		padding: 26rpx 10rpx;
		box-sizing: border-box;
	}

	.cmt-btn {
		margin-top: 60rpx;
		text-align: right;
	}
</style>
