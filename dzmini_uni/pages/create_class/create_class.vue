<template>
<view class="page">
    <view class="page__bd">
        <view class="weui-toptips weui-toptips_warn" v-if="showTopTips">{{errorInfo}}</view>
        <form @submit="formSubmit">
          <view class="weui-cells weui-cells_after-title">
              <view class="weui-cell weui-cell_input">
                  <view class="weui-cell__hd">
                      <view class="weui-label">圈子名称</view>
                  </view>
                  <view class="weui-cell__bd">
                      <input class="weui-input" placeholder="请输入圈子名称" name="className" :value="groupInfo.name"></input>
                  </view>
              </view>
              <view class="weui-cell">
                  <view class="weui-cell__bd">
                      <textarea class="weui-textarea" placeholder="请输入圈子介绍" style="height: 3.3em" name="classInfo" :value="groupInfo.description"></textarea>
                  </view>
              </view>
              <view class="weui-cell" @tap="uploadPic">
                <view class="weui-cell__hd">
                      <view class="weui-label">圈子LOGO</view>
                  </view>            
                  <view class="weui-cell__bd">

                  </view>
                  <view class="weui-cell__ft weui-cell__ft_in-access">
                      <block v-if="iconnew_preview">
                        <image class="logo" :src="iconnew_preview"></image>
                      </block>
                      <block v-else>
                        <block v-if="groupInfo.iconnew != 0">
                          <image class="logo" :src="groupInfo.icon"></image>
                        </block>
                        <block v-if="groupInfo.iconnew == 0 || !isUpdate">
                          <image class="logo" src="https://mc.wpnicer.com/source/plugin/mobile/template/image/xiaochengxu/minimg/unknow_logo.jpg"></image>
                        </block> 
                       </block> 
                  </view>
              </view>
          </view>
          <view class="weui-cells weui-cells_after-title" v-if="!isUpdate">
              <view class="weui-cell weui-cell_input">
                  <view class="weui-cell__hd">
                      <view class="weui-label">一级分类</view>
                  </view>
                  <view class="weui-cell__bd">                 
                    <search_picker class="l_block l_sele weui-input" mode="selector" :range="cityList" rangeKey="name" @searchchange="cityChange" :beSelected="cityIndex" title="选一级分类" disabledNavto="true">{{cityList[cityIndex]['name']?cityList[cityIndex]['name']:'一级分类'}}</search_picker>
                  </view>
              </view>
              <view class="weui-cell weui-cell_input">
                  <view class="weui-cell__hd">
                      <view class="weui-label">二级分类</view>
                  </view>
                  <view class="weui-cell__bd">
                      <search_picker class="l_block l_sele weui-input" mode="selector" :range="_areaList" rangeKey="name" @searchchange="areaChange" :disabled="isAreaLock" :beSelected="areaIndex" title="选二级分类" disabledNavto="true">{{_areaList[areaIndex]['name']?_areaList[areaIndex]['name']:'二级分类'}}</search_picker>
                  </view>
              </view>
              
          </view>        
          <view class="weui-cells weui-cells_after-title">
              <view class="weui-cell weui-cell_switch">
                  <view class="weui-cell__bd">私密</view>
                  <view class="weui-cell__bd little_text">(申请通过方可加入圈子)</view>
                  <view class="weui-cell__ft">
                      <switch v-if="isUpdate" :checked="groupInfo.jointype == 2?true:false" name="isPrivate"></switch>
                      <switch v-if="!isUpdate" checked name="isPrivate"></switch>
                  </view>
              </view>
          </view>
          <view class="weui-btn-area">
              <button class="weui-btn" type="primary" form-type="submit">{{isUpdate?'保存':'创建圈子'}}</button>
          </view>
        </form>
    </view>
</view>
</template>

<script>
import util from "../../utils/util";
const createClassUrl = require("../../config").createClassUrl;
const updateClassUrl = require("../../config").updateClassUrl;
const groupTypeUrl = require("../../config").groupTypeUrl;
const forumUrl = require("../../config").forumUrl;
var event = require("../../utils/event.js");
const datacheck = require("../../utils/datacheck.js");
const app = getApp();
var _this;
import search_picker from "../../component/search_picker/search_picker";

export default {
  data() {
    return {
      fid: 0,
      name: "",
      parentid: 0,
      forum: 0,
      fup: 0,
      descriptionnew: "",
      jointype: 0,
      iconnew: "",
      iconnew_preview: "",
      cityList: {},
      areaList: {},
      _areaList: [],
      schoolList: {},
      _schoolList: [],
      isAreaLock: true,
      isSchoolLock: true,
      isShowEmpty: false,
      isShowResult: false,
      isUpdate: false,
      groupInfo: "",
      cityIndex: "",
      areaIndex: "",
      page: 0,
      schoolIndex: "",
      errorInfo: "",
      showTopTips: false
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

    if (options.id) {
      this.setData({
        fid: options.id,
        isUpdate: true
      });
      wx.setNavigationBarTitle({
        title: '修改圈子'
      });
      this.initClassInfo();
    } else {
      this.loadSelectList(options);
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},
  methods: {
    initClassInfo() {
      app.globalData.apimanager.getRequest(forumUrl, {
        fid: this.fid
      }).then(res => {
        _this.setData({
          groupInfo: res.Variables.groupinfo
        });
      }).catch(res => {});
    },

    loadSelectList: function (options) {
      app.globalData.apimanager.getRequest(groupTypeUrl).then(res => {
        var grouptype = res.Variables.grouptype;

        if (grouptype) {
          util.selectListUpdate(grouptype, function (cityList, areaList, schoolList) {
            _this.setData({
              "cityList": cityList,
              "areaList": areaList,
              "schoolList": schoolList
            });

            _this.cityChange({
              detail: {
                value: options.cityIndex
              }
            });

            _this.areaChange({
              detail: {
                value: options.areaIndex
              }
            });

            _this.schoolChange({
              detail: {
                value: options.schoolIndex
              }
            });
          });
        }
      }).catch(res => {});
    },

    cityChange(e) {
      var cityIndex = e.detail.value;
      var city = this.cityList[cityIndex];
      this.setData({
        cityIndex: cityIndex,
        _areaList: _this.areaList[city['fid']],
        isAreaLock: false,
        _schoolList: [],
        areaIndex: -1,
        page: 1
      });
    },

    areaChange(e) {
      var areaIndex = e.detail.value;
      var area = this._areaList[areaIndex];
      this.setData({
        areaIndex: areaIndex,
        _schoolList: _this.schoolList[area['fid']],
        isSchoolLock: false,
        schoolIndex: -1,
        page: 1
      });
    },

    schoolChange(e) {
      var schoolIndex = e.detail.value;
      var school = this._schoolList[schoolIndex];
      this.setData({
        schoolIndex: schoolIndex,
        page: 1
      });
    },

    formSubmit(e) {
      if (this.isUpdate) {
        this.update(e);
      } else {
        this.create(e);
      }
    },

    create(e) {
      if (datacheck.isEmojiCharacter(e.detail.value.className) || datacheck.isEmojiCharacter(e.detail.value.classInfo)) {
        wx.showToast({
          title: '不能使用emoji表情',
          icon: 'none'
        });
        return;
      }

      var isPrivate = e.detail.value.isPrivate ? 2 : 0;
      var parentid = typeof this.cityList[this.cityIndex] != "undefined" ? this.cityList[this.cityIndex]['fid'] : 0;
      var forum = typeof this._areaList[this.areaIndex] != "undefined" ? this._areaList[this.areaIndex]['fid'] : 0;
      var fup = typeof this._schoolList[this.schoolIndex] != "undefined" ? this._schoolList[this.schoolIndex]['fid'] : 0;
      var data = {
        name: e.detail.value.className,
        descriptionnew: e.detail.value.classInfo,
        jointype: isPrivate,
        parentid: parentid,
        fup: forum,
        formhash: app.globalData.formhash,
        createsubmit: true,
        gviewperm: 1
      };

      if (data.name.length == 0 || parentid == 0 || forum == 0) {
        this.setData({
          errorInfo: "圈子名称未填写或未选择二级分类",
          showTopTips: true
        });
        setTimeout(function () {
          _this.setData({
            showTopTips: false
          });
        }, 2000);
        return false;
      }

      wx.showLoading({
        title: '提交中'
      });

      if (_this.iconnew.length > 0) {
        app.globalData.apimanager.uploadFile(createClassUrl, _this.iconnew, "iconnew", data).then(res => {
          res = JSON.parse(res);
          console.log(res);

          _this.successHandle(res);
        }).catch(res => {
          wx.showToast({
            title: '出错了！',
            icon: 'none'
          });
        });
      } else {
        app.globalData.apimanager.postRequest(createClassUrl, data).then(res => {
          _this.successHandle(res);
        }).catch(res => {
          wx.showToast({
            title: '出错了！',
            icon: 'none'
          });
        });
      }
    },

    update(e) {
      if (datacheck.isEmojiCharacter(e.detail.value.className) || datacheck.isEmojiCharacter(e.detail.value.classInfo)) {
        wx.showToast({
          title: '不能使用emoji表情',
          icon: 'none'
        });
        return;
      }

      var isPrivate = e.detail.value.isPrivate ? 2 : 0;
      var parentid = this.groupInfo.grouptype.first.fid;
      var forum = this.groupInfo.grouptype.second.fid;
      var data = {
        name: e.detail.value.className,
        descriptionnew: e.detail.value.classInfo,
        jointypenew: isPrivate,
        parentid: parentid,
        fup: forum,
        formhash: app.globalData.formhash,
        groupmanage: true,
        gviewperm: 1,
        fid: this.fid
      };

      if (data.name.length == 0) {
        this.setData({
          errorInfo: "圈子名未填写",
          showTopTips: true
        });
        setTimeout(function () {
          _this.setData({
            showTopTips: false
          });
        }, 2000);
        return false;
      }

      wx.showLoading({
        title: '提交中'
      });

      if (_this.iconnew.length > 0) {
        app.globalData.apimanager.uploadFile(updateClassUrl, _this.iconnew, "iconnew", data).then(res => {
          res = JSON.parse(res);

          _this.successHandle(res);
        }).catch(res => {
          wx.showToast({
            title: '出错了！',
            icon: 'none'
          });
        });
      } else {
        app.globalData.apimanager.postRequest(updateClassUrl, data).then(res => {
          _this.successHandle(res);
        }).catch(res => {
          wx.showToast({
            title: '出错了！',
            icon: 'none'
          });
        });
      }
    },

    uploadPic() {
      wx.chooseImage({
        count: 1,
        success: function (res) {
          console.log(res.tempFilePaths);

          _this.setData({
            iconnew: res.tempFilePaths[0],
            iconnew_preview: res.tempFilePaths[0]
          });

          console.log(_this);
        }
      });
    },

    successHandle(res) {
      if (res.Message) {
        if (res.Message.messageval == 'group_create_succeed') {
          wx.showModal({
            showCancel: false,
            content: res.Message.messagestr,

            success(data) {
              if (data.confirm) {
                event.emit('indexChanged', {
                  fid: res.Variables.forum.fid,
                  name: 'createClass'
                });
                wx.navigateBack({
                  delta: 10
                });
              }
            }

          });
        } else {
          wx.showModal({
            showCancel: false,
            content: res.Message.messagestr,

            success(data) {
              if (data.confirm) {
                if (res.Message.messageval == 'group_setup_succeed') {
                  event.emit('indexChanged', {
                    fid: _this.fid
                  });
                  wx.navigateBack();
                }
              }
            }

          });
        }
      } else {}

      wx.hideLoading();
    }

  }
};
</script>
<style>
@import "./create_class.css";
</style>