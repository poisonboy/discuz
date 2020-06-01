<template>
<view class="l_main" v-if="uid">
  <view class="mi_top" @tap="goToModify">
    <view class="fl mi_head">
      <image mode="aspectFill" :src="avatar"></image>
    </view>
    <view class="fl mi_msg">
      <view class="mi_nick">{{username}}</view>
      <view class="mi_label">
        <view class="label_item label_jia" v-if="grouptitle">{{grouptitle}}</view>
      </view>
    </view>
    <image class="label_item1" src="https://mc.wpnicer.com/source/plugin/mobile/template/image/xiaochengxu/minimg/right.png"></image>
  </view>

  <view class="mi_block">
    <view class="mi_item" @tap="goToBound">
      <!-- <view class='mi_icon icon_coll'></view> -->
      <image class="mi_icon mi_image" mode="aspectFit" src="/static/image/boundm.png"></image>
      <view class="fr mi_bar bar_right">绑定管理</view>
    </view>
    <view class="mi_item" @tap="goToFavorite">
      <view class="mi_icon icon_coll"></view>
      <view class="fr mi_bar bar_right">我的收藏</view>
    </view>
    <view class="mi_item" @tap="goToMineWork">
      <view class="mi_icon icon_task"></view>
      <view class="fr mi_bar bar_right">我的主题</view>
    </view>
    <view class="mi_item" @tap="goToMineReply">
      <view class="mi_icon icon_reply"></view>
      <view class="fr mi_bar bar_right">我的回复</view>
    </view>
  </view>

  <view class="mi_block">
    <view class="mi_item">
      <view class="mi_icon icon_num"></view>
      <view class="fr mi_bar">
        <view class="fl">主题数</view>
        <view class="fr">{{threads}}</view>
      </view>
    </view>
    <view class="mi_item">
      <view class="mi_icon icon_reply"></view>
      <view class="fr mi_bar">
        <view class="fl">回复数</view>
        <view class="fr">{{posts}}</view>
      </view>
    </view>
    <view class="mi_item">
      <view class="mi_icon icon_score"></view>
      <view class="fr mi_bar">
        <view class="fl">积分</view>
        <view class="fr">{{credits}}</view>
      </view>
    </view>
  </view>

  <view class="switchUser" v-if="uid" @tap="switchLogin" hidden>
    切换账号
  </view>

</view>
</template>

<script>
const profileUrl = require("../../config").profileUrl;
const userAvatar = require("../../config").userAvatar;
const loginmanager = require("../../utils/loginManager");
const app = getApp();
var _this;

export default {
  data() {
    return {
      uid: "",
      username: "",
      avatar: "",
      threads: "",
      posts: "",
      credits: "",
      field4: "",
      grouptitle: ""
    };
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    _this = this;
  },
  onShow: function () {
    var uid = app.globalData.uid;

    if (!uid) {
      wx.switchTab({
        url: '/pages/discovery/discovery',
        complete: function (res) {
          loginmanager.toLogin();
        }
      });
    } else {
      this.setData({
        uid: uid
      });
      this.requestProfile();
    }
  },
  methods: {
    requestProfile() {
      app.globalData.apimanager.getRequest(profileUrl).then(res => {
        var username = res.Variables.member_nickname ? res.Variables.member_nickname : res.Variables.member_username;
        var avatar = res.Variables.member_avatar + "?t=" + Date.parse(new Date());

        _this.setData({
          username: username,
          avatar: avatar
        });

        if (res.Variables.auth) {
          _this.setData({
            threads: res.Variables.space.threads,
            posts: res.Variables.space.posts,
            credits: res.Variables.space.credits,
            field4: res.Variables.space.field4,
            grouptitle: res.Variables.space.group.grouptitle
          });
        }
      }).catch(res => {
        wx.showToast({
          title: '出错了！',
          icon: 'none'
        });
      });
    },

    switchLogin() {
      wx.showModal({
        title: '提示',
        content: '切换账号将退出原有账号',
        success: function (res) {
          if (res.confirm) {
            loginmanager.toLogin();
          }
        }
      });
    },

    goToModify() {
      if (!loginmanager.isLogin()) {
        return;
      }

      wx.navigateTo({
        url: '../mine_modify/mine_modify'
      });
    },

    goToBound() {
      if (!loginmanager.isLogin()) {
        return;
      }

      wx.navigateTo({
        url: '../bound_manage/bound_manage'
      });
    },

    goToFavorite() {
      if (!loginmanager.isLogin()) {
        return;
      }

      wx.navigateTo({
        url: '../mine_favorite/mine_favorite'
      });
    },

    goToMineWork() {
      if (!loginmanager.isLogin()) {
        return;
      }

      wx.navigateTo({
        url: '../mine_work/mine_work'
      });
    },

    goToMineReply() {
      if (!loginmanager.isLogin()) {
        return;
      }

      wx.navigateTo({
        url: '../mine_work/mine_work?is_reply=true'
      });
    }

  }
};
</script>
<style>
@import "./mine.css";
</style>