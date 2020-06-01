<template>
<view>
<!--pages/activity_post/activity_post.wxml-->
<view class="weui-toptips weui-toptips_warn" v-if="showTopTips">{{errorInfo}}</view>
<view class="container">
  <form catchsubmit="formSubmit">
    <view class="section1">
      <input class="easyInput" name="subject" :value="subject" placeholder="标题（最多只能输入80个字符）"></input>

      <textarea v-if="!fullScreen" class="weui-input detailText" name="message" placeholder="活动详情 请输入活动内容的详细描述" :value="message" maxlength="-1"></textarea>
      <view class="weui-cell" @tap="chooseImage">
        <view class="weui-cell__hd">
          <view class="weui-label">头图</view>
          <view class="att-tip">(大小不超过4M)</view>
        </view>
        <view class="weui-cell__bd">

        </view>
        <view class="weui-cell__ft weui-cell__ft_in-access">
          <view class="img_box">
            <image class="logo" mode="aspectFill" :src="imageList[0]?imageList[0].src:'https://mc.wpnicer.com/source/plugin/mobile/template/image/xiaochengxu/minimg/post_course_image.png'"></image>
          </view>
        </view>
      </view>
    </view>

    <view class="section1">

      <view class=".activity-type-c">
          <view class="time-tip activity-tip">类型</view>
          <input name="activitytype" :value="activitytype" placeholder="请输入活动类型" :focus="isSelf"></input>
         <picker class="dateType" mode="selector" :value="activityIndex" :range="activitytypelist" @change="activityTypeChange">
            <text decode="true">{{activitytypelist[activityIndex]?activitytypelist[activityIndex]:'自定义'}}</text>
          </picker>
        </view>
    </view>

    <view class="section1">
      <view class="teachTime">
        <view class="tt_title">报名时间</view>
        <view class="tt_pickercontent">
          <picker class="dateType" mode="date" :value="enrolStart" @change="bindEnrolStartChange">
            <text>{{enrolStart?enrolStart:'请选择'}}</text>
          </picker>
          <view class="zhi">至</view>
          <picker class="dateType" mode="date" :value="enrolEnd" :start="enrolStart" @change="bindEnrolEndChange">
            <text decode="true">{{enrolEnd?enrolEnd:'请选择'}}</text>
          </picker>
        </view>
      </view>
    </view>


    <view class="section1">
      <view class="teachTime">
        <view class="tt_title">活动时间</view>
        <view class="tt_pickercontent">
          <view class="time-tip">开始时间</view>
          <picker class="dateType" mode="date" :value="activityDateStart" @change="activityDateStartChange">
            <text>{{activityDateStart?activityDateStart:'请选择'}}</text>
          </picker>
          <picker class="dateType" mode="time" :value="activityTimeStart" :start="activityTimeStart" @change="activityTimeStartChange">
            <text decode="true">{{activityTimeStart?activityTimeStart:'00:00'}}</text>
          </picker>
        </view>
        <view class="tt_pickercontent">
          <view class="time-tip">结束时间</view>
          <picker class="dateType" mode="date" :value="activityDateEnd" @change="activityDateEndChange">
            <text>{{activityDateEnd?activityDateEnd:'请选择'}}</text>
          </picker>
          <picker class="dateType" mode="time" :value="activityTimeEnd" :start="activityTimeEnd" @change="activityTimeEndChange">
            <text decode="true">{{activityTimeEnd?activityTimeEnd:'00:00'}}</text>
          </picker>
        </view>
      </view>

      <view class="weui-cell">
        <view class="weui-cell__bd">活动地点</view>
        <input class="weui-cell__ft weui-cell__ft_in-access" name="activityplace" :value="activityplace"></input>
      </view>
      <view class="weui-cell">
        <view class="weui-cell__bd">活动人数</view>
        <input type="number" class="weui-cell__ft weui-cell__ft_in-access" name="activitynumber" :value="activitynumber"></input>
      </view>
      <picker mode="selector" :value="genderIndex" :range="genderlist" @change="bindGenderChange">
        <view class="weui-cell picker-cell">
          <view class="weui-cell__bd">性别</view>
          <view class="weui-cell__ft weui-cell__ft_in-access">
            {{genderlist[genderIndex]?genderlist[genderIndex]:''}}
          </view>
        </view>
      </picker>
    </view>

    <view class="section1">
    <view class="weui-cell">
        <view class="weui-cell__bd">消耗积分</view>
        <input type="number" class="weui-cell__ft weui-cell__ft_in-access" name="activitycredit" :value="activitycredit"></input>
      </view>
      <view class="weui-cell">
        <view class="weui-cell__bd">每人花销</view>
        <input type="digit" class="weui-cell__ft weui-cell__ft_in-access" name="cost" :value="cost"></input>
      </view>
    </view>

    <button class="postBtn" :disabled="postLock" type="primary" formType="submit">发布</button>

  </form>
</view>
</view>
</template>

<script>
// pages/activity_post/activity_post.js
const postInfoUrl = require("../../config").postInfoUrl;
const uploadFileUrl = require("../../config").uploadFileUrl;
const postThreadUrl = require("../../config").postThreadUrl;
const util = require("../../utils/util.js");
const datacheck = require("../../utils/datacheck.js");
var self;
const app = getApp(); // 附件分类
// 附件分类
var fileCatalog = {
  image: 0,
  audio: 1,
  video: 2
};

export default {
  data() {
    return {
      imageList: [],
      genderlist: ['不限', '男', '女'],
      genderIndex: 0,
      postLock: false,
      activitytypelist: [],
      activityIndex: -1,
      fid: "",
      uploadhash: "",
      classTypeList: "",
      typeObj: "",
      enrolStart: "",
      enrolEnd: "",
      activityDateStart: "",
      activityTimeStart: "",
      activityDateEnd: "",
      activityTimeEnd: "",
      isSelf: false,
      activitytype: "",
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

    let pages = getCurrentPages(); //获取当前页面 

    let prevPage = pages[pages.length - 2]; //获取上个页面  

    if (prevPage.data.dataDic.Variables.activity_setting.activitytype) {
      let activitytypelist = prevPage.data.dataDic.Variables.activity_setting.activitytype;
      activitytypelist.push('自定义');
      self.setData({
        activitytypelist: activitytypelist
      });
    }

    self.checkPost();
  },
  methods: {
    checkPost() {
      var data = {
        fid: self.fid
      };
      var url = postInfoUrl + '&submodule=checkpost&version=5';
      app.globalData.apimanager.getRequest(url, data).then(res => {
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
      }).catch(res => {}); // app.apimanager.getRequest(postActivity, data).then(res => {
      //   if (res.Variables.activitytypelist) {
      //     var activitytypelist = res.Variables.activitytypelist
      //     activitytypelist.push('自定义')
      //     self.setData({
      //       activitytypelist: res.Variables.activitytypelist
      //     })
      //   }
      // }).catch(res => {})
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

    uploadFile(uploadSrc, type) {
      var uploadUrl = uploadFileUrl + '&fid=' + self.fid;
      let uploadhash = self.uploadhash;
      let uid = app.globalData.uid;
      let postDic = {
        hash: uploadhash,
        uid: uid
      };
      wx.showLoading({
        title: '上传附件',
        icon: 'loading'
      });
      app.globalData.apimanager.uploadFile(uploadUrl, uploadSrc, 'Filedata', postDic).then(res => {
        wx.hideLoading();
        var result = datacheck.uploadStatusCheck(res);

        if (result.success) {
          wx.showToast({
            title: '上传成功',
            icon: 'success',
            duration: app.globalData.duration
          });
          let aid = result.data;

          if (type == fileCatalog.image) {
            var imageList = [];
            let imgObj = {
              aid: aid,
              src: uploadSrc
            };
            imageList.push(imgObj);
            self.setData({
              imageList: imageList
            });
          }
        } else {
          wx.showModal({
            content: result.data,
            showCancel: false,
            confirmText: '确定'
          });
        }
      }).catch(res => {
        wx.hideLoading();
        console.log(res);
        wx.showModal({
          content: "上传失败",
          showCancel: false,
          confirmText: '确定'
        });
      });
    },

    bindEnrolStartChange(e) {
      self.setData({
        enrolStart: e.detail.value
      });
    },

    bindEnrolEndChange(e) {
      self.setData({
        enrolEnd: e.detail.value
      });
    },

    activityDateStartChange(e) {
      self.setData({
        activityDateStart: e.detail.value
      });
    },

    activityTimeStartChange(e) {
      self.setData({
        activityTimeStart: e.detail.value
      });
    },

    activityDateEndChange(e) {
      self.setData({
        activityDateEnd: e.detail.value
      });
    },

    activityTimeEndChange(e) {
      self.setData({
        activityTimeEnd: e.detail.value
      });
    },

    bindGenderChange(e) {
      self.setData({
        genderIndex: e.detail.value
      });
    },

    activityTypeChange(e) {
      var activityIndex = e.detail.value;
      self.setData({
        activityIndex: e.detail.value
      });

      if (activityIndex == self.activitytypelist.length - 1) {
        self.setData({
          isSelf: true,
          activitytype: ''
        });
      } else {
        self.setData({
          activitytype: self.activitytypelist[activityIndex]
        });
      }
    },

    formSubmit(e) {
      var errorInfo = '';
      var ifError = true;

      if (!e.detail.value.subject) {
        errorInfo = '请输入标题';
      } else if (datacheck.isEmojiCharacter(e.detail.value.message) || datacheck.isEmojiCharacter(e.detail.value.subject)) {
        errorInfo = '不能使用emoji表情';
      } else if (!e.detail.value.activitytype) {
        errorInfo = '选择活动类型';
      } else if (!self.activityDateStart) {
        errorInfo = '选择活动开始时间';
      } else if (!self.activityDateStart) {
        errorInfo = '选择活动结束时间';
      } else if (!e.detail.value.activityplace) {
        errorInfo = '选择活动地点';
      } else {
        ifError = false;
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

      var startTime = self.activityDateStart + " " + self.activityTimeStart;
      var endTime = self.activityDateEnd + " " + self.activityTimeEnd;
      var postData = {
        special: 4,
        formhash: app.globalData.formhash,
        allownoticeauthor: 1,
        subject: e.detail.value.subject,
        message: util.filterEmoji(e.detail.value.message),
        activitytime: 1,
        activityclass: e.detail.value.activitytype,
        'starttimefrom[1]': startTime,
        starttimeto: endTime,
        activityplace: e.detail.value.activityplace,
        activitynumber: e.detail.value.activitynumber,
        gender: self.genderIndex,
        activitycredit: e.detail.value.activitycredit,
        cost: e.detail.value.cost,
        activitystarttime: self.enrolStart,
        activityexpiration: self.enrolEnd,
        topicsubmit: 'yes'
      };

      if (self.imageList.length > 0) {
        for (let i = 0; i < self.imageList.length; i++) {
          let imgObj = self.imageList[i];
          let aid = imgObj['aid'];
          let attachKey = "attachnew[" + aid + "][description]";
          postData[attachKey] = '';
        }
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
          var pages = getCurrentPages();
          var prevPage = pages[pages.length - 2]; //上一个页面

          prevPage.refreshRequest();
          wx.navigateBack({});
        }

        wx.showToast({
          title: res.Message.messagestr,
          icon: 'none'
        });
      }).catch(res => {
        console.log(res);
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
@import "./activity_post.css";
</style>