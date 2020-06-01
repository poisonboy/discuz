<template>
<view>
<view @tap="showSelectListFun">
  <slot></slot>
</view>
<view :class="'sele_box ' + (showSelectList?'active':'')" v-if="showSelectList">
  <view class="ceng" @tap.stop="hideSelectList"></view>
  <view class="content">
    <view class="top">
      <view class="fl">{{title}}</view>
      <view class="fr"></view>
    </view>
    <view class="sea_box">
      <input class="sea_bar" placeholder="输入搜索关键词" @input="search" :value="keywords"></input>
    </view>
    <view class="sch_list">
      <view class="sch_item sch_item1" @tap="navTo" v-if="!disabledNavto" hidden="true">
        <view class="fl">{{navTitle}}</view>
        <view class="fr">+</view>
      </view>
      <block v-for="(item, index) in range" :key="index">
        <view :class="'sch_item sch_item2 ' + (beSelected==index?'active':'')" :hidden="item.isHide != 1?false:true" @tap="searchChange" :data-index="index">
          <view class="fl" v-if="rangeKey">{{item[rangeKey]}}</view>
          <view class="fl" v-if="!rangeKey">{{item}}</view>
          <view class="fr"><view></view></view>
        </view>
      </block>
    </view>
  </view>
</view>
</view>
</template>

<script>

export default {
  data() {
    return {
      showSelectList: false,
      keywords: ""
    };
  },

  components: {},
  props: {
    mode: {
      type: String
    },
    rangeKey: {
      type: String
    },
    range: {
      type: Array
    },
    disabled: {
      type: Boolean
    },
    title: {
      type: String
    },
    navTitle: {
      type: String
    },
    navTo: {
      type: String
    },
    beSelected: {
      type: String,
      default: '-1'
    },
    disabledNavto: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    mode: '_modeChange',
    rangeKey: '_rangeKeyChange',
    range: {
      handler: '_rangeChange',
      deep: true
    },
    disabled: '_disabledChange',
    title: '_titleChange',
    navTitle: '_navTitleChange',
    navTo: '_navToChange',
    beSelected: '_beSelectedChange',
    disabledNavto: '_disabledNavtoChange'
  },
  methods: {
    search(e) {
      var keywords = e.detail.value;
      var defaultList = this.range;
      var res = this.getResult(keywords, defaultList);
      this.setData({
        range: res,
        keywords: keywords
      });
    },

    getResult(keywords, defaultList) {
      for (var x in defaultList) {
        if (defaultList[x][this.rangeKey].indexOf(keywords) !== -1) {
          defaultList[x]['isHide'] = 0;
        } else {
          defaultList[x]['isHide'] = 1;
        }
      }

      return defaultList;
    },

    searchChange(e) {
      const myEventDetail = {
        value: e.currentTarget.dataset.index
      };
      const myEventOption = {};
      this.setData({
        beSelected: myEventDetail.value,
        showSelectList: false
      });
      this.$emit('searchchange', {
        detail: myEventDetail
      }, myEventOption);
    },

    navTo() {
      wx.navigateTo({
        url: this.navTo
      });
    },

    showSelectListFun() {
      if (!this.disabled) {
        this.setData({
          showSelectList: true
        });
        console.log(this.mode);
      }
    },

    hideSelectList() {
      this.setData({
        showSelectList: false
      });
    },

    modeChangeFun(newVal, oldVal) {
      this.setData({
        mode: newVal
      });
    },

    rangeChangeFun(newVal, oldVal) {
      this.setData({
        range: newVal
      });
    },

    rangeKeyChangeFun(newVal, oldVal) {
      this.setData({
        rangeKey: newVal
      });
    },

    disabledChangeFun(newVal, oldVal) {
      this.setData({
        disabled: newVal
      });
    },

    titleChangeFun(newVal, oldVal) {
      this.setData({
        title: newVal
      });
    },

    navTitleChangeFun(newVal, oldVal) {
      this.setData({
        navTitle: newVal
      });
    },

    navToChangeFun(newVal, oldVal) {
      this.setData({
        navTo: newVal
      });
    },

    beSelectedChangeFun(newVal, oldVal) {
      console.log(newVal, oldVal);
      this.setData({
        beSelected: newVal
      });
    },

    disabledNavtoChangeFun(newVal, oldVal) {
      this.setData({
        disabledNavto: newVal
      });
    }

  }
};
</script>
<style>
@import "./search_picker.css";
</style>