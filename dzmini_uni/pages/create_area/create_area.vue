<template>
<view class="page">
    <view class="page__bd">
        <view class="weui-toptips weui-toptips_warn" v-if="showTopTips">{{errorInfo}}</view>
        <form @submit="formSubmit">
          <view class="weui-cells weui-cells_after-title">
              <view class="weui-cell weui-cell_input">
                  <view class="weui-cell__hd">
                      <view class="weui-label">所在城市</view>
                  </view>
                  <view class="weui-cell__bd">
                    <search_picker class="l_block l_sele weui-input" mode="selector" :range="cityList" rangeKey="name" @searchchange="cityChange" :beSelected="cityIndex" title="选城市" disabledNavto="true">{{cityList[cityIndex]['name']?cityList[cityIndex]['name']:'选城市'}}</search_picker>                  
                  </view>
              </view>
              <view class="weui-cell weui-cell_input">
                  <view class="weui-cell__hd">
                      <view class="weui-label">地区</view>
                  </view>
                  <view class="weui-cell__bd">
                      <input class="weui-input" placeholder="请输入地区名" name="areaName" value></input>
                  </view>
              </view>                             
          </view>        
          <view class="weui-btn-area">
              <button class="weui-btn" type="primary" form-type="submit">创建地区</button>
          </view>
        </form>
    </view>
</view>
</template>

<script>
import util from "../../utils/util";
const createTypeUrl = require("../../config").createTypeUrl;
const groupTypeUrl = require("../../config").groupTypeUrl;
const datacheck = require("../../utils/datacheck.js");
const app = getApp();
var _this;
import search_picker from "../../component/search_picker/search_picker";

export default {
  data() {
    return {
      cityIndex: "",
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
    this.loadSelectList(options);
  },
  methods: {
    cityChange(e) {
      var cityIndex = e.detail.value;
      var city = this.cityList[cityIndex];
      this.setData({
        cityIndex: cityIndex
      });
    },

    loadSelectList: function (options) {
      app.globalData.apimanager.getRequest(groupTypeUrl).then(res => {
        var grouptype = res.Variables.grouptype;

        if (grouptype) {
          util.selectListUpdate(grouptype, function (cityList, areaList, schoolList) {
            _this.setData({
              "cityList": cityList
            });
          });
        }
      }).catch(res => {
        console.log(res);
      });
    },
    formSubmit: function (e) {
      var parentid = typeof this.cityList[this.cityIndex] != "undefined" ? this.cityList[this.cityIndex]['fid'] : 0;
      var data = {
        formhash: app.globalData.formhash,
        forumtype: 2,
        parentid: parentid,
        name: e.detail.value.areaName
      };

      if (data.parentid == 0) {
        this.setData({
          errorInfo: "请选择城市",
          showTopTips: true
        });
        setTimeout(function () {
          _this.setData({
            showTopTips: false
          });
        }, 2000);
        return false;
      }

      if (data.name.length == 0) {
        this.setData({
          errorInfo: "请输入地区名",
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
@import "./create_area.css";
</style>