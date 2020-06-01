<template>
<view>
<!--pages/member/member.wxml-->
<text class="iconfont icon-home" style="color:red;font-size:60rpx;"></text>
<!-- 搜索栏 -->
<view class="l_sea">
  <view class="sea_bar" @tap="showSeaFun">
    <view class="sea_btn1" :hidden="showSea==1">搜索</view>
    <input class="sea_btn" placeholder="搜索" :hidden="showSea==0" :focus="showSea==1" @blur="seablur" placeholder-style="color:#B2B2B2" @input="seaInput"></input>
  </view>
</view>
<scroll-view class="l_main" scroll-y="true" :scroll-into-view="toView">
  <!-- 每组 -->
  <view class="l_group" v-if="userList['admin'].length>0">管理员</view>
  <!-- 成员 -->
  <view class="l_member">
    <block v-for="(item, index) in userList['admin']" :key="index">
      <view class="me_item" @tap="userModify" :data-uid="item.uid" :data-nickname="item.nickname" :data-mobile="item.mobile">
        <view class="fl me_head">
          <view class="imgbox">
            <image mode="aspectFill" :src="item.avatar"></image>
          </view>
            <view class="me_lab lab_zhu" v-if="item.level==1">管</view>
            <view class="me_lab lab_guan" v-if="item.level==2">管</view>
            <view class="me_lab lab_shi" v-if="item.level==3">师</view>
        </view>
        <view class="fl ell me_nick">{{item.nickname?item.nickname:item.realname?item.realname:item.username}}</view>
        <view class="fl me_tel">{{item.mobile == 0?'':item.mobile}}</view>
      </view>
    </block>
  </view>
  <block v-for="(item, idx) in userList['user']" :key="idx">
    <view class="l_group" :id="'view_' + idx">{{idx}}</view>
    <block v-for="(_item, index) in item" :key="index">
      <view class="l_member">
        <view class="me_item" @tap="userModify" :data-uid="_item.uid" :data-nickname="_item.nickname" :data-mobile="_item.mobile">
          <view class="fl me_head">
            <view class="imgbox">
              <image mode="aspectFill" :src="_item.avatar"></image>
            </view>
            <view class="me_lab lab_zhu" v-if="_item.level==1">管</view>
            <view class="me_lab lab_guan" v-if="_item.level==2">管</view>
            <view class="me_lab lab_shi" v-if="_item.level==3">师</view>
          </view>
          <view class="fl ell me_nick">{{_item.nickname?_item.nickname:_item.realname?_item.realname:_item.username}}</view>
          <view class="fl me_tel">{{_item.mobile == 0?'':_item.mobile}}</view>
        </view>
      </view>
    </block>
  </block>
  <view class="l_nav">
    <block v-for="(item, idx) in userList['user']" :key="idx">
      <view class="nav_item" :data-id="idx" @tap="jumpTo">{{idx}}</view>
    </block>
  </view>
</scroll-view>
</view>
</template>

<script>
const forumUrl = require("../../config").forumUrl;
const userAvatar = require("../../config").userAvatar;
import util from "../../utils/util";
const app = getApp();
var _this;

export default {
  data() {
    return {
      fid: 0,
      groupInfo: {},
      uid: 0,
      myInfo: {},
      showSea: 0,
      userList: {},
      allUserList: {},
      userAvatar: "",
      toView: ""
    };
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var fid = options.id;
    var uid = app.globalData.uid;
    console.log(uid);
    _this = this;
    this.setData({
      fid: fid,
      uid: uid,
      userAvatar: userAvatar
    });
  },
  onShow: function (options) {
    this.initClassInfo();
  },
  methods: {
    initClassInfo() {
      app.globalData.apimanager.getRequest(forumUrl, {
        fid: this.fid
      }).then(res => {
        var myInfo = res.Variables.groupinfo.userlist[_this.uid];
        var userCount = res.Variables.groupinfo.users;
        wx.setNavigationBarTitle({
          title: '成员(' + userCount + ')'
        });
        var userList = util.userListUpdate(res.Variables.groupinfo.userlist);

        _this.setData({
          myInfo: myInfo,
          userList: userList,
          userAvatar: userAvatar,
          allUserList: res.Variables.groupinfo.userlist
        });
      }).catch(res => {
        console.log(res);
      });
    },

    showSeaFun: function () {
      this.setData({
        showSea: 1
      });
    },
    seablur: function (e) {
      if (e.detail.value.length == 0) {
        this.setData({
          showSea: 0
        });
      }
    },
    seaInput: function (e) {
      if (e.detail.value.length != 0) {
        var keyword = e.detail.value;
        var searchUserList = util.searchUserList(keyword, this.allUserList);
        var userList = util.userListUpdate(searchUserList);

        _this.setData({
          userList: userList
        });
      } else {
        var userList = util.userListUpdate(this.allUserList);

        _this.setData({
          userList: userList
        });
      }
    },
    jumpTo: function (e) {
      var id = e.currentTarget.dataset.id;
      this.setData({
        toView: 'view_' + id
      });
    },
    userModify: function (e) {
      return;

      if (this.myInfo.level == 1 || this.myInfo.level == 2) {
        wx.navigateTo({
          url: '../user_class_setting/user_class_setting?uid=' + e.currentTarget.dataset.uid + '&id=' + this.fid + '&nickname=' + encodeURIComponent(e.currentTarget.dataset.nickname) + '&mobile=' + encodeURIComponent(e.currentTarget.dataset.mobile)
        });
      }
    }
  }
};
</script>
<style>
@import "./more_user.css";
</style>