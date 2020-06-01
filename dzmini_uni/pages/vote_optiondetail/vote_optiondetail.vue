<template>
<view>
<!--pages/vote_optiondetail/vote_optiondetail.wxml-->
<block v-for="(item, index) in polloption" :key="index">
  <view class="cell" :id="index">
    <image class="avatar" :src="userAvatar + '' + item.uid"></image>
    <view class="username">{{item.username}}</view>
  </view>
</block>
</view>
</template>

<script>
// pages/vote_optiondetail/vote_optiondetail.js
const polloptionUrl = require("../../config").polloptionUrl;
const userAvatar = require("../../config").userAvatar;
const app = getApp();
var self;

export default {
  data() {
    return {
      userAvatar: userAvatar,
      polloption: []
    };
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    self = this;
    var urlstr = polloptionUrl;
    var data = {
      tid: options.tid,
      polloptionid: options.pollid
    };
    app.globalData.apimanager.postRequest(urlstr, data).then(res => {
      if (res.Message) {
        let messageval = res.Message.messageval;

        if (messageval.indexOf('nonexistence') != -1 || messageval.indexOf('nopermission') != -1 || messageval.indexOf('beoverdue') != -1 || messageval.indexOf('nomedal') != -1) {
          wx.showModal({
            title: "提示",
            content: res.Message.messagestr,
            showCancel: false,
            confirmText: "知道了",
            success: function (res) {
              if (res.confirm) {
                wx.navigateBack();
              }
            }
          });
          return;
        }
      }

      var arr1 = res.Variables.viewvote.voterlist;
      self.setData({
        polloption: arr1
      });
    }).catch(res => {});
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
  methods: {}
};
</script>
<style>
@import "./vote_optiondetail.css";
</style>