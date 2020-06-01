<template>
<view>
<!--pages/register/register.wxml-->
<view class="weui-toptips weui-toptips_warn" v-if="showTopTips">{{errorInfo}}</view>
<form catchsubmit="formSubmit">
  <view class="textArea">
    <view class="logo">萌宠论坛</view>
    <view class="bottomLine">
      <input class="weui-input" name="username" :value="username" placeholder="账号"></input>
    </view>
    <view>
      <view class="bottomLine">
        <input class="weui-input" type="password" name="password" placeholder="密码"></input>
      </view>

      <view class="bottomLine">
        <input class="weui-input" type="password" name="password2" placeholder="重复密码"></input>
      </view>

      <view class="bottomLine">
        <input class="weui-input" name="email" placeholder="邮箱"></input>
      </view>

      <view class="bottomLine viewflex" v-if="imageSrc">
        <input class="weui-input" name="seccodeverify" placeholder="验证码"></input>
        <image class="secodeImg" :src="imageSrc" mode="aspectFit" @tap="downSeccode"></image>
      </view>
    </view>
 <view class="cu-bar btn-group">
				<button class="cu-btn bg-grey shadow-blur round" @tap="tologin">登录</button>
				<button class="cu-btn bg-yellow shadow-blur round" type="primary" formType="submit">注册</button>
			</view>
  </view>

</form>
</view>
</template>

<script>
// pages/register/register.js
const registerUrl = require("../../config").registerUrl;
const loginmanager = require("../../utils/loginManager");
const datacheck = require("../../utils/datacheck.js");
const app = getApp();
var self;

export default {
  data() {
    return {
      usernamekey: '',
      passwordkey: '',
      password2key: '',
      emailkey: '',
      username: "",
      sechash: "",
      imageSrc: "",
      errorInfo: "",
      showTopTips: false
    };
  },

  components: {},
  props: {},
  onLoad: function (options) {
    self = this; // self.downSeccode()

    if (app.globalData.userInfo && app.globalData.userInfo.nickName) {
      this.setData({
        username: app.globalData.userInfo.nickName
      });
    }

    var regnameurl = registerUrl + '&mod=' + app.globalData.regname;
    app.globalData.apimanager.getRequest(regnameurl).then(res => {
      if (res.Variables.reginput.username) {
        this.setData({
          usernamekey: res.Variables.reginput.username,
          passwordkey: res.Variables.reginput.password,
          password2key: res.Variables.reginput.password2,
          emailkey: res.Variables.reginput.email
        });
      }
    }).catch(res => {
      wx.showToast({
        title: "出错了",
        icon: 'none'
      });
    });
  },
  methods: {
    login: function () {
      wx.navigateTo({
        url: '../login/login'
      });
    },

    downSeccode() {
      app.globalData.apimanager.requstSeccode('register').then(res => {
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

      if (datacheck.isEmojiCharacter(e.detail.value.username)) {
        self.setData({
          errorInfo: '用户名不能包含表情',
          showTopTips: true
        });
        setTimeout(function () {
          self.setData({
            showTopTips: false
          });
        }, app.globalData.duration);
        return;
      }

      var data = {
        regsubmit: true,
        formhash: app.globalData.formhash
      };
      data[this.usernamekey] = e.detail.value.username;
      data[this.passwordkey] = e.detail.value.password;
      data[this.password2key] = e.detail.value.password2;
      data[this.emailkey] = e.detail.value.email;

      if (loginmanager.unionid) {
        data['unionid'] = loginmanager.unionid;
      }

      var regnameurl = registerUrl + '&mod=' + app.globalData.regname;
      wx.showLoading();
      app.globalData.apimanager.postRequest(regnameurl, data).then(res => {
        wx.hideLoading();

        if (res.Message.messageval.indexOf('succeed') != -1) {
          loginmanager.loginSetUserInfo(res);
          wx.navigateBack({
            delta: 2
          });
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
    }

  }
};
</script>
<style>
@import "./register.css";
</style>