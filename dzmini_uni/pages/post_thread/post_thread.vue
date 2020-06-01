<template>
<view>
<!--pages/post_thread/post_thread.wxml-->
<view class="container">
  <form catchsubmit="formSubmit">
    <!-- <view class='classTypeView' wx:if="{{fid!=2&&classTypeList && !isreply && !isevaluate}}">
      <picker class='classType' name="classType" mode="selector" range="{{classTypeList}}" range-key='name' bindchange="classTypeChange">
        <text decode="{{true}}">{{classTypeList[classIndex].name?classTypeList[classIndex].name:'课程分类'}}</text>
      </picker>
    </view> -->
    <!--  -->
    <view class="classTypeView" v-if="!isreply && !isevaluate">
      <picker class="easyType" name="classType" mode="selector" :range="classTypeList" range-key="name" @change="classTypeChange" v-if="classTypeList.length > 0">
        <text class="text-deal" decode="true">{{classTypeList[classIndex].name?classTypeList[classIndex].name:'选分类'}}</text>
      </picker>
      <input class="easyInput" name="subject" placeholder="标题"></input>
    </view>

    <textarea v-if="!fullScreen" class="weui-input detailText" name="message" :placeholder="detailplaceholder" :value="detaiContent" @blur="detailFinish" :focus="isText" maxlength="-1"></textarea>
    <view class="weui-input detailText" v-if="fullScreen" @tap="detailBegin">{{detaiContent?detaiContent:detailplaceholder}}</view>

    <view class="attachmentContain" v-if="!isevaluate">
      <view class="audio-playView" v-if="recording">
        <image mode="widthFix" src="https://mc.wpnicer.com/source/plugin/mobile/template/image/xiaochengxu/minimg/record_close.png" class="record-close" @tap="clear"></image>
        <view class="record-time">{{formatedRecordTime}}</view>
        <image class="record-icon" src="https://mc.wpnicer.com/source/plugin/mobile/template/image/xiaochengxu/minimg/record_icon.png" @tap="parse" :data-type="is_parse"></image>
        <view class="record-finish" @tap="stopRecord">完成</view>
      </view>

      <view class="playViewContain" v-if="audio">
        <view class="audio-playView">
          <image mode="widthFix" :src="is_play?'https://mc.wpnicer.com/source/plugin/mobile/template/image/xiaochengxu/minimg/audio_play.png': 'https://mc.wpnicer.com/source/plugin/mobile/template/image/xiaochengxu/minimg/audio_paused.png'" class="audio-icon audio-play" @tap="audio_play"></image>
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
        <image class="uploader__input" v-if="imageList.length !== 9" src="https://mc.wpnicer.com/source/plugin/mobile/template/image/xiaochengxu/minimg/post_addimage.png" @tap="chooseImage">
        </image>
        <image class="uploader__input" src="https://mc.wpnicer.com/source/plugin/mobile/template/image/xiaochengxu/minimg/post_addaudio.png" @tap="chooseAudio">
        </image>
        <image class="uploader__input" src="https://mc.wpnicer.com/source/plugin/mobile/template/image/xiaochengxu/minimg/post_addvideo.png" @tap="chooseVideo">
        </image>
      </view>
    </view>
    <button class="postBtn" :disabled="postLock" type="primary" formType="submit">发布</button>
  </form>
</view>

<secode :codeShow="codeShow" @secodeSubmit="secodeSubmit" id="secode">
</secode>
</view>
</template>

<script>
// pages/post_thread/post_thread.js
const postThreadUrl = require("../../config").postThreadUrl;
const postReplyUrl = require("../../config").postReplyUrl;
const postInfoUrl = require("../../config").postInfoUrl;
const uploadFileUrl = require("../../config").uploadFileUrl;
const replyWorkUrl = require("../../config").replyWorkUrl;
const util = require("../../utils/util.js");
const datacheck = require("../../utils/datacheck.js");
var event = require("../../utils/event.js");
var self;
const app = getApp();
var recordTimeInterval; // 附件分类
// 附件分类
var fileCatalog = {
  image: 0,
  audio: 1,
  video: 2
};
import secode from "../../component/secode/secode";

export default {
  data() {
    return {
      classIndex: 0,
      fid: '',
      tid: '',
      is_quan: false,
      uploadhash: '',
      classTypeList: null,
      imageList: [],
      recordTime: 0,
      recording: false,
      detaiContent: '',
      isreply: false,
      is_fenl: false,
      detailplaceholder: '详细内容',
      audioPrepareUrl: '',
      postLock: false,
      is_parse: 1,
      fullScreen: false,
      isText: false,
      threads: "",
      isevaluate: "",
      pid: "",
      hasRecord: false,
      current_process: "",
      slider_value: "",
      total_process: "",
      slider_max: "",
      formatedRecordTime: "",
      audio: "",
      video: "",
      status: 0,
      is_play: false,
      is_ended: false,
      is_moving_slider: false,
      postDic: "",
      codeShow: false
    };
  },

  components: {
    secode
  },
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
    if (self.recording) {
      self.setData({
        recording: false,
        recordTime: 0
      });
      self.stopRecord();
      this.recorderManager = null;
    }

    wx.setKeepScreenOn({
      keepScreenOn: false
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    self = this;
    this.secode().requestCode('post');
    var fid = options.fid;
    let isreply = options.isreply;
    let isevaluate = options.isevaluate;
    var is_quan = options.is_quan ? options.is_quan : false;

    if (is_quan) {
      self.setData({
        detailplaceholder: '话题'
      });
    }

    if (isreply || isevaluate) {
      let pages = getCurrentPages(); //获取当前页面 

      let prevPage = pages[pages.length - 2]; //获取上个页面  

      let threads = prevPage.data.thread;
      var tid = '';

      if (threads) {
        self.setData({
          threads: threads
        });
        fid = threads.fid;
        tid = threads.tid;
      }

      if (options.tid) {
        tid = options.tid;
      }

      if (isevaluate) {
        self.setData({
          isevaluate: isevaluate,
          pid: options.pid
        });
      } else if (isreply) {
        self.setData({
          isreply: isreply
        });
      }

      console.log(tid);
      self.setData({
        tid: tid,
        detailplaceholder: '评论（不少于10个字）'
      });

      if (self.isreply || self.isevaluate) {
        wx.setNavigationBarTitle({
          title: '回复'
        });
      }

      if (options.type) {
        if (options.type == 'text') {
          self.setData({
            isText: true
          });
        } else if (options.type == 'image') {
          setTimeout(function () {
            self.chooseImage();
          }, 300);
        } else if (options.type == 'audio') {
          self.chooseAudio();
        } else if (options.type == 'video') {
          setTimeout(function () {
            self.chooseVideo();
          }, 300);
        }
      }
    }

    self.setData({
      fid: fid,
      is_quan: is_quan
    });

    if (self.isreply || self.isevaluate) {
      var navtitle = '回复';
      wx.setNavigationBarTitle({
        title: navtitle
      });
    }

    self.checkPost(); // 语音

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
      console.log('self.data.recording', self.recording);

      if (self.recording) {
        self.setData({
          audioPrepareUrl: res.tempFilePath
        });
        console.log('res.tempFilePath', res.tempFilePath);
        self.uploadFile(res.tempFilePath, fileCatalog.audio);
      }
    });
    this.recorderManager.onPause(function (res) {});
    this.recorderManager.onResume(function (res) {});
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
  },
  methods: {
    detailBegin() {
      this.setData({
        fullScreen: false,
        isText: true
      });
    },

    detailFinish(e) {
      self.setData({
        detaiContent: e.detail.value
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

    secode() {
      return this.selectComponent('#secode');
    },

    secodeSubmit(e) {
      this.postDic['sechash'] = e.detail.sechash;
      this.postDic['seccodeverify'] = e.detail.seccodeverify;
      this.postThread();
    },

    parse: function (e) {
      if (e.currentTarget.dataset.type == 1) {
        this.recorderManager.pause();
        clearInterval(recordTimeInterval);
        this.setData({
          is_parse: 2
        });
      } else {
        this.recorderManager.resume();
        recordTimeInterval = setInterval(function () {
          const recordTime = self.recordTime += 1;
          self.setData({
            formatedRecordTime: util.formatTime(self.recordTime),
            recordTime
          });
        }, 1000);
        this.setData({
          is_parse: 1
        });
      }
    },

    classTypeChange(e) {
      var classIndex = e.detail.value;
      console.log(classIndex);
      self.setData({
        classIndex: classIndex
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
      // if (self.data.audio) {
      //   wx.showToast({
      //     title: '最多上传一个语音',
      //     icon: 'none'
      //   })
      //   return
      // }
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
        formatedRecordTime: '00:00',
        audioPrepareUrl: ''
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

    formSubmit(e) {
      if (datacheck.isEmojiCharacter(e.detail.value.message) || datacheck.isEmojiCharacter(e.detail.value.subject)) {
        wx.showToast({
          title: '不能使用emoji表情',
          icon: 'none'
        });
        return;
      }

      var postDic = {
        formhash: app.globalData.formhash
      };

      if (e.detail.value.message) {
        if (e.detail.value.message.length > 0) {
          let msg = e.detail.value.message;
          postDic['message'] = msg;

          if (!self.isreply && !self.isevaluate) {
            let length = msg.length < 40 ? msg.length : 40;
            postDic['subject'] = msg.substr(0, length);
          }
        }
      } else {
        let msg = self.detaiContent;
        postDic['message'] = msg;

        if (!self.isreply && !self.isevaluate) {
          let length = msg.length < 40 ? msg.length : 40;
          postDic['subject'] = msg.substr(0, length);
        }
      }

      if (e.detail.value.subject) {
        postDic['subject'] = e.detail.value.subject;
      } else if (!(self.isreply || self.isevaluate)) {
        wx.showToast({
          title: '请输入标题',
          icon: 'none'
        });
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

      if (this.classTypeList && this.classTypeList.length > 0 && !this.isreply && !this.isevaluate) {
        if (e.detail.value.classType.length <= 0) {
          e.detail.value.classType = 0;
        }

        let typeIndex = parseInt(e.detail.value.classType);
        let classObj = this.classTypeList[typeIndex];
        postDic['typeid'] = classObj.typeid;
      }

      this.setData({
        postDic: postDic
      });

      if (this.secode().haveCode()) {
        this.setData({
          codeShow: true
        });
        this.setData({
          fullScreen: true
        });
        return;
      }

      this.postThread();
    },

    postThread() {
      self.setData({
        postLock: true
      });
      var isRefresh = false;
      var url = postThreadUrl;

      if (self.isreply) {
        // 交作业
        url = postReplyUrl + '&fid=' + self.fid + '&tid=' + self.tid;

        if (self.is_quan) {
          isRefresh = true;
        }
      } else if (self.isevaluate) {
        // 回复作业
        url = replyWorkUrl + '&tid=' + self.tid + '&pid=' + self.pid;
      } else {
        // 发帖 发布作业
        isRefresh = true;
        url = url + '&fid=' + self.fid;
      }

      wx.showLoading({
        title: '发布中...',
        icon: 'loading'
      });
      var postDic = this.postDic;
      app.globalData.apimanager.postRequest(url, postDic).then(res => {
        wx.hideLoading();

        if (res.Message.messageval.indexOf('succeed') != -1 || res.Message.messageval.indexOf('success') != -1) {
          if (isRefresh && self.is_quan) {
            // 发作业题目
            if (self.isreply) {
              event.emit('indexChanged', {
                name: 'workRefresh',
                reply: true,
                tid: self.tid
              });
            } else {
              event.emit('indexChanged', {
                name: 'workRefresh'
              });
            }
          } else {
            // 交作业
            var pages = getCurrentPages();
            var prevPage = pages[pages.length - 2]; //上一个页面

            prevPage.refreshRequest();
          }

          if (res.Message.messagestr.indexOf('审核') != -1) {
            setTimeout(function () {
              wx.navigateBack();
            }, 2000);
          } else {
            wx.navigateBack();
          }
        } else {
          self.setData({
            postLock: false
          });
        }

        wx.showToast({
          title: res.Message.messagestr,
          icon: 'none',
          mask: true,
          duration: app.globalData.duration
        });
      }).catch(res => {
        console.log(res);
        wx.hideLoading();
        self.setData({
          postLock: false
        });
        wx.showToast({
          title: '服务器繁忙，请稍后再试！',
          icon: 'none'
        });
      });
    }

  }
};
</script>
<style>
@import "./post_thread.css";
</style>