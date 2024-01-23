export default {
	data() {
		return {}
	},
	onShareAppMessage(res) {
		return {
			title: '',
			path: '',
			success(res) {
				uni.showToast({
					title: '分享成功'
				})
			},
			fail(res) {
				uni.showToast({
					title: '分享失败',
					icon: 'none'
				})
			}
		}
	},
	onShareTimeline() {},
}
