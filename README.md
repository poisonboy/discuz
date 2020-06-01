#  discuz论坛多端应用

使用discuz论坛作为后端生成微信、QQ、支付宝、头条抖音及百度小程序，并支持安卓或苹果APP.

## 目录说明

-  mobile：discuz掌上论坛插件
-  dzmini：原生小程序源码
-  dzmini_uni：多端小程序源码

## 使用说明

1. 修改配置文件config_oauths.php， 将申请好的小程序 appkey appsecret填入并保存
2. 把mobile目录覆盖discuz网站的source/plugin/mobile目录
3. 进入论坛后台，进入应用，找到掌上论坛插件并启用, 点击更新即可
4. 在discuz后台点击全局——手机访问——开启手机访问及注册登录
5. 修改小程序源码dzmini下的config.js配置文件，将域名换成您网站域名
6. 测试没问题 提交上传审核即可
7.  dzmini_uni需使用uniapp的工具进行编译，目前还有问题

## 演示小程序

![](https://www.minapper.com/doc/server/../Public/Uploads/2020-06-01/5ed48e863f86c.jpg)

线上版本为自用版，可能部分功能不会放到github

## 其他说明

遇到问题请提issues，提issues我看到会回 
微信不接受任何咨询 也不做解答
如有二次开发或解决bug请记得共享

本程序二开自：https://github.com/Comsenz/Discuz-Api
