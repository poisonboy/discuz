<template>
	<view class="container">
		<!-- 导航 -->
		<nui-navigation-bar @init="initNavigation" @change="opacityChange" :scrollTop="scrollTop" title="Discuz!Q"
			background="var(--base)" />
		<!-- 背景图 -->
		<nui-headbg :bgsrc="setSite.siteBackgroundImage"></nui-headbg>

		<view class="dq-forum">

			<!-- 站点信息 -->
		
			
		 
			<nui-list :indexlist="indexlist"></nui-list>

		</view>
		<!-- 站点信息 -->
		<view class="safearea-bottom"></view>


		<nui-nomore backgroundColor="#fff" text="没有更多帖子了"></nui-nomore>


	</view>
</template>

<script>

	export default {

		
		data() {
			return {

			};
		},
		props: {
			setSite: {
				type: [Object, Array],

			},
			Sitenum: {
				type: [Object, Array],


			},
			catelist: {
				type: [Object, Array],

			},
			indexlist: {
				type: [Object, Array],

			},
			sticklist: {
				type: [Object, Array],

			},
			hotuserlist: {
				type: [Object, Array],

			},
			Sitenav: {
				type: [Object, Array],

			},

			scrollTop: {
				type: Number,
				default: 0
			}
		},


		methods: {
			initNavigation(e) {
				this.opacity = e.opacity;

			},
			opacityChange(e) {
				this.opacity = e.opacity;
			},




		},

		onPageScroll(e) {

			this.scrollTop = e.scrollTop;

		},

	};
</script>

<style lang="scss">
	page {
		background: #f7f7fa;
	}

	.dq-forum {}
</style>
