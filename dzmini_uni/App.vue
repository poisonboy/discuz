<template>
<view>
</view>
</template>
<script>
//app.js
import apimanager from "./utils/apimanager";
const commonLoginUrl = require("./config").commonLoginUrl;
const checkUrl = require("./config").checkUrl;
const loginmanager = require("./utils/loginManager");

export default {
  onLaunch: function () {
    this.globalData.apimanager.getRequest(checkUrl).then(res => {
      this.globalData.regname = res.regname;
    });
    this.globalData.uid = wx.getStorageSync('uid');
    this.globalData.relogin(true);
    const accountInfo = wx.getAccountInfoSync();
    console.log(accountInfo.miniProgram.envVersion); // 小程序 appId

    this.globalData.appdev = accountInfo.miniProgram.envVersion; // 获取用户信息

    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo;
            }
          });
        }
      }
    });
  },
  globalData: {
    relogin(isInit) {
      // 登录
      wx.login({
        success: res => {
          let dic = {
            code: res.code
          };
          this.apimanager.getRequest(commonLoginUrl, dic).then(res => {
            if (res.Message.messageval == "login_succeed") {
              this.uid = res.Variables.member_uid;

              if (!isInit) {
                wx.showToast({
                  title: '登录成功！',
                  icon: 'none'
                });
              }
            } else if (res.Message.messageval == 'no_bind') {
              loginmanager.openid = res.Variables.openid;
              loginmanager.unionid = res.Variables.unionid;
            }
          }).catch(res => {});
        }
      });
    },

    appdev: '',
    userInfo: null,
    uid: '',
    formhash: '',
    repliesrank: '',
    regname: '',
    allowpostcomment: [],
    duration: 2000,
    apimanager: new apimanager()
  },
  methods: {}
};
</script>
<style>
@import "./app.css";
</style>