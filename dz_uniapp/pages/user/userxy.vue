<template>
	<view class="card">
		
		  <mp-html :content="html"></mp-html>
		 
	</view>
</template>

<script>

	const html = require('./contentxy.js')
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
			title: '用户协议',
	
	
		}
	
	},
	//分享到朋友圈
	onShareTimeline() {
		this.webSiteName = config.WebsiteName;
		 
		return {
			title: '用户协议' 
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

      .article {
                   
              }
      
              .title {
                  font-size: 20px;
                  font-weight: 600;
              }
      
              .content {
                  margin-top: 50px;
              }
      
              .updateTime {
                  margin-top: 10px;
              }
      
              .h1 {
                  margin-top: 40px;
                  font-weight: 500;
              }
      
              .h2 {
                  margin-top: 20px;
                  margin-left: 20px;
              }
      
              .p1 {
                  margin-top: 20px;
              }
      
              .p2 {
                  margin-left: 20px;
                  margin-top: 20px;
              }
      
              .p3 {
                  margin-left: 50px;
                  margin-top: 20px;
              }
      
              .ol1 {
                  margin-top: 20px;
              }
      
              .ol2 {
                  margin-left: 30px;
              }
      
              .ol3 {
                  margin-left: 50px;
              }
      
              .ol4 {
                  margin-left: 70px;
              }
</style>
