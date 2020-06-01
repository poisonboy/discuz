<template>
<view>
<!--pages/post_question/post_question.wxml-->
<view class="weui-toptips weui-toptips_warn" v-if="showTopTips">{{errorInfo}}</view>

<view class="container">
  <form catchsubmit="formSubmit">

    <view class="section1">
        <input class="easyInput" name="subject" :value="title" placeholder="请输入投票标题"></input>
        <textarea v-if="!fullScreen" class="weui-input detailText" name="message" placeholder="请输入投票内容的描述（选填）" @blur="detailFinish" :value="courseintroduce" :focus="isText" maxlength="-1"></textarea>
    </view>

    <view class="section1">
      <view class="weui-cell">
        <view class="weui-cell__bd">项目类型</view>
        <view class="weui-cell__ft weui-cell__ft_in-access"></view>
      </view>
      <view class="radio-g">
      <radio-group @change="radioChange">
        <label class="radio">
          <radio value="1" :checked="choices==1?'true':''"></radio>单选
        </label>
        <label class="radio">
          <radio value="2" :checked="choices==2?'true':''"></radio>多选
        </label>
      </radio-group>
      </view>
      <view class="weui-cell">
        <view class="weui-cell__bd">添加选项</view>
        <view class="weui-cell__ft weui-cell__ft_in-access"></view>
      </view>
      <view class="input-g">
        <block v-for="(item, index) in slide_list" :key="index">
          <view class="input-c" :style="'margin-left:' + item.marginL + 'rpx'" :data-index="index" @touchstart="touchS" @touchmove="touchM" @touchend="touchE">
          <input class="vote-input" :id="index" @change="inputNameChange" placeholder="请输入投票选项" :value="item.text"></input>
          <image class="vote-img" :src="item.image.src?item.image.src:'https://mc.wpnicer.com/source/plugin/mobile/template/image/xiaochengxu/minimg/vote_att.png'" @tap="chooseImage" :id="index"></image>
          <view class="slide_del" :id="index" @tap="deletePolloption">删除</view> 
        </view>
        </block>
      </view>
      <view class="o-tip">向左滑动删除选项</view>
      <view class="add-c">
        <view class="add-btn" @tap="addPolloption">+ 添加选项</view>
      </view>
    </view>
    
    <view class="section1">
      <view class="day-c">
        <input class="day-input" type="number" name="expiration" placeholder="投票有效天数"></input>
        <view class="tian">天</view>
      </view>
      <view class="v-auth-set">
        <checkbox-group @change="checkboxChange">
          <label class="checkbox">
          <checkbox value="visibilitypoll" name="visibilitypoll" checked="true"></checkbox>投票后结果可见
        </label>
        <label class="checkbox">
          <checkbox value="overt" name="overt"></checkbox>公开投票参与人
        </label>
        </checkbox-group>
      </view>
    </view>
    <button class="postBtn" :disabled="postLock" type="primary" formType="submit">发布</button>
   </form>
</view>
</view>
</template>

<script>
// pages/post_question/post_question.js
const postInfoUrl = require("../../config").postInfoUrl;
const uploadFileUrl = require("../../config").uploadFileUrl;
const postThreadUrl = require("../../config").postThreadUrl;
const util = require("../../utils/util.js");
const datacheck = require("../../utils/datacheck.js");
const app = getApp();
var self; // 附件分类
// 附件分类
var fileCatalog = {
  image: 0,
  audio: 1,
  video: 2
};

export default {
  data() {
    return {
      choices: 1,
      slide_list: [{
        image: {},
        text: '',
        marginL: 0
      }, {
        image: {},
        text: '',
        marginL: 0
      }],
      visibilitypoll: 1,
      overt: 0,
      postLock: false,
      fid: "",
      uploadhash: "",
      classTypeList: "",
      typeObj: "",
      startX: "",
      errorInfo: "",
      showTopTips: false
    };
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    self = this;

    if (options.fid) {
      this.setData({
        fid: options.fid
      });
    }

    self.checkPost();
  },
  methods: {
    checkPost() {
      var url = postInfoUrl + '&submodule=checkpost&version=5';
      app.globalData.apimanager.getRequest(url, {
        fid: self.fid
      }).then(res => {
        if (res.Variables.allowperm) {
          self.setData({
            uploadhash: res.Variables.allowperm.uploadhash
          });
        }

        var types = res.Variables.threadtypes.types;
        var array = [];

        for (let key in types) {
          let value = types[key];
          let data = {
            typeid: key,
            name: value
          };
          array.push(data);
        }

        self.setData({
          classTypeList: array,
          typeObj: res.Variables.threadtypes.types
        });
      }).catch(res => {});
    },

    touchS: function (e) {
      if (e.touches.length == 1) {
        this.setData({
          startX: e.touches[0].clientX
        });
      }
    },
    touchM: function (e) {
      if (e.touches.length == 1) {
        var moveX = e.touches[0].clientX;
        var disX = this.startX - moveX;
        var delBtnWidth = 130;
        var marginL = "";

        if (disX == 0 || disX < 0) {
          marginL = 0;
        } else if (disX > 0) {
          if (disX >= delBtnWidth) {
            disX = delBtnWidth;
          }

          marginL = -disX;
        }

        var index = e.currentTarget.dataset.index;
        var slide_list = this.slide_list;

        for (var i = 0; i < slide_list.length; i++) {
          slide_list[i].marginL = 0;
        }

        slide_list[index].marginL = marginL;
        this.setData({
          slide_list: slide_list
        });
      }
    },
    touchE: function (e) {
      if (e.changedTouches.length == 1) {
        var endX = e.changedTouches[0].clientX;
        var disX = this.startX - endX;
        var delBtnWidth = 130;
        var marginL = disX > delBtnWidth / 2 ? -130 : 0;
        var index = e.currentTarget.dataset.index;
        var slide_list = this.slide_list;
        slide_list[index].marginL = marginL; //更新列表的状态

        this.setData({
          slide_list: slide_list
        });
      }
    },

    radioChange(e) {
      self.setData({
        choices: e.detail.value
      });
    },

    addPolloption() {
      if (this.slide_list.length >= 20) {
        self.setData({
          errorInfo: '最多添加20个选项',
          showTopTips: true
        });
        setTimeout(function () {
          self.setData({
            showTopTips: false
          });
        }, 2000);
        return;
      }

      var newPolloption = {};
      this.slide_list.push(newPolloption);
      this.setData({
        slide_list: this.slide_list
      });
    },

    deletePolloption(e) {
      if (this.slide_list.length <= 2) {
        self.setData({
          errorInfo: '最少两个选项',
          showTopTips: true
        });
        setTimeout(function () {
          self.setData({
            showTopTips: false
          });
        }, 2000);
        return;
      }

      var index = e.currentTarget.id;
      console.log(index);
      this.slide_list.splice(index, 1);
      this.setData({
        slide_list: this.slide_list
      });
    },

    chooseImage(e) {
      var index = e.currentTarget.id;
      wx.chooseImage({
        count: 1,

        success(res) {
          for (let key in res.tempFilePaths) {
            let imageSrc = res.tempFilePaths[key];
            self.uploadFile(imageSrc, fileCatalog.image, index);
          }
        }

      });
    },

    uploadFile(uploadSrc, type, index) {
      var uploadUrl = uploadFileUrl + '&operation=poll&fid=' + self.fid;
      let uid = app.globalData.uid;
      let postDic = {
        hash: self.uploadhash,
        uid: uid
      };
      wx.showLoading({
        title: '上传附件',
        icon: 'loading'
      });
      app.globalData.apimanager.uploadFile(uploadUrl, uploadSrc, 'Filedata', postDic).then(res => {
        var result = JSON.parse(res);
        wx.hideLoading();

        if (result.aid) {
          var aid = result.aid;
          let image = {
            aid: aid,
            src: uploadSrc
          };
          self.slide_list[index].image = image;
          self.setData({
            slide_list: self.slide_list
          });
        } else {
          wx.showModal({
            content: '上传失败1',
            showCancel: false,
            confirmText: '确定'
          });
        }
      }).catch(res => {
        wx.hideLoading();
        wx.showModal({
          content: "上传失败",
          showCancel: false,
          confirmText: '确定'
        });
      });
    },

    radioChange(e) {
      this.setData({
        choices: e.detail.value
      });
    },

    checkboxChange(e) {
      console.log(e.detail.value);

      if (e.detail.value.length == 0) {
        this.setData({
          overt: 0,
          visibilitypoll: 0
        });
      } else {
        if (e.detail.value.indexOf('visibilitypoll') != -1) {
          this.setData({
            visibilitypoll: 1
          });
        } else {
          this.setData({
            visibilitypoll: 0
          });
        }

        if (e.detail.value.indexOf('overt') != -1) {
          this.setData({
            overt: 1
          });
        } else {
          this.setData({
            overt: 0
          });
        }
      }
    },

    inputNameChange(e) {
      var index = e.currentTarget.id;

      if (datacheck.isEmojiCharacter(e.detail.value)) {
        errorInfo = '不能使用emoji表情';
        ifError = true;
      }

      this.slide_list[index]['text'] = e.detail.value;
    },

    formSubmit(e) {
      var errorInfo = '';
      var ifError = false;
      var polloption = [];
      var pollimage = [];

      for (let i = 0; i < this.slide_list.length; i++) {
        var slide = this.slide_list[i];

        if (slide.text) {
          polloption.push(util.filterEmoji(slide.text));
        } else {
          var errorInfo = '投票选项为空';
          ifError = true;
          break;
        }

        if (slide.image && slide.image.aid) {
          pollimage.push(slide.image.aid);
        }
      }

      if (!e.detail.value.subject) {
        errorInfo = '请输入标题';
        ifError = true;
      } else if (datacheck.isEmojiCharacter(e.detail.value.message) || datacheck.isEmojiCharacter(e.detail.value.subject)) {
        errorInfo = '不能使用emoji表情';
        ifError = true;
      }

      if (ifError) {
        self.setData({
          errorInfo: errorInfo,
          showTopTips: true
        });
        setTimeout(function () {
          self.setData({
            showTopTips: false
          });
        }, 2000);
        return;
      }

      var maxchoices = this.choices == 1 ? 1 : self.slide_list.length;
      var postData = {
        formhash: app.globalData.formhash,
        allownoticeauthor: 1,
        maxchoices: maxchoices,
        subject: e.detail.value.subject,
        message: util.filterEmoji(e.detail.value.message),
        visibilitypoll: this.visibilitypoll,
        overt: this.overt,
        expiration: e.detail.value.expiration,
        special: 1,
        topicsubmit: 'yes'
      };

      for (let i = 0; i < polloption.length; i++) {
        let pokey = "polloption[" + i + "]";
        postData[pokey] = polloption[i];
      }

      for (let i = 0; i < pollimage.length; i++) {
        let poimgkey = "pollimage[" + i + "]";
        postData[poimgkey] = pollimage[i];
      }

      let requestUrl = postThreadUrl + '&fid=' + self.fid;
      wx.showLoading({
        title: '发布中...',
        icon: 'loading'
      });
      self.setData({
        postLock: true
      });
      app.globalData.apimanager.postRequest(requestUrl, postData).then(res => {
        wx.hideLoading();
        self.setData({
          postLock: false
        });

        if (res.Message.messageval.indexOf('succeed') != -1) {
          wx.switchTab({
            url: '/pages/questionnaire/questionnaire'
          });
        }

        wx.showToast({
          title: res.Message.messagestr,
          icon: 'none'
        });
      }).catch(res => {
        self.setData({
          postLock: false
        });
        wx.hideLoading();
      });
    }

  }
};
</script>
<style>
@import "./post_question.css";
</style>