<template>
<view>
<!--pages/forumdisplay/forumdisplay.wxml-->
<!--<import src="../common_temp/audio_player.wxml"></import>-->
<view class="containView">
  <view class="classInfoBg borderShowdow">
    <view class="easyTalkDesc">
      <view class="class-numberItem">
        <view class="class-number">{{dataDic.Variables.forum.posts?dataDic.Variables.forum.posts:"0"}}</view>
        <view class="class-numberItem-name">总帖数</view>
      </view>
      <view class="class-numberItem">
        <view class="class-number">{{dataDic.Variables.forum.threads?dataDic.Variables.forum.threads:"0"}}</view>
        <view class="class-numberItem-name">主题</view>
      </view>
      <view class="class-numberItem">
        <view class="class-number">{{dataDic.Variables.forum.rank?dataDic.Variables.forum.rank:'0'}}</view>
        <view class="class-numberItem-name">排名</view>
      </view>
    </view>
    <view class="forum-desc"><rich-text :nodes="dataDic.Variables.forum.description"></rich-text></view>
  </view>
</view>

<view class="messageList borderShowdow">
  <view class="easyTalkNav">
    <block v-for="(item, index) in easyNav" :key="index">
      <view :class="'easyTalkNavItem  ' + (order == index ?'easyTalkActive':'')" :id="index" @tap="navClick">{{item.name}}</view>
    </block>
  </view>

  <view class="easyTop" v-if="toplist.length > 0">
    <block v-for="(item, index) in toplist" :key="index">
      <view class="easyTopCell" :id="index" @tap="topCellClick">
        <text>置顶</text>{{item.subject}}</view>
    </block>
  </view>

  <block v-for="(cellItem, cellIdx) in datalist" :key="cellIdx">
    <view class="classCell" :id="cellIdx" @tap="cellClick">
      <image class="class-cell-avatar" :src="userAvatar + '' + cellItem.authorid"></image>
      <view class="class-cell-contentView">
        <view class="username">
          {{member_nickname?member_nickname:cellItem.author}}
        </view>
        <view class="message">
          <text class="special" v-if="cellItem.special != 0 && cellItem.special != 2 && cellItem.special != 5">
      <block v-if="cellItem.special==1">投票</block>
      <block v-if="cellItem.special==2">商品</block>
      <block v-if="cellItem.special==3">悬赏</block>
      <block v-if="cellItem.special==4">活动</block>
      <block v-if="cellItem.special==5">辩论</block>
      </text> {{cellItem.subject}}
        </view>

        
        <view :class="'attachementView ' + (attCount.onlyVideo(cellItem)?'singleVideo':'')" v-if="cellItem.attachlist.length > 0" @tap.stop="attCount.onlyVideo(cellItem)?'clickVideo':''" :id="attCount.onlyVideo(cellItem)?cellItem.videoA[0].attachment:''">

          <block v-for="(attItem, aidx) in cellItem.imageA" :key="aidx" v-if="aidx < (cellItem.videoA.length > 0 ? 8 : 9)">
            <image :class="'attachement ' + (attCount.onlyImg(cellItem)?'singleAtt':'')" :mode="attCount.onlyImg(cellItem)?'widthFix':'aspectFill'" :src="attItem.thumb + ' '" :id="aidx" :data-cellindex="cellIdx" @tap.stop="lookImage"></image>
          </block>
          <block v-for="(video, aidx) in cellItem.videoA" :key="aidx" v-if="aidx < 1">
            <image @tap.stop="clickVideo" :id="video.attachment" class="attachement" src="https://mc.wpnicer.com/source/plugin/mobile/template/image/xiaochengxu/minimg/videoPlace.png"></image>
          </block>

          <block v-if="cellItem.audioA">
            <block v-for="(audio, aid) in cellItem.audioA" :key="aid">
              <block data-type="template" data-is="audio_player" data-attr="...audio.toolUse">
  <view class="audio-playView">
    <image :src="is_play && currentAudio == attachment? 'https://mc.wpnicer.com/source/plugin/mobile/template/image/xiaochengxu/minimg/audio_play.png': 'https://mc.wpnicer.com/source/plugin/mobile/template/image/xiaochengxu/minimg/audio_paused.png'" class="audio-icon audio-play" :data-listindex="listIndex" @tap.stop="audio_play" :id="attachment"></image>
    <view class="control-process">
      <text class="current-process">
        <block v-if="current_process.length > 0 && currentAudio == attachment">
        {{current_process}}
        </block>
        <block v-else>
        00:00
        </block>
      </text>
      
      <text class="total-process">
        <block>
        {{total_process}}
        </block>
      </text>
      <slider class="slider" @change="hanle_slider_change" @touchstart="handle_slider_move_start" @touchend="handle_slider_move_end" min="0" block-size="12" block-color="#6199fd" :max="slider_max" activeColor="#FFD100" backgroundColor="rgb(153,153,153,0.4)" :value="(currentAudio == attachment)?slider_value:0"></slider>

    </view>
  </view>
</block>
            </block>
          </block>

        </view>
        <rich-text class="class-cell-time" :nodes="cellItem.dateline"></rich-text>
        <view class="toolRight">
          <view class="shareHidden borderShowdow" v-if="cellItem.shareshow == 1">
            <button open-type="share" plain="true" @tap.stop="listShare" :id="cellIdx">
              <image class="shareIcon" src="https://mc.wpnicer.com/source/plugin/mobile/template/image/xiaochengxu/minimg/workshare.png"></image>
            </button>
            <button plain="true" @tap.stop="disVoice" :id="cellIdx">
              <image class="shareIcon" src="https://mc.wpnicer.com/source/plugin/mobile/template/image/xiaochengxu/minimg/workvoice.png"></image>
            </button>
          </view>
          <image src class="discIcon" @tap.stop="discClick" :data-tid="cellItem.tid" :id="cellIdx"></image>
        </view>
      </view>
    </view>
  </block>
  <view class="emptyView" :hidden="!(datalist.length == 0 && toplist.length == 0)">
    <view style="width:100%;height:10rpx"></view>
    <image src="https://mc.wpnicer.com/source/plugin/mobile/template/image/xiaochengxu/minimg/emptyIcon.png"></image>
    <view class="emptyMsg">
      <block v-if="order!=3">
        您可真幸运，版块第一篇内容属于您发布的，赶紧去
        <text @tap.stop="postEnter">发布</text>吧
      </block>
      <block v-else>
        还没有精华推荐哦~
      </block>
    </view>
  </view>
</view>
<view class="noMoreView" :hidden="!noMore">
  别再用力了，你已经滑到底啦
</view>

<!-- postEnter -->
<post_selectMask :group="dataDic.Variables.group" :allowspecialonly="dataDic.Variables.forum.allowspecialonly" :postTypeArr="postTypeArr" @postThread="postThreadType">
  <image src="https://mc.wpnicer.com/source/plugin/mobile/template/image/xiaochengxu/minimg/postEnter.png" class="postEnter borderShowdow" @tap="postEnter">发布</image>
</post_selectMask>
</view>
</template>

<script module="attCount" lang="wxs" src="./attCount.wxs"></script>

<script>
// pages/forumdisplay/forumdisplay.js
const forumdisplayUrl = require("../../config").forumdisplayUrl;
const userAvatar = require("../../config").userAvatar;
const util = require("../../utils/util.js");
const loginmanager = require("../../utils/loginManager");
const app = getApp();
var self;
import post_selectMask from "../../component/post_selectMask/post_selectMask";

export default {
  data() {
    return {
      userAvatar,
      fid: '',
      toplist: [],
      pagenum: 1,
      notThisFidCount: 0,
      order: 0,
      fullScreen: false,
      easyNav: [{
        name: '全部'
      }, {
        name: '最新'
      }, {
        name: '热帖'
      }, {
        name: '精华'
      }],
      uid: "",
      appdev: "",
      types: "",
      datalist: "",
      dataDic: "",
      postTypeArr: "",
      noMore: "",
      currentVideo: "",
      is_moving_slider: false,
      currentAudio: ""
    };
  },

  components: {
    post_selectMask
  },
  props: {},
  onLoad: function (options) {
    self = this;
    this.fid = options.fid;
    wx.showLoading();
    this.requestData();
    self.setupAudioPlayer();
    var uid = app.globalData.uid;
    var appdev = app.globalData.appdev;
    this.setData({
      uid: uid,
      appdev: appdev
    });
  },

  onReady() {
    this.videoContext = wx.createVideoContext('myVideo');
  },

  onUnload: function () {
    self.innerAudioContext.destroy();
  },
  onPullDownRefresh: function () {
    this.pagenum = 1;
    this.notThisFidCount = 0;
    this.requestData();
  },
  onReachBottom: function () {
    if (!this.noMore) {
      this.pagenum++;
      this.requestData();
    }
  },
  methods: {
    navClick(e) {
      this.setData({
        order: e.currentTarget.id,
        pagenum: 1
      });
      this.requestData();
    },

    refreshRequest() {
      this.pagenum = 1;
      this.requestData();
    },

    requestData() {
      var data = {
        fid: this.fid,
        page: this.pagenum,
        submodule: 'checkpost'
      };

      if (this.order) {
        switch (this.order) {
          case '0':
            {}
            break;

          case '1':
            {
              data['filter'] = 'author';
              data['orderby'] = 'dateline';
            }
            break;

          case '2':
            {
              data['filter'] = 'heat';
              data['orderby'] = 'heats';
            }
            break;

          case '3':
            {
              data['filter'] = 'digest';
              data['digest'] = '1';
            }
            break;
        }
      }

      app.globalData.apimanager.getRequest(forumdisplayUrl, data).then(res => {
        wx.stopPullDownRefresh();
        wx.hideLoading();

        if (res.Message) {
          let messageval = res.Message.messageval;

          if (messageval.indexOf('nonexistence') != -1 || messageval.indexOf('nopermission') != -1 || messageval.indexOf('beoverdue') != -1 || messageval.indexOf('nomedal') != -1) {
            wx.showModal({
              title: "提示",
              content: res.Message.messagestr,
              showCancel: false,
              confirmText: "知道了",
              success: function (res) {
                if (res.confirm) {
                  wx.navigateBack();
                }
              }
            });
            return;
          }
        }

        let arr1 = res.Variables.forum_threadlist;

        if (res.Variables.threadtypes) {
          this.setData({
            types: res.Variables.threadtypes.types
          });
        }

        var topArr = [];
        var commonArr = [];
        var topCheckArr = ['1', '2', '3'];

        for (let i = 0; i < arr1.length; i++) {
          let postItem = arr1[i];

          if (postItem.message && postItem.message.length > 0) {
            postItem.message = util.filterHtml(postItem.message);
          }

          let attachments = postItem.attachlist;

          if (attachments) {
            let imageA = [];
            let audioA = [];
            let videoA = [];

            for (let k = 0; k < attachments.length; k++) {
              let attItem = attachments[k];
              let realIndex = commonArr.length;

              if (this.pagenum > 1) {
                realIndex = commonArr.length + this.datalist.length;
              }

              if (attItem.type == 'image') {
                attItem['toolUse'] = {
                  listIndex: realIndex,
                  imageIndex: k
                };
                imageA.push(attItem);
              } else if (attItem.type == 'audio') {
                let total_process = '00:00';

                if (attItem.description) {
                  total_process = util.formatTime(parseInt(attItem.description));
                }

                attItem['toolUse'] = {
                  attachment: attItem.attachment,
                  listIndex: realIndex,
                  total_process: total_process
                };
                audioA.push(attItem);
              } else if (attItem.type == 'video') {
                videoA.push(attItem);
              }
            }

            postItem['imageA'] = imageA;
            postItem['audioA'] = audioA;
            postItem['videoA'] = videoA;
          }

          if (topCheckArr.indexOf(postItem.displayorder) != -1) {
            if (this.pagenum == 1) {
              if (this.fid != postItem.fid) {
                this.notThisFidCount++;
              }
            }

            topArr.push(postItem);
          } else {
            commonArr.push(postItem);
          }
        }

        if (this.pagenum == 1) {
          this.setData({
            toplist: topArr
          });
        }

        arr1 = commonArr;

        if (this.pagenum > 1 && arr1.length > 0) {
          arr1 = this.datalist.concat(arr1);
        }

        this.setData({
          datalist: arr1,
          dataDic: res
        });
        var group = res.Variables.group;
        var postTypeArr = [];

        if (res.Variables.forum.allowspecialonly == 0) {
          postTypeArr.push(0);
        }

        if (group) {
          if (group.allowpostpoll) {
            postTypeArr.push(1);
          }

          if (group.allowpostactivity) {
            postTypeArr.push(4);
          }
        }

        this.setData({
          postTypeArr: postTypeArr
        });
        var noMore = false;
        var getTotal = this.datalist.length + this.toplist.length;
        var threadCount = parseInt(res.Variables.forum.threadcount) + this.notThisFidCount;

        if (getTotal >= threadCount) {
          noMore = true;
        }

        this.setData({
          noMore: noMore
        });
        wx.setNavigationBarTitle({
          title: res.Variables.forum.name
        });
      }).catch(res => {
        wx.hideLoading();
        wx.stopPullDownRefresh();
      });
    },

    // 播放视频 -------------------
    clickVideo(e) {
      self.setData({
        currentVideo: e.currentTarget.id
      });
      self.videoContext.play();
      self.videoContext.requestFullScreen({
        direction: 0
      });
      this.setData({
        fullScreen: true
      });
    },

    fullScreenChange(e) {
      if (!e.detail.fullScreen) {
        self.videoContext.stop();
        self.setData({
          fullScreen: false
        });
      }
    },

    /* *********************** 语音相关start *********** */
    setupAudioPlayer() {
      this.innerAudioContext = wx.createInnerAudioContext();
      this.innerAudioContext.obeyMuteSwitch = false;
      this.innerAudioContext.onEnded(res => {
        self.currentAudio.toolUse.is_ended = true;
        self.stopVoice();
      });
      this.innerAudioContext.onTimeUpdate(() => {
        if (!self.is_moving_slider) {
          // 播放中
          self.currentAudio = self.datalist[self.currentAudio.toolUse.listIndex].audioA[0];
          let param = {};
          let toolUsestr = "datalist[" + self.currentAudio.toolUse.listIndex + "].audioA[0].toolUse";
          let toolUse = self.currentAudio.toolUse;
          toolUse['current_process'] = util.formatTime(this.innerAudioContext.currentTime);
          toolUse['slider_value'] = Math.floor(this.innerAudioContext.currentTime);
          toolUse['slider_max'] = Math.floor(this.innerAudioContext.duration);
          param[toolUsestr] = toolUse;
          self.setData(param);
        }
      });
    },

    // 拖动进度条，到指定位置
    hanle_slider_change(e) {
      const position = e.detail.value;
      this.seekCurrentAudio(position);
    },

    // 拖动进度条控件
    seekCurrentAudio(position) {
      this.innerAudioContext.seek(position);
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

    // 点击播放暂停
    audio_play(e) {
      let listIndex = e.currentTarget.dataset.listindex;
      let postItem = self.datalist[listIndex];
      let currentAudio = postItem.audioA[0];
      self.setData({
        currentAudio: currentAudio
      });
      var param = {};
      let audioset = "datalist[" + listIndex + "].audioA[0].toolUse.currentAudio";
      param[audioset] = currentAudio.attachment;
      let isplay = self.currentAudio.toolUse.is_play;
      let playstr = "datalist[" + listIndex + "].audioA[0].toolUse.is_play";
      param[playstr] = !isplay;
      self.setData(param);

      if (isplay) {
        self.innerAudioContext.pause();
        isplay = false;
      } else if (!isplay && !self.currentAudio.toolUse.is_ended) {
        self.playVoice();
      } else {
        self.innerAudioContext.play();
      }
    },

    playVoice() {
      this.innerAudioContext.src = self.currentAudio.attachment;
      this.innerAudioContext.play();
    },

    stopVoice() {
      var param = {};
      let toolUsestr = "datalist[" + self.currentAudio.toolUse.listIndex + "].audioA[0].toolUse";
      let toolUse = self.currentAudio.toolUse;
      toolUse['is_play'] = false;
      toolUse['slider_value'] = 0;
      toolUse['current_process'] = util.formatTime(0);
      param[toolUsestr] = toolUse;
      self.setData(param);
      self.innerAudioContext.stop();
      self.currentAudio = self.datalist[self.currentAudio.toolUse.listIndex].audioA[0];
    },

    /* *********************** 语音end *********** */
    lookImage(e) {
      let cellItem = self.datalist[e.currentTarget.dataset.cellindex];
      let imageA = cellItem.imageA;
      var imageSrcArray = [];

      for (let i = 0; i < imageA.length; i++) {
        let item = imageA[i];
        imageSrcArray.push(item.attachment);
      }

      wx.previewImage({
        current: imageSrcArray[e.currentTarget.id],
        urls: imageSrcArray
      });
    },

    topCellClick(e) {
      var item = this.toplist[e.currentTarget.id];
      this.toDetail(item);
    },

    cellClick(e) {
      var item = this.datalist[e.currentTarget.id];
      this.toDetail(item);
    },

    toDetail(item) {
      var special = item.special;
      var tid = item.tid;
      var url = '../thread_detail/thread_detail?tid=';

      if (special == 1) {
        url = '../questionnaire_detail/questionnaire_detail?tid=';
      } else if (special == 3) {
        url = '../question_answer_detail/question_answer_detail?tid=';
      } else if (special == 4) {
        url = '../activity_detail/activity_detail?tid=';
      }

      url += tid;
      wx.navigateTo({
        url: url
      });
    },

    postEnter() {
      if (!loginmanager.isLogin()) {
        return;
      }

      if (this.postTypeArr.length > 1) {
        return;
      }

      var special = this.postTypeArr[0];
      this.postSelect(special);
    },

    postThreadType(e) {
      this.postSelect(e.detail);
    },

    postSelect(special) {
      if (special == 0) {
        wx.navigateTo({
          url: '../post_thread/post_thread?fid=' + this.fid
        });
      } else if (special == 1) {
        wx.navigateTo({
          url: '../post_question/post_question?fid=' + this.fid
        });
      } else if (special == 4) {
        wx.navigateTo({
          url: '../activity_post/activity_post?fid=' + this.fid
        });
      }
    }

  }
};
</script>
<style>
@import "./forumdisplay.css";
</style>