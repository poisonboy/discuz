<template>
	<view>
		<nui-navigation-bar backgroundColor="var(--base)" :isFixed="true" :isOpacity="false" title="话题">

		</nui-navigation-bar>
		<web-view   :src="url"></web-view>
	</view>

</template>

<script>
	let view = null;
	export default {
		data() {
			return {
				url: '',
			 
			}
		},
		onLoad(option) {
			console.log(option.url);
			this.url = option.url;
			this.creatView();
		},
		onUnload() {
			view.close();
		},
		methods: {
			creatView() {
				view = new plus.nativeObj.View('test', {
					top: '10px',
					left: '10px',
					height: '35px',
					width: '35px'
				});
				// 绘制文本
				view.drawRect({
					color: 'rgba(0,0,0,0.8)',
					radius: '20px'
				}, {
					top: '0px',
					left: '0px',
					width: '35px',
					height: '35px'
				});
				view.drawText('返回', {}, {
					size: '13px',
					color: '#ffffff'
				});
				view.show();
				// plus.nativeUI.toast('创建成功');
				view.addEventListener("click", this.onClick, false);
			},
			onClick(e) {
				uni.navigateBack({})
			}
		}
	}
</script>

<style>

</style>
