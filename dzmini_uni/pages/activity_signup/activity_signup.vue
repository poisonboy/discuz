<template>
<!--pages/activity_signup/activity_signup.wxml-->
<view class="contain">
  <image class="banner" mode="aspectFill" :src="special_image?special_image:'https://mc.wpnicer.com/source/plugin/mobile/template/image/xiaochengxu/minimg/couse_bg.png'"></image>

  <view class="t_message">
    <view class="t-m-c">
      <view class="t-title">活动名称：{{activityinfo.subject?activityinfo.subject:'---'}}</view>
      <view class="t-title">报名人数：{{activityinfo.applynumber?activityinfo.applynumber:'0'}}</view>
      <view class="t-title">报名剩余时间：{{activityinfo.days?activityinfo.days:'0'}}</view>
    </view>
    
  </view>

  <view class="detail">

    <!-- <view class='tab-head'>
      <block wx:for="{{['待审核','已审核']}}" wx:key="nav">
        <view class="head-item {{index==currentTab?'active':''}}" bindtap='naviClick' id="{{index}}">{{item}}</view>
      </block>
    </view> -->

    <view class="d-content">
      <block v-for="(item, index) in signList" :key="index">

        <view class="j-cell">

          <view class="j-info">

            <view class="info-item"><image class="avatar" :src="userAvatar + '' + item.uid"></image></view>
            <view class="info-item2">
              <view class="stu-name">{{item.username}}</view>
              <view class="stu-no">申请时间：{{item.dateline}}</view>
              <view class="stu-phone">留言：{{item.message?item.message:'--'}}</view>
            </view>
            <view class="info-item3">

              <view :class="'btn  ' + (item.verified==0?'pass':'passed')" @tap="passSignup" :id="index">
                <block v-if="item.verified == 0">
                审核
                </block>
                <block v-if="item.verified == 1">
                已通过
                </block>
              </view>

              <block v-if="currentTab!=2">
                <view class="btn remove" @tap.stop="deleteSignup" :id="index">拒绝</view>
              </block>
            </view>
          </view>

        </view>

      </block>
    </view>

  </view>

</view>
</template>

<script>
// pages/activity_signup/activity_signup.js
const activitySinupListUrl = require("../../config").activitySinupListUrl;
const userAvatar = require("../../config").userAvatar;
const app = getApp();
var self;

export default {
  data() {
    return {
      userAvatar,
      userAvatar,
      signList: [],
      currentTab: 0,
      page: 1,
      tid: "",
      pid: "",
      special_image: "",
      activityinfo: ""
    };
  },

  components: {},
  props: {},
  onLoad: function (options) {
    self = this;

    if (options.tid) {
      this.setData({
        tid: options.tid,
        pid: options.pid
      });
    }

    let pages = getCurrentPages(); //获取当前页面 

    let prevPage = pages[pages.length - 2]; //获取上个页面  

    let special_image = prevPage.data.special_image;
    this.setData({
      special_image: special_image
    });
    this.activitySinupList();
  },
  onPullDownRefresh: function () {
    this.page = 1;
    this.activitySinupList();
  },
  onReachBottom: function () {
    this.page++;
    this.activitySinupList();
  },
  methods: {
    naviClick(e) {
      this.setData({
        currentTab: e.currentTarget.id
      });
      this.page = 1;
      this.activitySinupList();
    },

    activitySinupList() {
      var actstatus = 0;

      if (this.currentTab == 0) {
        actstatus = 1;
      }

      var data = {
        tid: self.tid,
        pid: self.pid,
        actstatus: actstatus
      };
      app.globalData.apimanager.getRequest(activitySinupListUrl, data).then(res => {
        wx.stopPullDownRefresh();
        var signList = res.Variables.activityapplylist.applylist;

        if (this.page > 1) {
          signList = this.signList.concat(signList);
        }

        this.setData({
          activityinfo: res.Variables.activityapplylist.activityinfo,
          signList: signList
        });
      }).catch(res => {
        wx.stopPullDownRefresh();
      });
    },

    deleteSignup(e) {
      this.originExamine(e, false);
    },

    passSignup(e) {
      var index = e.currentTarget.id;
      var item = self.signList[index];

      if (item.verified == 0) {
        this.originExamine(e, true);
      }
    },

    originExamine(e, pass) {
      var operation = '';
      var tipTitle = '审核是否通过';

      if (!pass) {
        operation = 'delete';
        tipTitle = '审核是否拒绝';
      }

      var index = e.currentTarget.id;
      var item = self.signList[index];
      var data = {
        tid: this.tid,
        pid: this.pid,
        formhash: app.globalData.formhash,
        handlekey: 'activity',
        'applyidarray[]': item.applyid,
        reason: '',
        operation: operation
      };
      var url = activitySinupListUrl + '&applylistsubmit=yes';
      wx.showModal({
        title: tipTitle,
        confirmText: '确定',
        success: function (res) {
          if (res.confirm) {
            app.globalData.apimanager.postRequest(url, data).then(res => {
              if (res.Message.messageval.indexOf('_completion') != -1) {
                self.page = 1;
                self.activitySinupList();
              }

              var sutip = '审核成功';

              if (!pass) {
                sutip = '删除成功';
              }

              wx.showToast({
                title: sutip,
                icon: 'none'
              });
            }).catch(res => {
              console.log(res);
            });
          }
        }
      });
    }

  }
};
</script>
<style>
@import "./activity_signup.css";
</style>