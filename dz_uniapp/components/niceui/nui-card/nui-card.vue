<template>
	<view class="container">

	 
			<view class="card_users  grid grid-5 "  style="overflow-x: scroll;">
				<view class=" card_users_item" v-for="(item, index) in cardlist" :key="index"  >
					<view class="item_avatar">
						<image class="image" :src="item.avatar" />
					</view>
					<!-- <view class="item_name">{{item.nickname}}</view>
					<view class="item_dec">{{item.threadCount}}帖子 </view><view class="item_dec">{{item.followCount}}关注 {{item.likedCount}}互动</view> -->

				</view>
			</view>
	 

	</view>
</template>

<script>
	export default {
		name: 'nui-card',
		data() {
			return {};
		},
		props: {
			cardlist: {
				type: [Object, Array],

			},
			siteName: {
				type: String,
				default: ''
			},
			siteTitle: {
				type: String,
				default: ''
			},
			countUsers: {
				type: Number,
				default: 0
			},
			countPosts: {
				type: Number,
				default: 0
			}
		}
	};
</script>

<style scoped lang="scss">
	 
	.container {
		background-color: #fff;
		margin: 13px;
		border-radius: 12px;
		padding: 13px;
	}

	.scroll {
		width: 100%;
		overflow: hidden;
		white-space: nowrap;
	}

	.card_users {
 
	}

	.card_users_item {

		 
		margin-right: 2%;

		padding: 10px 0;

		position: relative;
		text-align: center;

		.item_avatar {
			width: 40px;
			height: 40px;
			margin: 0 auto;
			padding: 3px;
    border: 2px solid var(--base-light);
    border-radius: 50%;
	 
			.image {
				background-color: #F1F1F1;
				width: 40px;
				height: 40px;
				border-radius: 50%;
				vertical-align: top;
			}
		}

		.item_name {
			height: 20px;
			line-height: 20px;
			margin-top: 5px;
			padding: 0 5px;
			text-align: center;
			font-size: 14px;
			overflow: hidden;
			//text-overflow: ellipsis;
			white-space: nowrap;
		}

		.item_dec {
			height: 16px;
			line-height: 16px;
			margin-bottom: 5px;
			padding: 0 5px;
			text-align: center;
			font-size: 12px;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
	}
</style>
