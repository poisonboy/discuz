<template>
	<view class="card">
		
		  <mp-html :content="html"></mp-html>
		 
	</view>
</template>

<script>

	const html = require('./content')
	import config from '../../utils/config.js';
	
	export default {
	
		
		data() {
			return {
				 html: '',
			};
		},
	onShareAppMessage() {
		this.webSiteName = config.WebsiteName;
	
		return {
			title: '隐私协议',
	
	
		}
	
	},
	//分享到朋友圈
	onShareTimeline() {
		this.webSiteName = config.WebsiteName;
		 
		return {
			title: '隐私协议' 
		}
	
	},
	 
		onLoad () {
		  // 模拟网络请求
		  setTimeout(() => {
		    this.html = html
		  }, 200)
		},
	}
</script>

<style lang="scss">
	
 .card {
            margin: 13px;
        }
        h1 {
            font-size: 1.5em;
            font-weight: 600;
            margin-bottom: 1em
        }

        h2 {
            font-size: 1em
        }
        
        p{
            font-weight: normal;
        }
</style>
