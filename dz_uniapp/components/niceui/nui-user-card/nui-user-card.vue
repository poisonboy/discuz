<template>
	<view>


		<view class=" card  " style="margin-top: 75px;">
			<view class=" row  users_card">
				<view class=" col-3">
					<view class="text-black text-l text-bold ml-10">活跃用户</view>

				</view>

			</view>
			<view class="grid grid-5 mt-10">

				<block v-for="(item,index) in userlist" :key="index">
					<view class="live-box my-20" >
						<image class="live-box-img" v-if="item.avatar" :src="item.avatar" mode="aspectFill"  @click="userClick(item)"/>
						<image class="live-box-img" src="../../../static/noavatar.gif"  @click="userClick(item)" v-else/>
				<!-- 		 <view class="text-black nickname">{{item.nickname}}</view>
					 <view class="text-xs text-gray text-cut">已发布{{item.threadCount}}帖子</view>  -->
					</view>
				</block>

			</view>
		</view>
		</view>

</template>

<script>
	import _tool from '@/components/niceui/tools.js';
	export default {
		name: 'nui-user-card',
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

		methods: {userClick(data) {
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

	.main {
		margin-top: 75px;

	}

	.card {
		background-color: #fff;
		border-radius: 12px;
		padding: 13px;
		margin: 13px;
	}

	.mb-5 {
		margin-bottom: 10rpx;
		padding-left: 5rpx;
		width: 140rpx;
	}

	.live-box {
		width: 44px;
		height: 44px;
		border-radius: 50%;

		margin: 5px auto;
		border: 2px solid var(--base-light);
	}

	.live-box-img {
		width: 40px;
		height: 40px;
		border-radius: 50%;
		background-color: #F2F4F5;
		margin: 2px;
	}

	

	
</style>
