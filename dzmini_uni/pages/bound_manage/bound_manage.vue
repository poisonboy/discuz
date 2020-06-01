<template>
<!--pages/bound_manage/bound_manage.wxml-->
<view class="l_main">
  <view class="mi_top">
    <view class="mi_head">
      <image mode="aspectFill" :src="info.member_avatar"></image>
    </view>
    <view class="mi_nick">{{info.member_username}}</view>
  </view>

  <view class="mi_block">
    <block v-for="(item, index) in info.users" :key="index">
      <view class="mi_item">
        <view class="b_left">
          <image class="mi_icon" :src="item.type!='qq'?'/image/bound_wx.png':'/image/bound_qq.png'"></image>
          <view class="fr">
            <block v-if="item.type=='weixin'">
              微信
            </block>
            <block v-if="item.type=='minapp'">
              小程序
            </block>
            <block v-if="item.type=='qq'">
              QQ
            </block>
            <text class="b-status">({{item.status == 1 ? '已绑定':'未绑定'}})</text>
          </view>
        </view>
        <view :class="'b_right ' + (item.type == 'minapp' && item.status != 1 ?'can-bound':'')" @tap="boundChange" :id="index">{{item.status == 1 ? '解绑' : '绑定'}}</view>
      </view>
    </block>

  </view>
</view>
</template>

<script>
// pages/bound_manage/bound_manage.js
const profileUrl = require("../../config").profileUrl;
const userAvatar = require("../../config").userAvatar;
const oauthsUrl = require("../../config").oauthsUrl;
const unBindThirdUrl = require("../../config").unBindThirdUrl;
const loginmanager = require("../../utils/loginManager");
const commonLoginUrl = require("../../config").commonLoginUrl;
const app = getApp();
var self;

export default {
  data() {
    return {
      info: {},
      clickToBound: false
    };
  },

  components: {},
  props: {},
  onLoad: function (options) {
    self = this;
  },
  onShow: function () {
    this.requestData();
    this.getOpenid();
  },
  methods: {
    requestData() {
      app.globalData.apimanager.getRequest(oauthsUrl).then(res => {
        this.setData({
          info: res.Variables
        });
      });
    },

    boundChange(e) {
      var index = e.currentTarget.id;
      var boundItem = this.info.users[index];

      if (boundItem.status == 1) {
        var title = '解除绑定？';
        var content = '解绑后，APP将不能使用三方登录，登录此账号';

        if (boundItem.type == 'minapp') {
          title = '温馨提示';
          content = '解绑后,下回使用小程序需要重新登录';
        }

        var data = {
          unbind: "yes",
          type: boundItem.type,
          formhash: app.globalData.formhash
        };
        wx.showModal({
          title: title,
          content: content,
          success: function (res) {
            if (res.confirm) {
              self.unBound(data);
            }
          }
        });
      } else {
        if (boundItem.type !== "minapp") {
          wx.showModal({
            title: '提示',
            content: '请前往APP进行绑定',
            showCancel: false
          });
          return;
        }

        if (loginmanager.openid) {
          self.boundminapp();
        } else {
          this.setData({
            clickToBound: true
          });
          this.getOpenid();
        }
      }
    },

    boundminapp() {
      var param = {};

      if (loginmanager.openid) {
        param['openid'] = loginmanager.openid;
      }

      if (loginmanager.unionid) {
        param['unionid'] = loginmanager.unionid;
      }

      param['loginsubmit'] = "yes";
      wx.showLoading({
        title: '绑定中',
        icon: 'loading'
      });
      app.globalData.apimanager.postRequest(commonLoginUrl, param).then(res => {
        wx.hideLoading();

        if (res.Message.messageval.indexOf('succeed') != -1) {
          wx.showToast({
            title: '绑定成功！',
            icon: 'none'
          });
          this.requestData();
        }
      }).catch(res => {
        wx.hideLoading();
        wx.showToast({
          title: "出错了",
          icon: 'none'
        });
      });
    },

    unBound(data) {
      app.globalData.apimanager.postRequest(unBindThirdUrl, data).then(res => {
        if (res.Message.messageval.indexOf('succeed') != -1) {
          if (data.type == 'minapp') {
            this.getOpenid();
          }

          wx.showToast({
            title: '解绑成功！',
            icon: 'none'
          });
          this.requestData();
        } else {
          wx.showToast({
            title: '解绑失败！',
            icon: 'none'
          });
        }
      });
    },

    getOpenid() {
      // 登录
      wx.login({
        success: res => {
          let dic = {
            code: res.code
          };
          app.globalData.apimanager.getRequest(commonLoginUrl, dic).then(res => {
            if (res.Message.messageval == 'no_bind') {
              loginmanager.openid = res.Variables.openid;
              loginmanager.unionid = res.Variables.unionid;

              if (self.clickToBound == true) {
                this.setData({
                  clickToBound: false
                });
                self.boundminapp();
              }
            }
          });
        }
      });
    }

  }
};
</script>
<style>
@import "./bound_manage.css";
</style>