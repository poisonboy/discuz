<template>
	<view class="lists">
		<!-- #ifdef MP-WEIXIN -->
		<block v-for="(item, index) in indexlist" :key="index"
			v-if="(item.summary) || (!item.summary && item.vids && item.vids.length > 0)||(item.attachlist&&item.attachlist.length>0)||(item.videoList&&item.videoList.length>0)">
		<!-- #endif -->
			<!-- #ifndef MP-WEIXIN -->
			<block v-for="(item, index) in indexlist" :key="index"
				v-if="(item.summary) ||(item.attachlist&&item.attachlist.length>0)||(item.videoList&&item.videoList.length>0)">
			<!-- #endif -->
				<view class="list" v-if="item.special==0&&item.price==0">


					<view class="list-head">
						<image class="heardimg" :src="item.avatar" mode="aspectFill" @click="userClick(item)">
						</image>
						<view class="info">
							<text class="name" @click="userClick(item)">{{ item.author }}</text>

							<text class="lever" v-if="item.groupname"
								@click="userClick(item)">{{ item.groupname }}</text>

							<!-- <view class="cate" @click="cateClick(item)">

							<nui-icon name="hash" color="#333" size="12"></nui-icon>
							{{ item.forumname }}
						</view> -->

						</view>
						<view class="date">
							<rich-text type="text" :nodes=" item.dateline " class="rich-text"></rich-text>
						</view>
					</view>
					<view class="list-body">
						<view class="list-content" @click="itemClick(item)">
							<view class="title" v-if="item.subject">{{ item.subject }}</view>
							<view class="dec" v-if="item.summary">
								<mp-html :content=" item.summary " class="rich-text"></mp-html>

							</view>
						</view>



						<view class="txv" v-if="item.videoList" @click="itemClick(item)">

							<video :src="item.videoList[0].attachment" muted autoplay="true">

							</video>
						</view>
						<!-- #ifdef MP-WEIXIN -->
						<view class="txv" v-else-if="item.vids" @click="itemClick(item)">



							<txv-video id="tvp-id" :playerid="item.vids[0]" :vid="item.vids[0]" muted
								border-radius='4px'>

							</txv-video>
						</view>
						<!-- #endif -->

						<view class="" v-else>
							<view class="list-images" @click="itemClick(item)" v-if="item.attachlist.length>0">
								<block v-for="(img, index2) in item.attachlist" :key="index2"
									v-if="index2 < 9&img.type=='image'">


									<image class="item" :src="img.attachment" mode="widthFix"
										v-if="item.attachlist.length == 1">
									</image>


									<view class="item" v-else>
										<image class="itemimage" :src="img.attachment" mode="aspectFill"></image>
									</view>
								</block>
							</view>

						</view>
						<view class="list-footer" @click="itemClick(item)">
							<view class="item">
								<view class="num">
									<nui-icon name="eye" size="18" color="#333"></nui-icon>
									<text style="margin-left: 3px;">{{ item.views  }}</text>
								</view>
							</view>
							<view class="item2" style="margin-left: 10px;">
								<view class="num">
									<nui-icon name="message-2" size="18" color="#333"></nui-icon>
									<text style="margin-left: 3px;">{{ item.replies }}</text>
								</view>
							</view>
							<view class="item2">
								<view class="num">
									<nui-icon name="thumb-up" size="18" color="#333"></nui-icon>
									<text style="margin-left: 3px;">{{ item.favtimes }}</text>
								</view>
							</view>
						</view>
					</view>

				</view>
			</block>

	</view>





</template>

<script>
	export default {
		name: 'nui-list',
		data() {
			return {};
		},
		props: {
			indexlist: {
				type: [Object, Array],

			}
		},
		methods: {
			fillText(t) {

				return t.replace(/<[^>]+>/g, "")
			},

			itemClick(data) {
				// 跳转到内部窗口并且传递链接

				var url = `/pages/thread/thread?id=` + data.tid;
				uni.navigateTo({
					url: url
				});
			},
			cateClick(data) {
				// 跳转到内部窗口并且传递链接

				var url = `/pages/list/list?id=` + data.fid + '&name=' + data.forumname;
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
			}

		}
	};
</script>

<style lang="scss">
	/deep/ uni-swiper .uni-swiper-wrapper {
		overflow-y: auto !important;
	}

	/deep/ uni-swiper-item {
		overflow-y: auto !important;
	}

	video {
		width: 323px;
		height: 180px;
		border-radius: 4px;
	}

	.rich-text {
		word-break: break-all;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 3;
		overflow: hidden;
		color: #333;
		font-size: 14px;
	}

	.lists {
		margin: 0 13px;
	}

	.list {
		background: #ffffff;
		overflow: hidden;
		position: relative;

		border-radius: 12px;
		margin-top: 15px;
		padding: 13px;
	}

	.list-body {
		margin-top: 10px;
	}

	.list-head {
		margin: 0 0 0 50px;
		overflow: hidden;

		.heardimg {
			position: absolute;
			top: 13px;
			left: 13px;
			width: 40px;
			height: 40px;
			border-radius: 50%;
			background: #f8f8f8;
		}

		.info {
			display: block;
			height: 20px;
			line-height: 20px;
			margin-top: 2px;

			.name {
				float: left;
				font-size: 14px;
				color: #333333;
				text-overflow: ellipsis;
				/* 超出部分省略号 */
				display: -webkit-box;
				/** 对象作为伸缩盒子模型显示 **/
				-webkit-box-orient: vertical;
				/** 设置或检索伸缩盒对象的子元素的排列方式 **/
				-webkit-line-clamp: 1;

				line-height: 20px;
				overflow: hidden;
				max-width: 80px;
			}

			.lever1,
			.lever {
				float: left;

				color: #ffffff;
				margin-top: 1px;
				margin-left: 4px;
				font-size: 12px;
				height: 18px;
				line-height: 18px;
				padding: 0 3px;
				border-radius: 4px;
			}

			.lever {
				background-color: var(--base);
			}

			.lever1 {
				background-color: #888888;
			}

			.cate {
				float: right;
				font-size: 14px;

				height: 20px;
				line-height: 20px;
				border-radius: 20px;
				background-color: var(--base-light);
				padding: 2px 8px;
			}
		}

		.date {
			display: block;
			font-size: 12px;
			height: 18px;
			line-height: 18px;
			opacity: 0.6;
			color: #333333;
			font-weight: 400;
		}
	}

	.list-content {
		margin-bottom: 12px;

		.title {
			font-size: 16px;
			line-height: 22px;

			color: var(--black);
		}

		.dec {
			word-break: break-all;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 3;
			overflow: hidden;
			color: #333;
			font-size: 14px;
		}
	}

	.list-images {
		margin: 1px 0 8px 0;
		font-size: 0;
		overflow: hidden;
		position: relative;

		.item:nth-child(3n) {
			margin-right: 0;
		}

		.itemimage1 {
			width: 200px;

			object-fit: cover;
			position: absolute;
		}

		.item {
			float: left;
			width: 32.6%;
			height: 103px;
			max-height: 225px;
			margin-top: 1.1%;
			margin-right: 1.1%;
			box-sizing: border-box;
			position: relative;
			overflow: hidden;
			background: #f8f8f8;
			border-radius: 4px;

			.itemimage {
				width: 100%;
				height: 100%;
				object-fit: cover;
				position: absolute;
			}
		}
	}

	.list-video {
		margin: 1px 13px 8px 13px;
		font-size: 0;
		overflow: hidden;
		position: relative;
		z-index: 8;

		.item {
			float: left;
			width: 315px;
			height: 178px;

			margin-top: 1.1%;

			box-sizing: border-box;
			position: relative;
			overflow: hidden;
			background: #f8f8f8;
			border-radius: 12px;

			.itemvideo {
				width: 100%;
				height: 100%;
				object-fit: cover;
				position: absolute;
				z-index: 9;
			}
		}
	}

	.txv {
		overflow: hidden;
		margin-bottom: 8px;
	}

	.list-footer {
		height: 20px;
		line-height: 20px;
		margin: 0 13px;

		.item2 {
			float: right;
		}

		.item {
			float: left;
		}

		.item,
		.item2 {
			font-size: 14px;
			padding-left: 0;
			overflow: hidden;

			.num {
				font-weight: 400;
				color: #333;
				display: block;
				opacity: 0.6;
				line-height: 20px;
				border-radius: 15px;
			}
		}
	}
</style>