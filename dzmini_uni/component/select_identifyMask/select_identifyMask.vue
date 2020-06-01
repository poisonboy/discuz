<template>
<!--component/select_identifyMask/select_identifyMask.wxml-->
<view class="Mask" :hidden="!isShow">
    <view class="maskContain">
      <view class="banner">
        <image src="https://mc.wpnicer.com/source/plugin/mobile/template/image/xiaochengxu/minimg/select_identify.png"></image>
        <view class="close" @tap="close"></view>
      </view>
      <view class="content">
        <view class="title">选择身份</view>
        <view class="msg">开启丰富的课余生活</view>
        <view class="btnV">
          <view class="tea btn" @tap="mineInfo" id="2">教师</view>
          <view class="stu btn" @tap="mineInfo" id="1">学生</view>
        </view>
      </view>
    </view>
 </view>
</template>

<script>

export default {
  data() {
    return {
      isShow: false
    };
  },

  components: {},
  props: {
    selectShow: {
      type: Boolean
    }
  },
  watch: {
    selectShow: '_selectShowChange'
  },
  methods: {
    selectShowChangeFun(newVal, oldVal) {
      console.log('joinshow', newVal);
      this.setData({
        isShow: newVal
      });
    },

    close() {
      this.setData({
        isShow: false
      });
      this.properties.selectShow = false;
    },

    mineInfo(e) {
      wx: wx.navigateTo({
        url: '/pages/course_mineInfo/course_mineInfo?selectid=' + e.currentTarget.id
      });
    }

  }
};
</script>
<style>
@import "./select_identifyMask.css";
</style>