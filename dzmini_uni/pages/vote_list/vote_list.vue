<template>
<view>
<!--pages/vote_list/vote_list.wxml-->
<block v-for="(item, index) in polloption" :key="index">
  <view class="weui-cell" @tap="voteDetail" :id="item.polloptionid">
    <view class="weui-cell__bd">{{item.polloption}}</view>
    <view class="weui-cell__ft weui-cell__ft_in-access">{{item.votes}}</view>
  </view>
</block>
</view>
</template>

<script>
// pages/vote_list/vote_list.js
const polloptionUrl = require("../../config").polloptionUrl;
const app = getApp();
var self;

export default {
  data() {
    return {
      polloption: [],
      tid: ''
    };
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    self = this;
    self.setData({
      tid: options.tid
    });
    app.globalData.apimanager.getRequest(polloptionUrl, {
      tid: options.tid
    }).then(res => {
      var data = res.Variables.viewvote.polloptions;
      data.forEach(function (list) {
        list.polloption = list.polloption.slice(0, 10) + '...';
      });
      self.setData({
        polloption: res.Variables.viewvote.polloptions
      });
    }).catch(res => {});
  },
  methods: {
    voteDetail(e) {
      wx.navigateTo({
        url: '../vote_optiondetail/vote_optiondetail?tid=' + self.tid + '&pollid=' + e.currentTarget.id
      });
    }

  }
};
</script>
<style>
@import "./vote_list.css";
</style>