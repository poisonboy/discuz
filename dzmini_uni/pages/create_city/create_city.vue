<template>
<view class="page">
    <view class="page__bd">
        <view class="weui-toptips weui-toptips_warn" v-if="showTopTips">{{errorInfo}}</view>
        <form @submit="formSubmit">
          <view class="weui-cells weui-cells_after-title">
              <view class="weui-cell weui-cell_input">
                  <view class="weui-cell__hd">
                      <view class="weui-label">城市</view>
                  </view>
                  <view class="weui-cell__bd">
                      <input class="weui-input" placeholder="请输入城市名" name="cityName" value></input>
                  </view>
              </view>                                                    
          </view>        
          <view class="weui-btn-area">
              <button class="weui-btn" type="primary" form-type="submit">创建城市</button>
          </view>
        </form>
    </view>
</view>
</template>

<script>
import util from "../../utils/util";
const createTypeUrl = require("../../config").createTypeUrl;
const datacheck = require("../../utils/datacheck.js");
const app = getApp();
var _this;
import search_picker from "../../component/search_picker/search_picker";

export default {
  data() {
    return {
      errorInfo: "",
      showTopTips: false,
      isback: false
    };
  },

  components: {
    search_picker
  },
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    _this = this;
  },
  methods: {
    formSubmit: function (e) {
      var data = {
        formhash: app.globalData.formhash,
        forumtype: 1,
        name: e.detail.value.cityName
      };

      if (data.name.length == 0) {
        this.setData({
          errorInfo: "请输入城市名",
          showTopTips: true
        });
        setTimeout(function () {
          _this.setData({
            showTopTips: false
          });
        }, 2000);
        return false;
      }

      if (datacheck.isEmojiCharacter(data.name)) {
        wx.showModal({
          showCancel: false,
          content: '不能使用emoji表情'
        });
        return false;
      }

      wx.showLoading({
        title: '提交中'
      });
      app.globalData.apimanager.postRequest(createTypeUrl, data).then(res => {
        if (res.Message.messageval == 'forumtype_create_succeed') {
          wx.showModal({
            showCancel: false,
            content: '创建成功',

            success(data) {
              if (data.confirm) {
                var pages = getCurrentPages();
                var prevPage = pages[pages.length - 2];
                prevPage.setData({
                  isback: true
                });
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

        wx.hideLoading();
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
@import "./create_city.css";
</style>