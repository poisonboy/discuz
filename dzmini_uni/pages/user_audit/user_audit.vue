<template>
<view class="page">
    <view class="page__bd">      
          <view class="weui-cells weui-cells_after-title">
              <view class="weui-cell weui-cell_switch">
                  <view class="weui-cell__bd">圈子成员确认</view>
                  <view class="weui-cell__ft">
                      <switch :checked="groupInfo.jointype == 2?true:false" name="isPrivate" @change="updatePrivate"></switch>
                  </view>
              </view>
          </view>
          <view class="weui-cells__tips">启用后,圈子成员需管理员确认才能邀请好友进群</view>
            <block v-for="(item, index) in checkUsers" :key="index">
              <view class="ap_block">
                <view class="ap_item">
                  <view class="fl me_head">
                    <image mode="aspectFill" :src="item.avatar"></image>
                  </view>
                  <view class="fl ell ap_name">{{item.nickname?item.nickname:realname[item.uid]?realname[item.uid]:item.username}}</view>
                  <view class="fl ap_ap">申请加入圈子</view>
                  <view class="fr ap_btn">
                    <button class="fl ap_agree" @tap="agree" :data-uid="item.uid">同意</button>
                    <button class="fl ap_refuse" @tap="refuse" :data-uid="item.uid">拒绝</button>
                  </view>
                </view>
              </view>
            </block>       
    </view>  
</view>
</template>

<script>
const forumUrl = require("../../config").forumUrl;
const userAuditUrl = require("../../config").userAuditUrl;
const userAvatar = require("../../config").userAvatar;
const updateClassUrl = require("../../config").updateClassUrl;
const userAuditHandlerUrl = require("../../config").userAuditHandlerUrl;
const app = getApp();
var _this;

export default {
  data() {
    return {
      fid: 0,
      userAvatar: "",
      checkUsers: "",
      realname: "",
      groupInfo: ""
    };
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var fid = options.id;
    _this = this;
    this.setData({
      fid: fid,
      userAvatar: userAvatar
    });
    this.getAuditList();
    this.initClassInfo();
  },
  methods: {
    getAuditList() {
      app.globalData.apimanager.getRequest(userAuditUrl, {
        fid: this.fid
      }).then(res => {
        var checkusers = res.Variables.checkusers;
        var realname = res.Variables.usernicknames;

        _this.setData({
          checkUsers: res.Variables.checkusers,
          realname: realname
        });
      }).catch(res => {
        wx.showToast({
          title: '出错了！',
          icon: 'none'
        });
        console.log(res);
      });
    },

    initClassInfo() {
      app.globalData.apimanager.getRequest(forumUrl, {
        fid: this.fid
      }).then(res => {
        _this.setData({
          groupInfo: res.Variables.groupinfo
        });
      }).catch(res => {
        wx.showToast({
          title: '出错了！',
          icon: 'none'
        });
        console.log(res);
      });
    },

    updatePrivate(e) {
      var isPrivate = e.detail.value ? 2 : 0;
      var data = {
        jointypenew: isPrivate,
        fid: this.fid,
        formhash: app.globalData.formhash,
        groupmanage: true
      };
      app.globalData.apimanager.postRequest(updateClassUrl, data).then(res => {}).catch(res => {
        console.log(res);
        wx.showToast({
          title: '出错了！',
          icon: 'none'
        });
      });
    },

    agree(e) {
      var uid = e.currentTarget.dataset.uid;
      app.globalData.apimanager.getRequest(userAuditHandlerUrl, {
        fid: this.fid,
        uid: uid,
        checktype: 1
      }).then(res => {
        if (res.Message.messageval == "group_moderate_succeed") {
          var list = _this.checkUsers;
          delete list[uid];

          _this.setData({
            checkUsers: list
          });
        } else {
          wx.showModal({
            content: res.Message.messagestr,
            showCancel: false
          });
        }
      }).catch(res => {
        wx.showToast({
          title: '出错了！',
          icon: 'none'
        });
        console.log(res);
      });
    },

    refuse(e) {
      var uid = e.currentTarget.dataset.uid;
      app.globalData.apimanager.getRequest(userAuditHandlerUrl, {
        fid: this.fid,
        uid: uid,
        checktype: 2
      }).then(res => {
        if (res.Message.messageval == "group_moderate_failed") {
          var list = _this.checkUsers;
          delete list[uid];

          _this.setData({
            checkUsers: list
          });
        } else {
          wx.showModal({
            content: res.Message.messagestr,
            showCancel: false
          });
        }
      }).catch(res => {
        wx.showToast({
          title: '出错了！',
          icon: 'none'
        });
        console.log(res);
      });
    }

  }
};
</script>
<style>
@import "./user_audit.css";
</style>