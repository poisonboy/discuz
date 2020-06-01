<template>
<view>
<!--pages/discovery/discovery.wxml-->
<!--<import src="../common_temp/audio_player.wxml"></import>-->
 
<view class="containView">
	<scroll-view scroll-x class="bg-yellow  cu-bar">
		<view class="cu-avatar round" :style="'background-image:url(' + userAvatar + '+5);'"></view>
		<view class="bg-yellow nav text-center ">
			<view :class="'cu-item ' + (0==currentTab?'text-white cur':'')" @tap="switchNav" data-current="0">
				<text class="cuIcon-camerafill"></text> 最新
			</view>
			<view :class="'cu-item ' + (1==currentTab?'text-white cur':'')" @tap="switchNav" data-current="1">
				<text class="cuIcon-upstagefill"></text> 精选
			</view>
		</view>

	</scroll-view>


	<view class="messageList borderShowdow">


		<block v-for="(cellItem, cellIdx) in datalist" :key="cellIdx">
			<view class="classCell" :id="cellIdx" @tap="cellClick">
				<view>
					<image class="class-cell-avatar" :src="cellItem.author?cellItem.avatar:(userAvatar+'0')"></image>
				</view>

				<view class="class-cell-contentView">
					<view class="username">
						{{member_nickname?member_nickname:(cellItem.author?cellItem.author:'匿名')}}
					</view>
					<view class="message"><text class="special" v-if="cellItem.special != 0 && cellItem.special != 2 && cellItem.special != 5">
      <block v-if="cellItem.special==1">投票</block>
      <block v-if="cellItem.special==2">商品</block>
      <block v-if="cellItem.special==3">悬赏</block>
      <block v-if="cellItem.special==4">活动</block>
      <block v-if="cellItem.special==5">辩论</block>
      </text>{{cellItem.subject}}</view>
					
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
		<view class="emptyView" :hidden="!(datalist.length == 0)">
			<view style="width:100%;height:10rpx"></view>
			<image src="https://mc.wpnicer.com/source/plugin/mobile/template/image/xiaochengxu/minimg/emptyIcon.png"></image>
			<view class="emptyMsg">
				<block v-if="currentTab==0">
					还没有内容被推荐
				</block>
				<block v-else>
					最近没有新内容推荐
				</block>
				<!-- 赶紧去<text catchtap='postEnter'>发布</text>吧 -->
			</view>
		</view>
	</view>
	<view class="noMoreView" :hidden="!noMore">
		别再用力了，你已经滑到底啦
	</view>

		<!--<video id='detailVideo' class='{{fullScreen?"show":"hide"}}' autoplay='{{true}}' bindplay="playVideo" bindfullscreenchange="fullScreenChange" src="{{currentVideo}}">
	</video>-->
</view>
</view>
</template>

<script module="attCount" lang="wxs" src="./attCount.wxs"></script>

<script>
// pages/discovery/discovery.js
const newestUrl = require("../../config").newestUrl;
const digestUrl = require("../../config").digestUrl;
const userAvatar = require("../../config").userAvatar;
const checkUrl = require("../../config").checkUrl;
const util = require("../../utils/util.js");
var event = require("../../utils/event.js");
const app = getApp();
var self;

export default {
  data() {
    return {
      userAvatar: userAvatar,
      userInfoHidden: true,
      fullScreen: false,
      datalist: [],
      navData: [{
        name: '最新'
      }, {
        name: '精华'
      }],
      appdev: '',
      currentTab: 0,
      page: 1,
      currentVideo: "",
      uid: "",
      is_moving_slider: false,
      currentAudio: ""
    };
  },

  components: {},
  props: {},
  onLoad: function (options) {
    self = this;

    if (options.shareid) {
      // 从分享进入帖子详情页
      var item = {
        tid: options.shareid,
        special: options.special ? options.special : 0
      };
      this.toDetail(item);
    }

    wx.showLoading();
    this.requestData();
    self.setupAudioPlayer();
    self.allowpostcomment();
  },

  onReady() {
    this.videoContext = wx.createVideoContext('detailVideo');
  },

  onShow: function () {
    var uid = app.globalData.uid;
    var appdev = app.globalData.appdev;
    this.setData({
      uid: uid,
      appdev: appdev
    });
  },
  onUnload: function () {
    self.innerAudioContext.destroy();
  },
  onPullDownRefresh: function () {
    this.page = 1;
    this.requestData();
  },
  onReachBottom: function () {
    this.page++;
    this.requestData();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    var title = "站长之家论坛";
    var imagePath = "https://mc.wpnicer.com/source/plugin/mobile/template/image/xiaochengxu/minimg/kehoushare.png";
    var path = '/pages/discovery/discovery';
    return {
      title: title,
      path: path,
      imageUrl: imagePath
    };
  },
  methods: {
    allowpostcomment: function () {
      var url = checkUrl;
      app.globalData.apimanager.getRequest(url).then(res => {
        var repliesrank = res.setting.repliesrank;
        var allowpostcomment = res.setting.allowpostcomment;
        app.globalData.repliesrank = repliesrank;
        app.globalData.allowpostcomment = allowpostcomment;
      }).catch(res => {});
    },

    switchNav(event) {
      var cur = event.currentTarget.dataset.current;

      if (this.currentTab != cur) {
        this.setData({
          currentTab: cur
        });
      }

      this.page = 1;
      this.requestData();
    },

    requestData() {
      var url = newestUrl;

      if (this.currentTab == 1) {
        url = digestUrl;
      }

      var data = {
        page: self.page
      };
      app.globalData.apimanager.getRequest(url, data).then(res => {
        wx.hideLoading();
        wx.stopPullDownRefresh();
        var datalist = res.Variables.data ? res.Variables.data : [];

        for (let i = 0; i < datalist.length; i++) {
          let postItem = datalist[i];
          var listindex = i + this.datalist.length; // 附件处理

          let attachlist = postItem.attachlist;
          let imageA = [];
          let audioA = [];
          let videoA = [];
          let DownloadA = [];

          for (let aidKey in attachlist) {
            let attItem = attachlist[aidKey];
            let newUrl = attItem.attachment;
            attItem['newUrl'] = newUrl;

            if (attItem.type == 'image') {
              imageA.push(attItem);
            } else if (attItem.type == 'audio') {
              let total_process = '00:00';

              if (attItem.description) {
                total_process = util.formatTime(parseInt(attItem.description));
              }

              attItem['toolUse'] = {
                attachment: newUrl,
                listIndex: listindex,
                total_process: total_process
              }; // console.log(attItem);

              audioA.push(attItem);
            } else if (attItem.type == 'video') {
              videoA.push(attItem);
            } else if (attItem.ext == 'pdf' || attItem.ext == 'ppt' || attItem.ext == 'pptx' || attItem.ext == 'docx' || attItem.ext == 'doc' || attItem.ext == 'xls' || attItem.ext == 'xlsx') {
              DownloadA.push(attItem);
            }
          }

          postItem['imageA'] = imageA;
          postItem['audioA'] = audioA;
          postItem['videoA'] = videoA;
          postItem['DownloadA'] = DownloadA;
        }

        if (this.page > 1) {
          datalist = this.datalist.concat(datalist);
        }

        this.setData({
          datalist: datalist
        });
      }).catch(res => {
        wx.hideLoading();
        wx.stopPullDownRefresh();
      });
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
      param[audioset] = currentAudio.newUrl;
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
    }

  }
};
</script>
<style>
@import "./discovery.css";
</style>