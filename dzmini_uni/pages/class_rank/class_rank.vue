<template>
<view class="l_main">
  <view class="rank_top">
    <view :class="'ran_list ' + (type=='day'?'active':'')" @tap="changeRank" data-type="day">日排行</view>
    <view :class="'ran_list ' + (type=='week'?'active':'')" @tap="changeRank" data-type="week">周排行</view>
    <view :class="'ran_list ' + (type=='month'?'active':'')" @tap="changeRank" data-type="month">月排行</view>
    <view :class="'ran_list ' + (type=='all'?'active':'')" @tap="changeRank" data-type="all">总排行</view>
  </view>

  <view class="l_own">
    <view class="own_imgbox">
      <image mode="aspectFill" :src="avatar"></image>
    </view>
    <view class="fl own_flower">
      <view class="own_txt">红花数量</view>
      <view class="own_center">
        <view class="fl own_num">{{num}}</view>
        <view class="fl own_zi">朵</view>
      </view>
    </view>
    <view class="fl own_flower">
      <view class="own_txt">我的排名</view>
      <view class="own_center">
        <view class="fl own_no" v-if="level == 0">未上榜</view>
        <view class="fl own_no" v-if="level >0">NO.</view>
        <view class="fl own_ran" v-if="level >0">{{level}}</view>
      </view>
    </view>
  </view>

  <view class="l_rank">
    <block v-for="(item, idx) in rank" :key="idx">
      <view class="rank_item">
        <view class="fl rank_no">NO.{{idx + 1}}</view>
        <view class="fl ell rank_name">{{gnickname[item.authorid] !=''?gnickname[item.authorid]:unickname[item.authorid] !=''?unickname[item.authorid]:item.author}}</view>
        <view class="fl rank_flower"></view>
        <view class="fr rank_txt">朵</view>
        <view class="fr rank_num">{{item.support}}</view>
      </view>
    </block>
  </view>
</view>
</template>

<script>
const rankUrl = require("../../config").rankUrl;
const userAvatar = require("../../config").userAvatar;
const app = getApp();
var _this;

export default {
  data() {
    return {
      rank: {},
      type: 'week',
      fid: "",
      uid: "",
      userAvatar: "",
      avatar: "",
      level: "",
      num: "",
      unickname: "",
      gnickname: ""
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
    this.changeRank({
      currentTarget: {
        dataset: {
          type: this.type
        }
      }
    });
  },
  methods: {
    changeRank(e) {
      var type = e.currentTarget.dataset.type;
      this.setData({
        type: type
      });
      this.getRankByType(type);
    },

    getRankByType(type) {
      var data = {
        fid: this.fid
      };
      if (type == 'day') data.day = 1;
      if (type == 'week') data.day = 7;
      if (type == 'month') data.day = 30;
      if (type == 'all') data.day = 0;
      app.globalData.apimanager.getRequest(rankUrl, data).then(res => {
        var avatar = res.Variables.member_avatar;

        _this.setData({
          avatar: avatar,
          rank: res.Variables.ranklist,
          level: res.Variables.rankinfo.rank,
          num: res.Variables.rankinfo.support,
          unickname: res.Variables.usernicknames,
          gnickname: res.Variables.groupusernicknames
        });
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
@import "./class_rank.css";
</style>