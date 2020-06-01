<template>
<view>
<!--component/secode/secode.wxml-->
<view @tap.stop="showSecode">
  <slot></slot>
</view>
<view class="Mask" :hidden="!codeShow" @tap.stop="hideSecode">
  <view class="maskContain" @tap.stop="contain">
  <form @submit="formSubmit">
    <view class="codeView" @tap.stop="downSeccode">
      <image class="secodeImg" mode="aspectFit" :src="imageSrc"></image>
      <view class="getcode">看不清？</view>
    </view>
    <input class="weui-input" name="seccodeverify" placeholder="请输入验证码"></input>
    <button class="subtn" form-type="submit">提交</button>
    </form>
  </view>
</view>
</view>
</template>

<script>
// component/secode/secode.js
const app = getApp();

export default {
  data() {
    return {
      codeShow: false,
      codetype: "",
      sechash: "",
      imageSrc: ""
    };
  },

  components: {},
  props: {
    codeShow: {
      type: Boolean
    }
  },
  watch: {
    codeShow: '_codeShowChange'
  },
  methods: {
    codeShowChangeFun(newVal, oldVal) {
      this.setData({
        codeShow: newVal
      });
    },

    requestCode(type) {
      this.setData({
        codetype: type
      });
      app.globalData.apimanager.requstSeccode(type).then(res => {
        if (res.sechash) {
          this.setData({
            sechash: res.sechash,
            imageSrc: res.imageSrc
          });
        }
      }).catch(res => {});
    },

    haveCode() {
      if (this.sechash) {
        return true;
      }

      return false;
    },

    formSubmit(e) {
      if (this.sechash) {
        var options = {
          sechash: this.sechash,
          seccodeverify: e.detail.value.seccodeverify
        };
        this.$emit('secodeSubmit', {
          detail: options
        });
      }
    },

    downSeccode() {
      this.requestCode(this.codetype);
    },

    showSecode() {
      this.setData({
        codeShow: true
      });
    },

    hideSecode() {
      this.setData({
        codeShow: false
      });
    },

    contain() {}

  }
};
</script>
<style>
@import "./secode.css";
</style>