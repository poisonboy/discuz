<template>
<view>
<!--pages/questionnaire/questionnaire.wxml-->
<view class="containView">
  <view class="recommend">
  <view class="recommendList">
    <block v-for="(item, index) in datalist" :key="index">
      <view class="recommendCell" :id="item.tid" hover-class="cellhover" @tap="cellClick">
        <view class="cell-index">{{index + 1}}</view>

        <view class="cell-content">
          <view class="cellsubject">{{item.subject}}<text v-if="item.maxchoices != 0">（{{item.maxchoices > 1?'多选':'单选'}}）</text></view>
          <view class="q-info">
            <rich-text class="celltime" :nodes="item.dateline"></rich-text>
          <view class="author">{{item.nickname}}</view>
          </view>
        </view>

      </view>

    </block>
  </view>
</view>
<view class="noMoreView" :hidden="!noMore">
  别再用力了，你已经滑到底啦
</view>
</view>

<image src="https://mc.wpnicer.com/source/plugin/mobile/template/image/xiaochengxu/minimg/course_post.png" class="postEnter borderShowdow" @tap.stop="postEnter">发布</image>
</view>
</template>

<script>
// pages/questionnaire/questionnaire.js
const workListUrl = require("../../config").forumdisplayUrl;
const app = getApp();
var self;

export default {
  data() {
    return {
      datalist: [],
      loading: false,
      pagenum: 1,
      fid: 42,
      noMore: ""
    };
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    self = this;
    self.shareManage(options);
    self.makeRequest();
  },
  onPullDownRefresh: function () {
    wx.showLoading({
      title: 'loading...',
      icon: 'loading'
    });
    self.requestMore(false);
  },
  onReachBottom: function () {
    if (!self.noMore) {
      self.requestMore(true);
    }
  },
  methods: {
    shareManage(options) {
      // sharetype = work & shareid=
      if (options.shareid) {
        wx.navigateTo({
          url: '../questionnaire_detail/questionnaire_detail?tid=' + options.shareid
        });
      }
    },

    makeRequest() {
      self.setData({
        loading: true
      });
      let getdata = {
        fid: self.fid,
        page: self.pagenum // mobile_api:1

      };
      app.globalData.apimanager.getRequest(workListUrl, getdata).then(res => {
        wx.stopPullDownRefresh();
        wx.hideLoading();
        let arr1 = res.Variables.forum_threadlist;

        for (let i = 0; i < arr1.length; i++) {
          var thread = arr1[i];
          thread.nickname = res.Variables.usernicknames[thread.authorid] ? res.Variables.usernicknames[thread.authorid] : thread.author;
        }

        if (self.pagenum > 1) {
          arr1 = self.datalist.concat(arr1);
        }

        var noMore = false;

        if (arr1.length >= res.Variables.forum.threadcount) {
          noMore = true;
        }

        self.setData({
          loading: false,
          datalist: arr1,
          noMore: noMore
        });
      }).catch(res => {
        wx.stopPullDownRefresh();
        wx.hideLoading();
        self.setData({
          loading: false
        });
        wx.showToast({
          title: '出错了！',
          icon: 'none'
        });
      });
    },

    stopPullDownRefresh() {
      wx.stopPullDownRefresh({
        complete(res) {
          wx.hideToast();
        }

      });
    },

    requestMore(isMore) {
      let pagenum = self.pagenum;

      if (isMore) {
        pagenum += 1;
      } else {
        pagenum = 1;
      }

      self.setData({
        pagenum: pagenum // 更新当前页数

      });
      self.makeRequest(); // 重新调用请求获取下一页数据 或者刷新数据
    },

    cellClick(e) {
      const id = e.currentTarget.id;
      wx.navigateTo({
        url: '../questionnaire_detail/questionnaire_detail?tid=' + id
      });
    },

    postEnter() {
      wx.navigateTo({
        url: '../post_question/post_question?fid=' + self.fid
      });
    }

  }
};
</script>
<style>
@import "./questionnaire.css";
</style>