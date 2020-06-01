<template>
<view>
<!--pages/question_answer_post/question_answer_post.wxml-->
<view class="weui-toptips weui-toptips_warn" v-if="showTopTips">{{errorInfo}}</view>
<view class="containView">
  <form catchsubmit="formSubmit">
    <input class="easyInput" name="subject" :value="title" placeholder="标题" focus="true" @focus="inputFocus" @blur="bindBlur" @input="titleInput"></input>

    <block v-if="searchKeyChange && !toAddDetail">
      <block v-for="(item, index) in searchResultList" :key="index">
        <view class="searchCell" @tap="cellClick" :id="item.tid">
          <view class="resultTitle">
            <block v-for="(subjectItem, index2) in item.subjectArr" :key="index2">
              <text :class="subjectItem == keyword ? 'resultkey' : ''">{{subjectItem}}</text>
            </block>
          </view>
          <view class="cell-info-left">
            <view class="icon-item cell-tag">
              <image class="cell-icon" src="https://mc.wpnicer.com/source/plugin/mobile/template/image/xiaochengxu/minimg/re_tag.png"></image>
              <view class="cell-icon-text">{{item.typename?item.typename:'分类'}}</view>
            </view>
            <view class="icon-item cell-recount">
              <image class="cell-icon" src="https://mc.wpnicer.com/source/plugin/mobile/template/image/xiaochengxu/minimg/re_dis.png"></image>
              <view class="cell-icon-text">{{item.replies}}个回答</view>
            </view>
          </view>
        </view>
      </block>
      <view class="noMoreView" :hidden="!hasMore">
        没有更多了
      </view>
    </block>

    <block v-if="searchKeyChange && toAddDetail">

      <picker class="classType" name="classType" mode="selector" :range="classTypeList" range-key="name" @change="classTypeChange" v-if="classTypeList">
        <text decode="true">{{classTypeList[classIndex].name?classTypeList[classIndex].name:'选分类'}}</text>
      </picker>

      <textarea class="weui-input detailText" v-if="!fullScreen" name="message" placeholder="问题描述" @blur="detailFinish" :focus="isText" maxlength="-1"></textarea>

      <!-- 上传图片 start -->
      <view class="attachmentContain" v-if="!isevaluate">
    <view class="audio-playView" v-if="recording">
      <image mode="widthFix" src="https://mc.wpnicer.com/source/plugin/mobile/template/image/xiaochengxu/minimg/record_close.png" class="record-close" @tap="clear"></image>
      <view class="record-time">{{formatedRecordTime}}</view>
      <image class="record-icon" src="https://mc.wpnicer.com/source/plugin/mobile/template/image/xiaochengxu/minimg/record_icon.png"></image>
      <view class="record-finish" @tap="stopRecord">完成</view>
    </view>

    <view class="playViewContain" v-if="audio">
      <view class="audio-playView">
      <image mode="widthFix" :src="is_play? 'https://mc.wpnicer.com/source/plugin/mobile/template/image/xiaochengxu/minimg/audio_play.png': 'https://mc.wpnicer.com/source/plugin/mobile/template/image/xiaochengxu/minimg/audio_paused.png'" class="audio-icon audio-play" @tap="audio_play"></image>
      <view class="control-process">
        <text class="current-process">
          <block v-if="current_process.length > 0">
          {{current_process}}
          </block>
          <block v-else>
          00:00
          </block>
        </text>
        <slider class="slider" @change="hanle_slider_change" @touchstart="handle_slider_move_start" @touchend="handle_slider_move_end" min="0" block-size="12" block-color="#6199fd" :max="slider_max" activeColor="#FFD100" backgroundColor="rgb(153,153,153,0.4)" :value="slider_value"></slider>
        <text class="total-process">
        <block v-if="total_process.length > 0">
          {{total_process}}
          </block>
          <block v-else>
          00:00
          </block>
        </text>
      </view>
    </view>
    <image class="deleteA audioDele" src="https://mc.wpnicer.com/source/plugin/mobile/template/image/xiaochengxu/minimg/att_delete.png" :id="audio.aid" @tap="deleteAudio"></image>
    </view>

  

    <view class="uploader__files">
      <block v-for="(image, index) in imageList" :key="index">
        <view class="uploader__file" :id="image.aid">
          <image class="uploader__img" :src="image.src" :data-src="image.src" @tap="previewImage"></image>
          <image class="deleteA" src="https://mc.wpnicer.com/source/plugin/mobile/template/image/xiaochengxu/minimg/att_delete.png" :id="image.aid" @tap="deleteImage">
          </image>
        </view>
      </block>
      <view class="uploader_videoContain" v-if="video">
         <view class="uploader__file" :id="image.aid">
          <video id="myVideo" class="uploader__video uploader__input" controls="false" show-fullscreen-btn="false" @play="playVideo" @fullscreenchange="fullScreenChange" :src="video.src"></video>
            <image class="deleteA" src="https://mc.wpnicer.com/source/plugin/mobile/template/image/xiaochengxu/minimg/att_delete.png" :id="video.aid" @tap="deleteVideo">
          </image>
        </view>
      </view>
      <image class="uploader__input" src="https://mc.wpnicer.com/source/plugin/mobile/template/image/xiaochengxu/minimg/post_addimage.png" @tap="chooseImage">
     </image>
      <image class="uploader__input" src="https://mc.wpnicer.com/source/plugin/mobile/template/image/xiaochengxu/minimg/post_addaudio.png" @tap="chooseAudio">
      </image>
      <image class="uploader__input" src="https://mc.wpnicer.com/source/plugin/mobile/template/image/xiaochengxu/minimg/post_addvideo.png" @tap="chooseVideo">
      </image>
    </view> 
  </view>

      <!-- 上传图片 end -->
      <button class="postBtn" :disabled="postLock" type="primary" formType="submit">提问</button>
    </block>

    <block v-if="searchKeyChange && !toAddDetail">
      <view class="addDetail" :disabled="postLock" type="primary" @tap.stop="addDetail" :style="'bottom:' + keyboardHeight + 'px'">添加详细描述</view>
    </block>
  </form>
</view>
</view>
</template>

<script>
// pages/question_answer_post/question_answer_post.js
const uploadFileUrl = require("../../config").uploadFileUrl;
const postInfoUrl = require("../../config").postInfoUrl;
const postThreadUrl = require("../../config").postThreadUrl;
const searchThreadUrl = require("../../config").searchThreadUrl;
const util = require("../../utils/util.js");
const datacheck = require("../../utils/datacheck.js");
var recordTimeInterval;
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
      searchKeyChange: false,
      toAddDetail: false,
      keyboardHeight: 0,
      title: '',
      keyword: '',
      page: 1,
      hasMore: true,
      recordTime: 0,
      recording: false,
      searchResultList: [],
      singleResultArr: [],
      imageList: [],
      fid: "",
      hasRecord: false,
      audioPrepareUrl: "",
      current_process: "",
      slider_value: "",
      total_process: "",
      slider_max: "",
      uploadhash: "",
      classTypeList: "",
      audio: "",
      video: "",
      fullScreen: "",
      status: 0,
      formatedRecordTime: "",
      is_play: false,
      is_ended: false,
      is_moving_slider: false,
      classIndex: "",
      errorInfo: "",
      showTopTips: false,
      postLock: false,
      currentTab: 0
    };
  },

  components: {},
  props: {},

  onReady() {
    this.videoContext = wx.createVideoContext('myVideo');
  },

  onHide: function () {
    if (self.recording) {
      self.setData({
        recording: false,
        recordTime: 0
      });
      self.stopRecord();
    }
  },
  onUnload: function () {
    wx.setKeepScreenOn({
      keepScreenOn: false
    });
  },
  onLoad: function (options) {
    self = this;

    if (options.fid) {
      self.setData({
        fid: options.fid
      });
    } // 语音


    this.recorderManager = wx.getRecorderManager();
    this.recorderManager.onError(function (res) {
      var errMsg = res.errMsg;

      if (errMsg.indexOf('auth deny') != -1) {// errMsg = "没有访问麦克风的权限"
        // wx.showToast({
        //   title: errMsg,
        //   icon: 'none'
        // })
      }
    });
    this.recorderManager.onStop(function (res) {
      self.setData({
        hasRecord: true
      });
      wx.setKeepScreenOn({
        keepScreenOn: false
      });
      clearInterval(recordTimeInterval);
      var recordTime = Math.floor(res.duration / 1000);
      self.setData({
        recordTime: recordTime
      });
      console.log(recordTime);

      if (self.recording) {
        self.setData({
          audioPrepareUrl: res.tempFilePath
        });
        self.uploadFile(res.tempFilePath, fileCatalog.audio);
      }
    });
    this.innerAudioContext = wx.createInnerAudioContext();
    this.innerAudioContext.onTimeUpdate(() => {
      if (!self.is_moving_slider) {
        // 播放中
        self.setData({
          current_process: util.formatTime(this.innerAudioContext.currentTime),
          slider_value: Math.floor(this.innerAudioContext.currentTime),
          total_process: util.formatTime(this.innerAudioContext.duration),
          slider_max: Math.floor(this.innerAudioContext.duration)
        });
      }

      if (this.innerAudioContext.currentTime >= self.recordTime) {
        self.stopVoice();
      }
    });
    self.checkPost();
    self.setData({
      keyword: '如何提高写作能力'
    });
    var singleResultArr = self.getHilightStrArray('如何提高写作能力？使写作水平提高', self.keyword);
    self.setData({
      singleResultArr: singleResultArr
    });
  },
  onPullDownRefresh: function () {},
  onReachBottom: function () {
    if (self.hasMore) {
      self.page++;
      self.searchThread();
    }
  },
  methods: {
    getHilightStrArray: function (str, key) {
      return str.replace(new RegExp(`${key}`, 'g'), `%%${key}%%`).split('%%');
    },

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

        types = array;
        self.setData({
          classTypeList: types
        });
      }).catch(res => {});
    },

    searchThread() {
      var data = {
        subject: self.keyword,
        fid: self.fid,
        page: self.page,
        formhash: app.globalData.formhash
      };
      app.globalData.apimanager.getRequest(searchThreadUrl, data).then(res => {
        if (res.Variables) {
          var arr = res.Variables.thread;

          for (let i = 0; i < arr.length; i++) {
            let resultItem = arr[i];
            var subjectArr = self.getHilightStrArray(resultItem.subject, self.keyword);
            resultItem['subjectArr'] = subjectArr;
          }

          if (self.page > 1) {
            arr = self.searchResultList.concat(arr);
          }

          self.setData({
            searchResultList: arr,
            hasMore: true
          });
        } else {
          if (self.page == 1) {
            self.setData({
              searchResultList: []
            });
          }

          self.setData({
            hasMore: false
          });
        }
      }).catch(res => {});
    },

    addDetail(e) {
      self.setData({
        toAddDetail: true
      });
    },

    inputFocus(e) {
      self.setData({
        keyboardHeight: e.detail.height
      });
    },

    bindBlur(e) {
      self.setData({
        keyboardHeight: 0
      });
    },

    titleInput(e) {
      if (self.title != e.detail.value) {
        self.setData({
          toAddDetail: false
        });

        if (e.detail.value) {
          self.setData({
            searchKeyChange: true
          });
          self.setData({
            page: 1,
            keyword: e.detail.value
          });
          self.searchThread();
        } else {
          self.setData({
            searchKeyChange: false
          });
        }
      }

      self.setData({
        title: e.detail.value
      });
    },

    chooseImage() {
      if (self.imageList.length == 9) {
        wx.showToast({
          title: '最多上传9张图片',
          icon: 'none'
        });
        return;
      }

      wx.chooseImage({
        count: 9 - self.imageList.length,

        success(res) {
          console.log(res);

          for (let key in res.tempFilePaths) {
            let imageSrc = res.tempFilePaths[key];
            self.uploadFile(imageSrc, fileCatalog.image);
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
      console.log(postDic);
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
            var imageList = self.imageList;
            let imgObj = {
              aid: aid,
              src: uploadSrc
            };
            imageList.push(imgObj);
            self.setData({
              imageList: imageList
            });
          } else if (type == fileCatalog.audio) {
            self.setData({
              audioPrepareUrl: ''
            });
            var data = {
              aid: aid,
              src: uploadSrc
            };
            let recordTime = self.recordTime;
            self.setData({
              audio: data,
              total_process: util.formatTime(recordTime),
              slider_max: Math.floor(recordTime),
              recording: false
            });
          } else if (type == fileCatalog.video) {
            var data = {
              aid: aid,
              src: uploadSrc
            };
            self.setData({
              video: data
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
        console.log(res);
        wx.hideLoading();
        wx.showModal({
          content: "上传失败",
          showCancel: false,
          confirmText: '确定'
        });
      });
    },

    playVideo() {
      self.videoContext.play();
      self.videoContext.requestFullScreen();
    },

    fullScreenChange(e) {
      console.log(e.detail);
      self.setData({
        fullScreen: e.detail.fullScreen
      });
    },

    previewImage(e) {
      const current = e.target.dataset.src;
      var imageSrcArray = [];

      for (let i = 0; i < self.imageList.length; i++) {
        let item = self.imageList[i];
        imageSrcArray.push(item.src);
      }

      wx.previewImage({
        current,
        urls: imageSrcArray
      });
    },

    chooseAudio() {
      if (self.audio) {
        wx.showToast({
          title: '最多上传一个语音',
          icon: 'none'
        });
        return;
      }

      if (self.recording) {
        return;
      }

      self.startRecord();
    },

    chooseVideo() {
      wx.chooseVideo({
        camera: 'back',
        maxDuration: 60,

        success(res) {
          self.uploadFile(res.tempFilePath, fileCatalog.video);
        }

      });
    },

    startRecord() {
      wx.authorize({
        scope: 'scope.record',

        success() {
          console.log("录音授权成功"); //第一次成功授权后 状态切换为2

          self.setData({
            status: 2
          }); // 用户已经同意小程序使用录音功能，后续调用 self.recordStart 接口不会弹窗询问

          self.recordStartNow();
        },

        fail() {
          wx.showModal({
            title: '提示',
            content: '您未授权录音，功能将无法使用',
            showCancel: true,
            confirmText: "授权",
            confirmColor: "#52a2d8",
            success: function (res) {
              if (res.confirm) {
                //确认则打开设置页面（重点）
                wx.openSetting({
                  success: res => {
                    console.log(res.authSetting);

                    if (!res.authSetting['scope.record']) {
                      //未设置录音授权
                      console.log("未设置录音授权");
                      wx.showModal({
                        title: '提示',
                        content: '您未授权录音，功能将无法使用',
                        showCancel: false,
                        success: function (res) {}
                      });
                    } else {
                      //第二次才成功授权
                      self.setData({
                        status: 2
                      });
                      self.recordStartNow();
                    }
                  },
                  fail: function () {
                    console.log("授权设置录音失败");
                  }
                });
              } else if (res.cancel) {
                console.log("cancel");
              }
            },
            fail: function () {
              console.log("openfail");
            }
          });
        }

      });
    },

    recordStartNow() {
      clearInterval(recordTimeInterval);
      self.setData({
        recording: true,
        recordTime: 0,
        formatedRecordTime: '00:00'
      });
      wx.setKeepScreenOn({
        keepScreenOn: true
      });
      recordTimeInterval = setInterval(function () {
        const recordTime = self.recordTime += 1;
        self.setData({
          formatedRecordTime: util.formatTime(self.recordTime),
          recordTime
        });
      }, 1000);
      this.recorderManager.start({
        format: 'mp3',
        duration: 180000
      });
    },

    stopRecord() {
      clearInterval(recordTimeInterval);
      this.recorderManager.stop();

      if (self.audioPrepareUrl) {
        self.uploadFile(self.audioPrepareUrl, fileCatalog.audio);
      }
    },

    // 点击播放暂停
    audio_play: function () {
      if (self.is_play) {
        self.setData({
          is_play: false
        });
        console.log('暂停');
        self.innerAudioContext.pause();
      } else if (!this.is_play && this.is_ended) {
        self.playVoice();
        self.setData({
          is_play: true,
          is_ended: false
        });
      } else if (!this.is_play) {
        console.log("即将播放");
        self.setData({
          is_play: true
        });
        self.playVoice();
      }
    },

    // 拖动进度条，到指定位置
    hanle_slider_change(e) {
      const position = e.detail.value;
      this.seekCurrentAudio(position);
    },

    // 拖动进度条控件
    seekCurrentAudio(position) {
      this.innerAudioContext.seek(position);
      self.setData({
        current_process: util.formatTime(position),
        slider_value: Math.floor(position)
      });
    },

    // 进度条滑动
    handle_slider_move_start() {
      this.setData({
        is_moving_slider: true
      });
    },

    handle_slider_move_end() {
      this.setData({
        is_moving_slider: false
      });
    },

    playVoice() {
      var src = this.audio.src;

      if (src == '') {
        return;
      }

      this.innerAudioContext.src = src;
      this.innerAudioContext.play();
    },

    stopVoice() {
      this.setData({
        current_process: util.formatTime(0),
        slider_value: Math.floor(0),
        is_play: false
      });
      self.innerAudioContext.stop();
    },

    clear() {
      self.setData({
        is_play: false,
        hasRecord: false,
        recording: false,
        audio: null,
        formatedRecordTime: util.formatTime(0),
        recordTime: 0
      });
      self.stopRecord();
    },

    deleteVideo(e) {
      var aid = e.currentTarget.id;
      console.log(aid);
      self.setData({
        video: null
      });
    },

    deleteImage(e) {
      var aid = e.currentTarget.id;
      var imageList = self.imageList;
      var index;

      for (let i = 0; i < imageList.length; i++) {
        let data = imageList[i];

        if (data.aid == aid) {
          index = i;
        }
      }

      imageList.splice(index, 1);
      self.setData({
        imageList: imageList
      });
      console.log(aid);
    },

    deleteAudio(e) {
      var aid = e.currentTarget.id;
      self.setData({
        audio: null
      });
    },

    classTypeChange(e) {
      var classIndex = e.detail.value;
      console.log(classIndex);
      self.setData({
        classIndex: classIndex
      });
    },

    formSubmit(e) {
      let msg = e.detail.value.message;
      let subject = e.detail.value.subject;
      let isError = false;
      let errStr = '';

      if (!subject) {
        isError = true;
        errStr = '请输入标题';
      }

      var postDic = {
        formhash: app.globalData.formhash,
        message: util.filterEmoji(msg),
        subject: subject,
        special: 3,
        // 悬赏
        rewardprice: 1,
        // 悬赏金钱
        cityid: self.cityid,
        districtid: self.districtid,
        schoolid: self.schoolid
      };

      if (self.classTypeList) {
        if (!e.detail.value.classType) {
          isError = true;
          errStr = '请选择提问类型';
        } else {
          let typeIndex = parseInt(e.detail.value.classType);
          let classObj = self.classTypeList[typeIndex];
          postDic['typeid'] = classObj.typeid;
        }
      }

      if (isError) {
        self.setData({
          errorInfo: errStr,
          showTopTips: true
        });
        setTimeout(function () {
          self.setData({
            showTopTips: false
          });
        }, 2000);
        return;
      }

      if (self.imageList.length > 0) {
        for (let i = 0; i < self.imageList.length; i++) {
          let imgObj = self.imageList[i];
          let aid = imgObj['aid'];
          let attachKey = "attachnew[" + aid + "][description]";
          postDic[attachKey] = '';
        }
      }

      if (self.audio) {
        let attachKey = "attachnew[" + self.audio.aid + "][description]";
        postDic[attachKey] = self.recordTime;
      }

      if (self.video) {
        let attachKey = "attachnew[" + self.video.aid + "][description]";
        postDic[attachKey] = '';
      }

      wx.showLoading({
        title: '发布中...',
        icon: 'loading'
      });
      self.setData({
        postLock: true
      });
      var url = postThreadUrl + '&fid=' + self.fid;
      app.globalData.apimanager.postRequest(url, postDic).then(res => {
        wx.hideLoading();
        self.setData({
          postLock: false
        });

        if (res.Message.messageval.indexOf('succeed') != -1 || res.Message.messageval.indexOf('success') != -1) {
          let pages = getCurrentPages(); //获取当前页面 

          let prevPage = pages[pages.length - 2]; //获取上个页面 

          prevPage.setData({
            currentTab: 1
          });
          prevPage.refreshRequest();
          wx.navigateBack();
          wx.showToast({
            title: '发表成功',
            icon: 'success',
            mask: true,
            duration: 3000
          });
        } else {
          wx.showToast({
            title: res.Message.messagestr,
            icon: 'none'
          });
        }
      }).catch(res => {
        console.log(res);
        wx.hideLoading();
        self.setData({
          postLock: false
        });
        wx.showToast({
          title: '出错了！',
          icon: 'none'
        });
      });
    },

    cellClick(e) {
      wx.navigateTo({
        url: '../question_answer_detail/question_answer_detail?tid=' + e.currentTarget.id
      });
    }

  }
};
</script>
<style>
@import "./question_answer_post.css";
</style>