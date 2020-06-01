<template>
<view class="page">
    <view class="page__bd">
        <view class="weui-toptips weui-toptips_warn" v-if="showTopTips">{{errorInfo}}</view>
        <form @submit="uid?'userModify':'formSubmit'">
          <view class="weui-cells__title">{{uid?'备注昵称':'我在本圈子的昵称'}}</view>
          <view class="weui-cells weui-cells_after-title">
            <view class="weui-cell weui-cell_input">
                <view class="weui-cell__bd">
                    <input class="weui-input" maxlength="16" name="nickname" placeholder="请输入昵称" :value="nickname"></input>
                </view>
            </view>
          </view>
          <view class="weui-cells__title">{{uid?'备注手机号':'我的手机号'}}</view>
          <view class="weui-cells weui-cells_after-title">
            <view class="weui-cell weui-cell_input">
                <view class="weui-cell__bd">
                    <input class="weui-input" type="number" maxlength="11" name="mobile" placeholder="请输入手机号" :value="mobile"></input>
                </view>
            </view>
          </view>
          <view class="weui-btn-area">
              <button class="weui-btn" type="primary" form-type="submit">保存</button>
          </view>
        </form>
    </view>
</view>
</template>

<script>
const userClassUrl = require("../../config").userClassUrl;
const userModifyUrl = require("../../config").userModifyUrl;
const app = getApp();
var _this;

export default {
  data() {
    return {
      uid: false,
      nickname: "",
      mobile: "",
      fid: ""
    };
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    _this = this;
    var fid = options.id;
    var uid = options.uid;

    if (typeof uid != 'undefined') {
      this.setData({
        uid: uid
      });
    }

    var nickname = decodeURIComponent(options.nickname);
    var mobile = decodeURIComponent(options.mobile);

    if (nickname != '') {
      this.setData({
        nickname: nickname
      });
    }

    if (mobile != 0) {
      this.setData({
        mobile: mobile
      });
    }

    this.setData({
      fid: fid
    });
  },
  methods: {
    formSubmit(e) {
      var data = {
        fid: this.fid,
        formhash: app.globalData.formhash,
        nickname: e.detail.value.nickname,
        mobile: e.detail.value.mobile,
        groupusersubmit: true
      };
      app.globalData.apimanager.postRequest(userClassUrl, data).then(res => {
        if (res.Message.messageval == 'update_userinfo_success') {
          wx.showModal({
            showCancel: false,
            content: '信息更新成功',

            success(data) {
              if (data.confirm) {
                wx.navigateBack();
              }
            }

          });
        } else {
          wx.showModal({
            showCancel: false,
            content: res.Message.messagestr
          });
        }
      }).catch(res => {
        wx.showToast({
          title: '出错了！',
          icon: 'none'
        });
      });
    },

    userModify: function (e) {
      var data = {
        fid: this.fid,
        uid: this.uid,
        formhash: app.globalData.formhash,
        nickname: e.detail.value.nickname,
        mobile: e.detail.value.mobile
      };
      app.globalData.apimanager.postRequest(userModifyUrl, data).then(res => {
        if (res.Message.messageval == 'update_userinfo_success') {
          wx.showModal({
            showCancel: false,
            content: '信息更新成功',

            success(data) {
              if (data.confirm) {
                wx.navigateBack();
              }
            }

          });
        } else {
          wx.showModal({
            showCancel: false,
            content: res.Message.messagestr
          });
        }
      }).catch(res => {
        wx.showToast({
          title: '出错了！',
          icon: 'none'
        });
      });
    }
  }
};
</script>
<style>
@import "./user_class_setting.css";
</style>