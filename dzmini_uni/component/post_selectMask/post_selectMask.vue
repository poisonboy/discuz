<template>
<view>
<!--component/post_selectMask/post_selectMask.wxml-->
<view @tap.stop="showPostSelect">
  <slot></slot>
</view>
<view class="Mask" :hidden="!postShow" @tap.stop="hidePostSelect">
  <view class="maskContain" @tap.stop="contain">
    <view>请选择发帖类型</view>
    <view class="postType" id="0" @tap.stop="postThread" v-if="!allowspecialonly">
      <image src="/static/image/thread_ordinary.png"></image>
      <view class="typeText">普通帖</view>
    </view>
    <view class="postType" id="1" @tap.stop="postThread" v-if="group.allowpostpoll">
      <image src="/static/image/thread_vote.png"></image>
      <view class="typeText">投票帖</view>
    </view>
    <view class="postType" id="4" @tap.stop="postThread" v-if="group.allowpostactivity">
      <image src="/static/image/thread_activity.png"></image>
      <view class="typeText">活动帖</view>
    </view>
  </view>
</view>
</view>
</template>

<script>

export default {
  data() {
    return {
      postShow: false,
      group: {},
      allowspecialonly: 0,
      postTypeArr: []
    };
  },

  components: {},
  props: {
    postShow: {
      type: Boolean
    },
    group: {
      type: Object
    },
    allowspecialonly: {
      type: Number
    },
    postTypeArr: {
      type: Array
    }
  },
  watch: {
    postShow: '_postShowChange',
    group: {
      handler: '_groupChange',
      deep: true
    },
    allowspecialonly: '_allowspecialonlyChange',
    postTypeArr: {
      handler: '_postTypeArrChange',
      deep: true
    }
  },
  methods: {
    postShowChangeFun(newVal, oldVal) {
      this.setData({
        postShow: newVal
      });
    },

    groupChangeFun(newVal, oldVal) {
      this.setData({
        group: newVal
      });
      console.log(newVal);
    },

    allowspecialonlyChangeFun(newVal, oldVal) {
      this.setData({
        allowspecialonly: newVal
      });
      console.log(newVal);
    },

    postTypeArrChangeFun(newVal, oldVal) {
      this.setData({
        postTypeArr: newVal
      });
    },

    showPostSelect() {
      if (this.postTypeArr.length === 1) {
        return;
      }

      this.setData({
        postShow: true
      });
    },

    hidePostSelect() {
      this.setData({
        postShow: false
      });
    },

    postThread(e) {
      this.$emit('postThread', {
        detail: e.currentTarget.id
      });
      this.setData({
        postShow: false
      });
    }

  }
};
</script>
<style>
@import "./post_selectMask.css";
</style>