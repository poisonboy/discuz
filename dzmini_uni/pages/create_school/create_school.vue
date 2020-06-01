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
                      <view class="weui-label">所在地区</view>
                  </view>
                  <view class="weui-cell__bd">
                      <search_picker class="l_block l_sele weui-input" mode="selector" :range="_areaList" rangeKey="name" @searchchange="areaChange" :disabled="isAreaLock" :beSelected="areaIndex" title="选地区" disabledNavto="true">{{_areaList[areaIndex]['name']?_areaList[areaIndex]['name']:'选地区'}}</search_picker>
                  </view>
              </view>
              <view class="weui-cell weui-cell_input">
                  <view class="weui-cell__hd">
                      <view class="weui-label">学校名称</view>
                  </view>
                  <view class="weui-cell__bd">
                      <input class="weui-input" placeholder="请输入学校名称" name="schoolName" value></input>
                  </view>
              </view> 
              <view class="weui-cell weui-cell_input">
                  <view class="weui-cell__hd">
                      <view class="weui-label">学校类别</view>
                  </view>
                  <view class="weui-cell__bd">
                    <search_picker class="l_block l_sele weui-input" mode="selector" :range="schoolType" @searchchange="schoolTypeChange" title="选学校类别" disabledNavto="true">{{schoolType[schoolTypeIndex]?schoolType[schoolTypeIndex]:'请选择'}}</search_picker>
                  </view>
              </view> 
              <view class="weui-cell">
                  <view class="weui-cell__bd">
                      <textarea class="weui-textarea" placeholder="请输入学校介绍" style="height: 3.3em" name="schoolInfo" value></textarea>
                  </view>
              </view>   
              <view class="weui-cell weui-cell_input">
                  <view class="weui-cell__hd">
                      <view class="weui-label">网站</view>
                  </view>
                  <view class="weui-cell__bd">
                      <input class="weui-input" placeholder="请输入网站" name="website" value></input>
                  </view>
              </view> 
              <view class="weui-cell weui-cell_input">
                  <view class="weui-cell__hd">
                      <view class="weui-label">邮编</view>
                  </view>
                  <view class="weui-cell__bd">
                      <input class="weui-input" placeholder="请输入邮编" name="postcode" value></input>
                  </view>
              </view> 
                            <view class="weui-cell weui-cell_input">
                  <view class="weui-cell__hd">
                      <view class="weui-label">地址</view>
                  </view>
                  <view class="weui-cell__bd">
                      <input class="weui-input" placeholder="请输入地址" name="address" value></input>
                  </view>
              </view> 
                            <view class="weui-cell weui-cell_input">
                  <view class="weui-cell__hd">
                      <view class="weui-label">电话</view>
                  </view>
                  <view class="weui-cell__bd">
                      <input class="weui-input" placeholder="请输入电话" name="tel" value></input>
                  </view>
              </view>                                                    
          </view>        
          <view class="weui-btn-area">
              <button class="weui-btn" type="primary" form-type="submit">创建学校</button>
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
      schoolType: ["幼儿园", "小学", "初中", "培训机构"],
      isAreaLock: true,
      schoolTypeIndex: "",
      cityIndex: "",
      _areaList: "",
      areaIndex: "",
      page: 0,
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
    schoolTypeChange: function (e) {
      var index = e.detail.value;
      this.setData({
        schoolTypeIndex: index
      });
    },

    cityChange(e) {
      var cityIndex = e.detail.value;
      var city = this.cityList[cityIndex];
      console.log(city);
      console.log(_this.areaList[city['fid']]);
      this.setData({
        cityIndex: cityIndex,
        _areaList: _this.areaList[city['fid']],
        isAreaLock: false,
        areaIndex: -1,
        page: 1
      });
    },

    areaChange(e) {
      var areaIndex = e.detail.value;
      var area = this._areaList[areaIndex];
      this.setData({
        areaIndex: areaIndex
      });
    },

    loadSelectList: function (options) {
      app.globalData.apimanager.getRequest(groupTypeUrl).then(res => {
        var grouptype = res.Variables.grouptype;

        if (grouptype) {
          util.selectListUpdate(grouptype, function (cityList, areaList, schoolList) {
            _this.setData({
              "cityList": cityList,
              "areaList": areaList
            });
          });
        }
      }).catch(res => {
        console.log(res);
      });
    },
    formSubmit: function (e) {
      var parentid = typeof this.cityList[this.cityIndex] != "undefined" ? this.cityList[this.cityIndex]['fid'] : 0;
      var forum = typeof this._areaList[this.areaIndex] != "undefined" ? this._areaList[this.areaIndex]['fid'] : 0;
      var schoolType = typeof this.schoolType[this.schoolTypeIndex] != "undefined" ? this.schoolType[this.schoolTypeIndex] : "";
      var data = {
        parentid: parentid,
        formhash: app.globalData.formhash,
        forumtype: 3,
        forumid: forum,
        schooltype: schoolType,
        name: e.detail.value.schoolName,
        description: e.detail.value.schoolInfo,
        siteurl: e.detail.value.website,
        zipcode: e.detail.value.postcode,
        address: e.detail.value.address,
        mobile: e.detail.value.tel
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

      if (data.forumid == 0) {
        this.setData({
          errorInfo: "请选择地区",
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
          errorInfo: "请输入学校名",
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
@import "./create_school.css";
</style>