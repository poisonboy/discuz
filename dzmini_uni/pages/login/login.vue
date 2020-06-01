<template>
<!--pages/login/login.wxml-->
<form catchsubmit="formSubmit">
	<view>

		<view class="textArea">
			<view class="logo">萌宠论坛</view>
			<view class="bottomLine">
				<input class="weui-input" name="username" @change="inputNameChange" :value="username" placeholder="账号"></input>
			</view>
			<view class="bottomLine">
				<input class="weui-input" type="password" name="password" placeholder="密码"></input>
			</view>
			<view class="bottomLine viewflex" v-if="imageSrc">
				<input class="weui-input" name="seccodeverify" placeholder="验证码"></input>
				<image class="secodeImg" mode="aspectFit" :src="imageSrc" @tap.stop="downSeccode"></image>
			</view>
	 
			<view class="cu-bar btn-group">
				<button class="cu-btn bg-grey shadow-blur round" @tap="tohome">随便看看</button>
				<button class="cu-btn bg-yellow shadow-blur round" type="primary" formType="submit">登录</button>
			</view>
			<view class="register-v" @tap="toRegister">
				
				<view class="register-tip">您需要登陆后才可以查看附件及互动，还没有论坛账号?立即<text class="register-tiptext">注册</text></view>
			</view>

		</view>
	</view>
</form>
</template>

<script>
// pages/login/login.js
const commonLoginUrl = require("../../config").commonLoginUrl;
const loginmanager = require("../../utils/loginManager");
const profileUpdateUrl = require("../../config").profileUpdateUrl;
const app = getApp();
var self;

export default {
  data() {
    return {
      userInfoHidden: true,
      isRequest: false,
      username: "",
      sechash: "",
      imageSrc: ""
    };
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    self = this;

    if (loginmanager.openid) {
      if (app.globalData.userInfo) {
        this.setData({
          username: app.globalData.userInfo.nickName
        });
      }
    }

    if (app.globalData.uid) {
      loginmanager.loginOut();
    }

    this.downSeccode();
  },
  methods: {
    downSeccode() {
      app.globalData.apimanager.requstSeccode('login').then(res => {
        if (res.sechash) {
          this.setData({
            sechash: res.sechash,
            imageSrc: res.imageSrc
          });
        }
      });
    },

    formSubmit(e) {
      let param = e.detail.value;

      if (this.sechash) {
        // 有验证码
        param['sechash'] = self.sechash;
      }

      if (loginmanager.openid) {
        param['openid'] = loginmanager.openid;
      }

      if (loginmanager.unionid) {
        param['unionid'] = loginmanager.unionid;
      }

      param['loginsubmit'] = "yes";
      wx.showLoading({
        title: '登录中',
        icon: 'loading'
      });
      app.globalData.apimanager.postRequest(commonLoginUrl, param).then(res => {
        wx.hideLoading();

        if (res.Message.messageval == 'login_succeed') {
          loginmanager.loginSetUserInfo(res);
          wx.navigateBack();
        }

        wx.showToast({
          title: res.Message.messagestr,
          icon: 'none'
        });
      }).catch(res => {
        wx.hideLoading();
        wx.showToast({
          title: "出错了",
          icon: 'none'
        });
      });
    },

    tohome: function () {
      wx.switchTab({
        url: '../discovery/discovery'
      });
    },

    toRegister() {
      wx.navigateTo({
        url: '../register/register'
      });
    },

    inputNameChange(e) {
      this.setData({
        username: e.detail.value
      });
    }

  }
};
</script>
<style>
@import "./login.css";
</style>