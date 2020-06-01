<template>
<view class="l_main">
<!-- 选择 -->
  <view class="l_box">
    <search_picker class="l_block ell l_sele1" mode="selector" :range="cityList" rangeKey="name" @searchchange="cityChange" :beSelected="cityIndex" disabledNavto="false" title="选一级分类" navTitle="创建一级分类" navTo="/pages/create_city/create_city">
      <view class="ell">{{cityList[cityIndex]['name']?cityList[cityIndex]['name']:'一级分类'}}</view>
    </search_picker>  
    <search_picker class="l_block ell l_sele1" mode="selector" :range="_areaList" rangeKey="name" @searchchange="areaChange" :beSelected="areaIndex" :disabled="isAreaLock" disabledNavto="false" title="选二级分类" navTitle="创建二级分类" navTo="/pages/create_area/create_area">
      <view class="ell">{{_areaList[areaIndex]['name']?_areaList[areaIndex]['name']:'二级分类'}}</view>
    </search_picker>
  </view>

<!-- 搜索 -->
  <view class="l_box">
    <view class="l_block l_seabar">
      <view class="fl l_sealeft"></view>
      <input class="fl l_seacen" placeholder="请输入圈子名称" @input="setInput" :value="keywords"></input>
      <view class="fr l_searight" v-if="isShowEmpty" @tap="cleanInput"></view>
    </view>
    <view class="l_block l_t l_seabtn" @tap="searchResult" data-type="1">搜索</view>
  </view>
<!-- 创建圈子 -->
  <view class="l_block l_t l_creat" @tap="goToCreateClass" v-if="isShowResult">+ 创建圈子</view>
<!-- 圈子列表 -->
  <view class="l_block l_class" v-if="isShowResult && list.length>0">
    <block v-for="(item, index) in list" :key="index">
      <view class="l_classitem">
        <view class="fl l_group">
          <block v-if="item.iconnew == 0">
            <view v-for="(userItem, index2) in item.icons" :key="index2" :class="item.icons.length == 1?'l_head1':item.icons.length>=5?'l_head5':'l_head2'"><image :src="userItem" mode="aspectFill"></image></view>
          </block>
          <block v-else>
            <image :src="item.icon"></image>
          </block>
        </view>
        <view class="fl l_classmsg">
          <view class="l_classname">{{item.name}}</view>
          <view class="l_classint l_classblack">{{item.grouptype.three.name}}</view>
          <view class="l_classint">{{item.description?item.description:"暂无圈子介绍"}}</view>
        </view>
        <view class="fl l_b l_join" v-if="item.ingroup == 0" @tap="joinClass" :data-id="item.fid">加入</view>
        <view class="fl l_goto" v-if="item.ingroup == 1" @tap="gotoClass" :data-id="item.fid">前往</view>
      </view>
    </block>
  </view>
</view>
</template>

<script>
import util from "../../utils/util";
const groupTypeUrl = require("../../config").groupTypeUrl;
const searchClassUrl = require("../../config").searchClassUrl;
const defaultIcon = require("../../config").defaultIcon;
const userAvatar = require("../../config").userAvatar;
const joinClassUrl = require("../../config").joinClassUrl;
var event = require("../../utils/event.js");
const app = getApp();
var _this;
import search_picker from "../../component/search_picker/search_picker";

export default {
  data() {
    return {
      defaultIcon: defaultIcon,
      userAvatar: userAvatar,
      list: [],
      cityList: {},
      areaList: {},
      _areaList: [],
      schoolList: {},
      _schoolList: [],
      isAreaLock: true,
      isSchoolLock: true,
      isShowEmpty: false,
      isShowResult: false,
      keywords: '',
      search_type: 0,
      page: 1,
      cityIndex: -1,
      areaIndex: -1,
      schoolIndex: -1,
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
    this.loadSelectList();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (this.isback) {
      this.loadSelectList();
    }
  },
  onReachBottom: function () {
    this.getResult(true);
  },
  methods: {
    cleanInput() {
      this.setData({
        keywords: ''
      });
    },

    setInput(e) {
      if (e.detail.value.length > 0) {
        this.setData({
          isShowEmpty: true
        });
      } else {
        this.setData({
          isShowEmpty: false
        });
      }

      this.setData({
        keywords: e.detail.value,
        page: 1
      });
      this.getResult();
    },

    searchResult(e) {
      var type = e.currentTarget.dataset.type;
      this.setData({
        page: 1,
        search_type: type
      });
      this.getResult();
    },

    loadSelectList: function () {
      app.globalData.apimanager.getRequest(groupTypeUrl).then(res => {
        var grouptype = res.Variables.grouptype;

        if (grouptype) {
          util.selectListUpdate(grouptype, function (cityList, areaList, schoolList) {
            _this.setData({
              "cityList": cityList,
              "areaList": areaList,
              "schoolList": schoolList
            });

            if (_this.isback) {
              if (_this.cityIndex >= 0) {
                var city = _this.cityList[_this.cityIndex];

                _this.setData({
                  _areaList: _this.areaList[city['fid']]
                });
              }

              if (_this.areaIndex >= 0) {
                var area = _this._areaList[_this.areaIndex];

                _this.setData({
                  _schoolList: _this.schoolList[area['fid']]
                });
              }
            }
          });
        }
      }).catch(res => {
        console.log(res);
        wx.showToast({
          title: '出错了！',
          icon: 'none'
        });
      });
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
      this.getResult();
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
      this.getResult();
    },

    schoolChange(e) {
      var schoolIndex = e.detail.value;
      var school = this._schoolList[schoolIndex];
      this.setData({
        schoolIndex: schoolIndex,
        page: 1
      });
      this.getResult();
    },

    getResult(isMore) {
      this.setData({
        isShowResult: true
      });
      var kw = this.keywords;
      var groupid = typeof this.cityList[this.cityIndex] != "undefined" ? this.cityList[this.cityIndex]['fid'] : '';
      var forumid = typeof this._areaList[this.areaIndex] != "undefined" ? this._areaList[this.areaIndex]['fid'] : '';
      var subid = typeof this._schoolList[this.schoolIndex] != "undefined" ? this._schoolList[this.schoolIndex]['fid'] : '';
      var data = {
        page: this.page
      };
      if (kw != '') data.kw = kw;
      if (groupid != '') data.groupid = groupid;
      if (forumid != '') data.forumid = forumid;
      if (subid != '') data.subid = subid;
      app.globalData.apimanager.getRequest(searchClassUrl, data).then(res => {
        var grouplist = res.Variables.grouplist;

        if (isMore) {
          grouplist = _this.list.concat(grouplist);
        }

        if (grouplist.length == 0 && this.search_type == 1) {
          this.setData({
            search_type: 0
          });
          wx.showToast({
            title: '没有搜索到该圈子！',
            icon: 'none'
          });
        }

        if (grouplist) {
          this.setData({
            page: _this.page + 1,
            search_type: 0,
            list: grouplist
          });
        }
      }).catch(res => {});
    },

    goToCreateClass: function () {
      wx.navigateTo({
        url: '../create_class/create_class?cityIndex=' + _this.cityIndex + '&areaIndex=' + _this.areaIndex + '&schoolIndex=' + _this.schoolIndex
      });
    },
    gotoClass: function (e) {
      var id = e.currentTarget.dataset.id;
      event.emit('indexChanged', {
        fid: id,
        name: "enter"
      });
      wx.navigateBack();
    },
    joinClass: function (e) {
      var id = e.currentTarget.dataset.id;
      app.globalData.apimanager.getRequest(joinClassUrl, {
        fid: id
      }).then(res => {
        console.log(res);

        if (res.Message) {
          if (res.Message.messageval == "group_join_succeed") {
            event.emit('indexChanged', {
              fid: id
            });
            wx.navigateBack();
          } else {
            wx.showModal({
              showCancel: false,
              content: res.Message.messagestr,

              success(res) {}

            });
          }
        } else {}
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
@import "./search_class.css";
</style>