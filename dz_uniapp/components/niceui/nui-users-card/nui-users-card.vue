<template>
	<view class="container">
		<view class=" row  users_card">
			<view class="live-box col-3">
				<view class="text-black text-l text-bold ml-10">活跃用户</view>
				<view class="cu-tag bg-base round-pill text-center mb-5 text-sm   ">
					<text>最近登录</text>
					<text class="cuIcon-right text-xs"></text>
				</view>
				<!--赚钱滚动信息-->
				<view class="user-list-box">
					<swiper class="swiper" disable-touch :touchable="false" autoplay circular vertical
						previous-margin="23.5rpx" next-margin="23.5rpx" interval="1000" :current="indexs"
						@animationfinish="earnSwiper">
						<swiper-item v-for="(item,index) in  swiperlist" :key="index">
							<view class="swiper-padding">
								<view class="flex flex-wrap swiper-item" :class="index == indexs?'show':''">
									<view class="basis-xs">
										<image class="img" v-if="item.avatar" :src="item.avatar" mode="aspectFill"
											@click="userClick(item)" />
										<image class="img" src="../../../static/noavatar.gif" v-else />
									</view>
									<view class="basis-xl text-cut">
										<text class="text-xs nickname">{{item.username}} </text>
									</view>
								</view>
							</view>
						</swiper-item>
					</swiper>
				</view>
			</view>
			<view class="recommend-scroll-box col-9">
				<scroll-view class="recommend-scroll" scroll-x>
					<block v-for="(item,index) in userlist" :key="index">
						<view class="live-box recommend-scroll-item text-center users_card_list"
							@click="userClick(item)">
							<image class="img" v-if="item.avatar" :src="item.avatar" mode="aspectFill"
									@click="userClick(item)" />
								<image class="img" src="../../../static/noavatar.gif" v-else />
							<view class="text-black nickname">{{item.username}}</view>
							<view class="text-xs text-gray text-cut">获得{{item.credits}}积分</view>
						</view>
					</block>
				</scroll-view>
			</view>
		</view>
	</view>
</template>

<script>
	import _tool from '@/components/niceui/tools.js';
	export default {
		name: 'nui-users-card',
		data() {
			return {
				indexs: 0
			};
		},
		props: {
			swiperlist: {
				type: [Object, Array],

			},
			userlist: {
				type: [Object, Array],

			},
		},

		methods: {
			userClick(data) {
				// 跳转到内部窗口并且传递链接

				var url = `/pages/user/user?id=` + data.userId;
				uni.navigateTo({
					url: url
				});
			},
			earnSwiper(e) {
				this.indexs = e.detail.current;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.nickname {
		// text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 1;
		line-height: 20px;
		overflow: hidden;
		max-width: 90px;
		margin-left: 5px;
	}

	.recommend-scroll-box {
		position: relative;

		overflow: hidden;

		.recommend-scroll {
			position: relative;
			height: 100px;
			white-space: nowrap;
			width: 100%;
			padding-left: 5px;

			.recommend-scroll-item {
				display: inline-block;
				padding-top: 15px;
				width: 100px;

				.cu-btn {
					&:after {
						border-radius: 18.18rpx;
					}

					.cuIcon-add {
						font-size: 27.27rpx;
					}
				}
			}
		}
	}

	.container {
		background-color: #fff;
		margin: 0 13px 13px 13px;
		border-radius: 12px;
		padding: 13px;
	}

	.mb-5 {
		margin-bottom: 10rpx;
		padding-left: 5rpx;
		width: 140rpx;
	}

	.users_card {
		.live-box {
			position: relative;

			.flex-wrap {
				background-color: #FAFAFA;
				border-radius: 16rpx 16rpx;

				.basis-xs {
					flex-basis: 30%;
					width: 30%;

					.img {
						width: 100%;
						border-radius: 25%;
					}
				}

				.basis-xl {
					flex-basis: 70%;
					width: 70%;
				}
			}
		}

		.user-list-box {
			.swiper {
				height: 92rpx;

				swiper-item {
					height: 46rpx !important;

					.swiper-padding {
						padding: 4rpx 0;
					}

					.swiper-item {
						border-radius: 37rpx 37rpx;
						opacity: .5;
						transition: opacity .2s;

						.img {
							width: 37rpx !important;
							height: 37rpx !important;
							border-radius: 100% !important;
						}

						.basis-xs {
							flex-basis: 24%;
							width: 24%;
						}

						.basis-xl {
							line-height: 37rpx;
							flex-basis: 76%;
							width: 76%;

							text {
								color: #838383;
								margin-left: 6rpx;
							}
						}
					}

					.swiper-item.show {
						opacity: 1;
						transition: opacity .2s;
					}
				}
			}
		}

		.users_card_list {
			.img {
				width: 40px;
				height: 40px;
				border-radius: 50%;
				background-color: #F2F4F5;
			}
		}

		.flex {
			display: flex;
		}
	}
</style>
