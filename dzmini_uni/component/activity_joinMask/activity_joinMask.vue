<template>
<!--component/activity_joinMask/activity_joinMask.wxml-->
<view class="Mask" :hidden="!joinShow">
  <view class="maskContain">
    <view class="maskTip">
    <text v-if="specialActivity.creditcost">注意，参加此活动需要扣除{{specialActivity.creditcost}}</text>
    </view>
    <view class="closeView" @tap.stop="closeMask">
      <image class="close" src="https://mc.wpnicer.com/source/plugin/mobile/template/image/xiaochengxu/minimg/coures_join_close.png"></image>
    </view>
    <view class="maskContent">
      <form @submit="formSubmit" report-submit="true" report-submit-timeout="500">
        <block v-for="(item, index) in joinfield" :key="index">
        <view class="inputCell">
          <view class="subtitle"><text>*</text>{{item.title}}：</view>
          <input class="maskInput" :name="item.fieldid" :placeholder="'请输入' + item.title"></input>
        </view>
        </block>
        <view class="inputCell">
          <view class="subtitle">留言：</view>
          <input class="maskInput" name="message" placeholder="请输入留言"></input>
        </view>
        <button class="weui-btn join-btn" type="primary" form-type="submit">立即报名</button>
      </form>
    </view>
  </view>
</view>
</template>

<script>
// component/activity_joinMask/activity_joinMask.js
const activityAppliesUrl = require("../../config").activityAppliesUrl;
const app = getApp();

export default {
  data() {
    return {
      joinShow: true,
      specialActivity: {},
      joinfield: {},
      acPostData: {}
    };
  },

  components: {},
  props: {
    joinShow: {
      type: Boolean
    },
    specialActivity: {
      type: Object
    },
    acPostData: {
      type: Object
    }
  },
  watch: {
    joinShow: '_joinShowChange',
    specialActivity: {
      handler: '_specialActivityChange',
      deep: true
    },
    acPostData: {
      handler: '_acPostDataChange',
      deep: true
    }
  },
  methods: {
    joinShowChangeFun(newVal, oldVal) {
      this.setData({
        joinShow: newVal
      });
      console.log('jajajajajaja');
    },

    specialActivityChangeFun(newVal, oldVal) {
      if (newVal) {
        this.setData({
          specialActivity: newVal,
          joinfield: newVal.joinfield
        });
      }

      console.log(this.joinfield);
    },

    acPostDataChangeFun(newVal, oldVal) {
      this.setData({
        acPostData: newVal
      });
    },

    closeMask() {
      this.setData({
        joinShow: false
      });
    },

    formSubmit(e) {
      wx.showLoading({
        title: '正在报名',
        icon: 'loading'
      });
      console.log(this.acPostData);
      var dic = e.detail.value;
      dic['tid'] = this.acPostData.tid;
      dic['fid'] = this.acPostData.fid;
      dic['pid'] = this.acPostData.pid;
      dic['formhash'] = app.globalData.formhash;
      dic['activitysubmit'] = true;
      app.globalData.apimanager.postRequest(activityAppliesUrl, dic).then(res => {
        wx.hideLoading();

        if (res.Message.messageval == 'activity_completion') {
          this.setData({
            joinShow: false
          });
          this.$emit('joinSucceed');
        }

        wx.showModal({
          content: res.Message.messagestr,
          showCancel: false,
          confirmText: '知道了'
        });
      }).catch(res => {
        wx.hideLoading();
      });
    }

  }
};
</script>
<style>
@import "./activity_joinMask.css";
</style>