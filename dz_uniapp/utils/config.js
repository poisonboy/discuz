const Domain = "dzpyq.xcxgy.cn";//网站域名dzpyq.xcxgy.cn
const WebsiteName = "站长圈"; //网站名称
const Wechat = "微信：poisonkid ";//帖子页 联系方式
const Notice = "/pages/thread/thread?id=48991";//我的页面 官方公告 比如https://discuz.chat/thread/48991的id就是48994
const About = "/pages/user/user?id=27652";//我的页面 关于我们
const Update = "/pages/list/list?id=6&name=官方动态";//我的页面 更新日志id

const Chaad = "adunit-bb0c7ed29c490a71";// 插屏广告id 不用写
const PageCount = '10'; //每页文章数目

const WebType= '0'; //webview开关 1为开启 0为关闭 开启后帖子详情页和用户中心会使用网页版 不建议每个端都开启 根据自己需求开启
 

const _home_data = {  
	banner() {
		return [

			{
				image: '/static/1.png',//轮播图图片网址
				// plugin-private://wx34345ae5855f892d/pages/productDetail/productDetail?productId=1145653
				path: '/pages/thread/thread?id=50494',//轮播图跳转的帖子
			}, {
				image: '/static/2.png',//轮播图图片网址
				path: '/pages/thread/thread?id=54569',//轮播图跳转的帖子
			}, {
				image: '/static/3.png',//轮播图图片网址
				path: '/pages/thread/thread?id=48991',//轮播图跳转的帖子
			}
		];
	},
	nav1() {
		return [{
			id: 1,
			name: '图库',
			bgcolor: 'orange',
			path: '/pages/media/image',
			img: '/static/photo.png',
		}, {
			id: 2,
			name: '视频',
			color: 'orange',
			path: '/pages/media/video',
			img: '/static/video.png',
		}, {
			id: 3,
			name: '音频',
			color: '',
			path: '/pages/media/audio',
			img: '/static/music.png',
		}, {
			id: 4,
			name: '文件',
			color: '',
		path: '/pages/media/file',
			img: '/static/files.png',
		} ,  ];
	},
 
 	nav2() {
 		return [  {
 			id: 1,
 			name: '直播LIVE',
 			color: '',
 			path: 'plugin-private://wx2b03c6e691cd7370/pages/live-player-plugin?room_id=2',
 			img: '/static/music.png',
 		}, {
 			id: 2,
 			name: '在线商城',
 			color: '',
 		path: 'plugin-private://wx34345ae5855f892d/pages/productDetail/productDetail?productId=1145653',
 			img: '/static/files.png',
 		} ];
 	},
 
 
 };

 
export default {
	_home_data,
	Domain,
	WebsiteName,
	Wechat,
	PageCount,
	Chaad,
	Notice,
	About,
	Update,
	WebType
	
	
};
