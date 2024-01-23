#  discuz论坛多端应用

使用discuz论坛作为后端生成微信、QQ、支付宝、头条抖音及百度小程序，并支持安卓或苹果APP.

## 目录说明

-  mobile：discuz掌上论坛插件
-  dzmini：原生微信小程序源码
-  dzmini_uni：微信小程序转换的uniapp，使用colorui组件美化
-  dz_uniapp：uniapp多端小程序源码，全部重新写的
## 使用说明
### 后端插件
1. 下载源码，把mobile目录覆盖discuz网站的source/plugin/mobile目录
2. 进入论坛后台，进入应用，找到掌上论坛插件并启用, 点击更新即可
3. 在discuz后台点击全局——手机访问——开启手机访问 
### 前端
#### 原生微信小程序
 1. 下载源码，在微信小程序开发者工具中导入dzmini目录 ，将appid改为你自己的
 2. 在小程序管理后台设置授权域名
 3. 修改小程序源码dzmini下的config.js配置文件，将域名换成您网站域名
 4. 测试没问题 提交上传审核即可

#### UniApp
1.  下载源码，使用HBuilderX导入dz_uniapp目录，点击manifest.json，修改其中的基础配置
2.  修改utils/config.js配置文件，将域名换成您网站域名,其他配置根据说明修改
3.  目前还有问题，需要自行二开，或者删除掉不能用的部分

## 演示截图
![微信小程序](https://github.com/poisonboy/discuz/blob/master/images/18shots_so.jpg?raw=true)
 


 

## 其他说明

遇到问题请提issues，提issues我有时间会回 

微信不接受任何咨询 也不做解答

如有二次开发或解决bug请记得共享

本程序二开自：https://github.com/Comsenz/Discuz-Api
