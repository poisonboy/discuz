<template>
	<view>
		<nui-list :indexlist="videolist"></nui-list>
	 
		 

	</view>
</template>

<script>
	export default {

		data() {
			return {
					videolist: {},

			}
		},
		computed: {

		},
	 
		methods: {
		getvideoList() {
			return new Promise((resolve, reject) => {
				this.$api('video', {})
					.then(res => {
						//console.log( res.Data);
						this.videolist = res.Data.pageData;
						
						resolve(true);
					})
					.catch(e => {
						resolve(false);
						// console.log(e);
					});
			});
		}},
	 }
</script>

<style scoped lang="less"> 
</style>
