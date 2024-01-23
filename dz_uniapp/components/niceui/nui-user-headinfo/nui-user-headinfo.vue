<template>
	<view class="container">
		<view class="user">
			<view class="user__left">
				<view class="user__avatar">
					<image :src="userdetail.avatarUrl|| userdetail.originalAvatarUrl"
						v-if="userdetail.avatarUrl|| userdetail.originalAvatarUrl" mode="aspectFill"></image>

					<image class="live-box-img" src="../../../static/noavatar.gif" v-else />

				</view>
			</view>
			<view class="user__body">
				<text class="user__title">
					<text>{{ userdetail.nickname || userdetail.username }}</text>
				</text>
				<view class="user__groupname" v-if="userdetail.group">
					<text> {{userdetail.group.groupName }}</text>

				</view>
				<view class="user__subtitle">
					<text> {{userdetail.signature||'Ta不是没有个性，只是懒的写个性签名' }}</text>

				</view>
			</view>
		</view>
		<view class="nav">
			<view class="grid grid-3 p-20 text-white text-bold">

				<view>
					粉丝

					<text style="margin-left: 3px;"> {{ userdetail.fansCount }}</text>
				</view>
				<view>
					关注
					<text style="margin-left: 3px;"> {{ userdetail.followCount }}</text>
				</view>
				<view>
					发帖
					<text style="margin-left: 3px;"> {{ userdetail.threadCount }}</text>
				</view>


			</view>
		</view>

		<!-- <view class="user__join-btn">
			<nui-icon name="search" color="#ffffff" :bold="true" size="16"></nui-icon>
			<text style="margin-left: 5px;">搜索一下你感兴趣的内容</text>
		</view> -->
	</view>
</template>

<script>
	export default {
		name: 'nui-headinfo',
		data() {
			return {};
		},
		props: {
			 
			userdetail: {
				type: [Object, Array],
			}
		}
	};
</script>

<style lang="scss">
	.container {
		position: absolute;
		bottom: 0;
		top: 60px;

		right: 0;
		z-index: 10;
		width: 698rpx;
		height: 160px;
		background-color: var(--base);
		opacity: 1;
		margin: 0 13px;

		box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 6px -1px;
		border-radius: 12px;
	}

	.user {
		padding: 20px 13px;
		overflow: hidden;
	}

	.user__left {
		padding-right: 13px;
	}

	.user__avatar {
		overflow: hidden;
		width: 56px;
		height: 56px;
		border: 1px solid #fff;
		background-color: var(--white);
		border-radius: 500px;
	
		image {
			width: 56px;
			height: 56px;
		}
	}
	

	.user__body {
		overflow: hidden;
		padding-top: 8px;
		margin-left: 10px;

	}

	.user__body,
	.user__left,
	.user__right {
		display: table-cell;
		vertical-align: top;
	}

	.user__title {
		color: #fff;
		font-weight: 400;
		font-size: 20px;
		line-height: 20px;
	}

	.user__subtitle {
		margin-top: 0;
		color: #fff;
		font-size: 14px;
		line-height: 20px;
	}

	.user__groupname {
		margin-top: 0;
		color: #fff;
		font-size: 12px;
		line-height: 16px;
	}

	.user__right {
		padding-top: 12px;
	}

	.nav {
		margin: 3px;
	}

	.user__join-btn {
		display: inline-block;

		margin: 0 13px;
		width: 646rpx;
		border-radius: 6px;
		color: #e9e6ec;
		background-color: #3069e4;
		justify-content: center;
		text-align: center;
	}

	.user__join-btn text {
		display: inline-block;
		vertical-align: middle;

		font-size: 14px;
		line-height: 30px;
	}
</style>
