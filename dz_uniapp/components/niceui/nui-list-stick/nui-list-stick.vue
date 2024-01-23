<template>
	<view class="stick">
		<view class="stick__container">
			<view class="stick__list">
				<block v-for="(item, index) in sticklist" :key="index" >
					<view class="stick__item" @click="itemClick(item)" v-if="item.special==0&item.price==0">
						<text class=" stick__title-hot">置顶</text>
						<text class="stick__title">{{ item.subject }}</text>
					</view>
				</block>

			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'nui-list-stick',
		data() {
			return {};
		},
		props: {
			sticklist: {
				type: [Object, Array],

			},
		},
		methods: {
			itemClick(data) {
				// 跳转到内部窗口并且传递链接
				var url = `/pages/thread/thread?id=` + data.tid;
				uni.navigateTo({
					url: url
				});
			}
		}
	};
</script>

<style scoped lang="scss">
	.stick {
		margin: 0px 13px 13px 13px;
		
	}

	.stick__container {
		padding: 12px ;

		border-radius: 0 0 12px 12px;
		background: #fff;
	}

	.stick__item {
		display: flex;
		position: relative;
		padding: 8px 0;
		color: #272829;
		font-size: 0;
		margin-top: 2px;
	}

	.stick__title {
		display: inline-block;
		vertical-align: middle;
		overflow: hidden;
		flex: 1;
		font-size: 16px;
		line-height: 16px;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.stick__title-hot {
		display: inline-block;
		vertical-align: middle;
		height: 16px;
		margin-right: 8px;
		padding-right: 3px;
		padding-left: 3px;
		border-radius: 4px;
		background-color: var(--base);
		color: #fff;
		font-size: 10px;
		line-height: 16px;
		letter-spacing: 0;
		text-align: center;
	}
</style>