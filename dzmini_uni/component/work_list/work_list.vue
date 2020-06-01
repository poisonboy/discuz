<template>
<view>
<!--<import src="/pages/common_temp/audio_player.wxml"></import>-->
<scroll-view scroll-y="true" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd" @scrolltolower="lower" enable-back-to-top="true" upper-threshold="-80">
  <view class="header" :hidden="scrollTop >= 0">
    <view class="headerShow">
      <view>{{refreshMsg}}</view>
    </view>
  </view>
  <view class="mainView">
    <image class="pointView" :style="'left:' + indexPosition + 'rpx'" src="https://mc.wpnicer.com/source/plugin/mobile/template/image/xiaochengxu/minimg/pointView.png" id="pointView"></image>
    <view class="classInfoBg borderShowdow">
      <view class="class-message">
        <rich-text :nodes="dataDic.Variables.forum.description?dataDic.Variables.forum.description:'暂无简介'"></rich-text>
      </view>

      <view class="class-show" v-if="!easyTalk">
        <view class="class-numberItem">
          <view class="class-number">{{dataDic.Variables.forum.posts?dataDic.Variables.forum.posts:"0"}}</view>
          <view class="class-numberItem-name">主题数</view>
        </view>
        <view class="class-numberItem" @tap="goToMoreUser" :id="dataDic.Variables.forum.fid">
          <!-- <view class='class-number'>{{dataDic.Variables.forum.membernum?dataDic.Variables.forum.membernum:"0"}}</view> -->
          <view class="class-number">{{usernum}}</view>
          <view class="class-numberItem-name">成员数</view>
        </view>
        <view class="enterClass">
          <view class="badage" :hidden="!((dataDic.Variables.forum.groupuserinfo.level == 1 || dataDic.Variables.forum.groupuserinfo.level == 2) && dataDic.Variables.forum.moduser > 0)"></view>
          <image src="/static/image/classManage.png" class="info-more" @tap="classInfoManage" :id="dataDic.Variables.forum.fid"></image>
        </view>
      </view>

      <view class="easyTalkDesc" v-if="easyTalk">
        <view class="class-numberItem">
          <view class="class-number">{{dataDic.Variables.forum.todayposts?dataDic.Variables.forum.todayposts:"0"}}</view>
          <view class="class-numberItem-name">今日</view>
        </view>
        <view class="class-numberItem">
          <view class="class-number">{{dataDic.Variables.forum.threads?dataDic.Variables.forum.threads:"0"}}</view>
          <view class="class-numberItem-name">主题</view>
        </view>
        <view class="class-numberItem">
          <view class="class-number">{{stateInfo.totalmembers}}</view>
          <view class="class-numberItem-name">成员数</view>
        </view>
      </view>
    </view>




    <view class="messageList borderShowdow">
      <view class="easyTalkNav" v-if="easyTalk">
        <block v-for="(item, index) in easyNav" :key="index">
          <view :class="'easyTalkNavItem  ' + (esaySelected == index ?'easyTalkActive':'')" :id="index" @tap="easyTalkNavClick">{{item.name}}</view>
        </block>
      </view>

      <view class="easyTop" v-if="easyTalk">
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
              {{cellItem.nickname?cellItem.nickname:cellItem.author}}
            </view>
            <view class="easyTitle">{{types[cellItem.typeid]?'【'+types[cellItem.typeid]+'】':''}}{{cellItem.subject}}</view>
            <text class="message easyMessag">{{cellItem.message}}</text>

            
            <view :class="'attachementView ' + (attCount.onlyVideo(cellItem)?'singleVideo':'')" v-if="cellItem.attachlist.length > 0" @tap.stop="attCount.onlyVideo(cellItem)?'clickVideo':''" :id="attCount.onlyVideo(cellItem)?cellItem.videoA[0].attachment:''">

              <block v-for="(attItem, aidx) in cellItem.imageA" :key="aidx" v-if="aidx < (cellItem.videoA.length > 0 ? 8 : 9)">
                <image :class="'attachement ' + (attCount.onlyImg(cellItem)?'singleAtt':'')" :mode="attCount.onlyImg(cellItem)?'widthFix':'aspectFill'" :src="attItem.thumb + ' '" :id="aidx" :data-cellindex="cellIdx" @tap.stop="lookImage"></image>
              </block>
              <block v-for="(video, aidx) in cellItem.videoA" :key="aidx" v-if="aidx < 1">
                <image @tap.stop="clickVideo" :id="video.attachment" class="attachement" src="https://mc.wpnicer.com/source/plugin/mobile/template/image/xiaochengxu/minimg/videoPlace.png"></image>
              </block>

              <block v-if="cellItem.audioA">
                <block v-for="(audio, aidx) in cellItem.audioA" :key="aidx">
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

            <view class="cell-count">
              <view style="display: flex;">
                <rich-text class="class-cell-time" :nodes="cellItem.dateline"></rich-text>
                <view class="easyTalkThreadNumber" v-if="easyTalk">
                  <image class="lookimg" src="https://mc.wpnicer.com/source/plugin/mobile/template/image/xiaochengxu/minimg/looknum.png"></image>
                  <view>{{cellItem.views}}</view>
                  <image class="discimg" src="https://mc.wpnicer.com/source/plugin/mobile/template/image/xiaochengxu/minimg/discnum.png"></image>
                  <view>{{cellItem.replies}}</view>
                </view>
              </view>
              <view class="toolRight" @tap.stop="discClick" :data-tid="cellItem.tid" :id="cellIdx">
                <view class="shareHidden borderShowdow" v-if="cellItem.shareshow == 1 && cellIdx == clickIdx">
                  <button open-type="share" plain="true" @tap.stop="listShare" data-sharetype="work" :id="cellIdx">
                    <image class="shareIcon" src="https://mc.wpnicer.com/source/plugin/mobile/template/image/xiaochengxu/minimg/workshare.png"></image>
                  </button>
                  <view class="sv_sepView"></view>
                  <button plain="true" @tap.stop="disVoice" :id="cellIdx" :data-tid="cellItem.tid" :data-fid="dataDic.Variables.forum.fid">
                    <image class="shareIcon" src="https://mc.wpnicer.com/source/plugin/mobile/template/image/xiaochengxu/minimg/workvoice.png"></image>
                  </button>
                </view>
                <image src class="discIcon" @tap.stop="discClick" :data-tid="cellItem.tid" :id="cellIdx"></image>
              </view>
            </view>

          </view>
        </view>
      </block>


      <view class="emptyView" :hidden="!(datalist.length <= 0)">
        <view style="width:100%;height:10rpx"></view>
        <image src="https://mc.wpnicer.com/source/plugin/mobile/template/image/xiaochengxu/minimg/emptyIcon.png"></image>
        <view class="emptyMsg">
          <block v-if="!easyTalk">
            您可真幸运，圈子的第一篇内容属于您发布的，赶紧去
            <text @tap.stop="postEnter">发布</text>吧
          </block>
          <block v-else>
            还没有精华帖哦~
          </block>
        </view>
      </view>
    </view>

    <view class="noMoreView" :hidden="!noMore">
      别再用力了，你已经滑到底啦
    </view>
  </view>
</scroll-view>
</view>
</template>

<script module="attCount" lang="wxs" src="./attCount.wxs"></script>

<script>
// component/work_list/work_list.js
const workListUrl = require("../../config").workListUrl;
const userAvatar = require("../../config").userAvatar;
const util = require("../../utils/util.js");
const loginmanager = require("../../utils/loginManager");
const app = getApp();

export default {
  data() {
    return {
      userAvatar: userAvatar,
      scrollTop: 0,
      page: 1,
      esaySelected: 0,
      toplist: [],
      compOnShow: false,
      usernum: 0,
      easyNav: [{
        name: '全部'
      }, {
        name: '最新'
      }, {
        name: '热帖'
      }, {
        name: '精华'
      }],
      platform: "",
      dataDic: {},
      datalist: [],
      types: "",
      noMore: "",
      clickIdx: "",
      isLoading: false,
      refreshMsg: "",
      is_moving_slider: false,
      currentAudio: ""
    };
  },

  components: {},
  props: {
    fid: {
      type: String
    },
    indexPosition: {
      type: Number
    },
    currentTab: {
      type: Number
    },
    index: Number,
    easyTalk: {
      type: Boolean
    },
    stateInfo: {
      type: Object
    },
    usernum: {
      type: Number
    }
  },
  watch: {
    fid: '_fidChange',
    indexPosition: '_indexPositionChange',
    currentTab: '_currentTabChange',
    easyTalk: '_easyTalkTalkChange',
    stateInfo: {
      handler: '_stateInfoChange',
      deep: true
    },
    usernum: '_usernumChange'
  },

  mounted() {
    wx.getSystemInfo({
      success: res => {
        this.setData({
          platform: res.platform
        });
      }
    });
  },

  methods: {
    indexPositionChangeFun(newVal, oldVal) {
      this.setData({
        indexPosition: newVal
      });
    },

    currentTabChangeFun(newVal, oldVal) {
      if (this.index != newVal && this.compOnShow) {
        this.setData({
          compOnShow: false
        });
      } else {
        this.setData({
          compOnShow: true
        });
      }
    },

    easyTalkChangeFun(newVal, oldVal) {
      this.setData({
        easyTalk: easyTalk
      });
    },

    fidChangeFun(newVal, oldVal) {
      this.setData({
        fid: newVal
      });
    },

    stateInfoChangeFun(newVal, oldVal) {
      this.setData({
        stateInfo: newVal
      });
    },

    usernumChangeFun(newVal, oldVal) {
      this.setData({
        usernum: newVal
      });
    },

    switchTabTo() {
      if (this.datalist) {
        if (this.dataDic.Variables.forum.fid != this.fid) {
          this.setData({
            dataDic: {},
            datalist: []
          });
          this.page = 1;
          this.workListRequest();
        }
      } else {
        this.page = 1;

        if (!this.dataDic) {
          wx.showLoading();
        }

        this.workListRequest();
      }

      this.refreshHeaderHidden();
    },

    getDataSource() {
      return this;
    },

    workListRequest(order, isRefresh) {
      if (isRefresh) {
        this.page = 1;
      }

      var data = {
        fid: this.fid,
        page: this.page
      };

      if (order) {
        switch (order) {
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

      if (this.easyTalk) {
        data['mobile_api'] = 1;
      }

      app.globalData.apimanager.getRequest(workListUrl, data).then(res => {
        this.refreshHeaderHidden();
        wx.hideLoading();
        var usernicknames = res.Variables.usernicknames;
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

          if (usernicknames) {
            if (usernicknames[postItem.authorid]) {
              postItem.nickname = usernicknames[postItem.authorid];
            }
          }

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
              let realIndex = i;

              if (this.page > 1) {
                realIndex = i + this.datalist.length;

                if (this.easyTalk) {
                  realIndex += this.toplist.length;
                }
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

          if (this.easyTalk) {
            if (topCheckArr.indexOf(postItem.displayorder) != -1) {
              topArr.push(postItem);
            } else {
              commonArr.push(postItem);
            }
          }
        }

        if (this.easyTalk) {
          arr1 = commonArr;

          if (this.page == 1) {
            this.setData({
              toplist: topArr
            });
          }
        }

        if (this.page > 1 && arr1.length > 0) {
          arr1 = this.datalist.concat(arr1);
        }

        var noMore = false;

        if (arr1.length + this.toplist.length >= res.Variables.forum.threadcount) {
          noMore = true;
        }

        this.setData({
          datalist: arr1,
          noMore: noMore,
          dataDic: res
        });
      }).catch(res => {
        wx.hideLoading();
        this.refreshHeaderHidden();
      });
    },

    classInfoManage(e) {
      var fid = e.currentTarget.id;
      wx.navigateTo({
        url: '/pages/class_setting/class_setting?id=' + fid
      });
    },

    goToMoreUser(e) {
      wx.navigateTo({
        url: '/pages/more_user/more_user?id=' + e.currentTarget.id
      });
    },

    easyTalkNavClick(e) {
      let id = e.currentTarget.id;
      this.setData({
        esaySelected: id,
        page: 1
      });
      this.workListRequest(id);
    },

    topCellClick(e) {
      var tid = this.toplist[e.currentTarget.id].tid; // + '&is_quan=true'

      wx.navigateTo({
        url: '../thread_detail/thread_detail?tid=' + tid
      });
    },

    cellClick(e) {
      var tid = this.datalist[e.currentTarget.id].tid;
      wx.navigateTo({
        url: '../thread_detail/thread_detail?tid=' + tid
      });
    },

    discClick(e) {
      this.rightBarShow(e.currentTarget.id, true);
      this.audiotid = e.currentTarget.dataset.tid;
    },

    clickVideo(e) {
      this.$emit('clickVideo', {
        detail: e.currentTarget.id
      });
    },

    listShare(e) {
      this.rightBarShow(e.currentTarget.id, false);
    },

    disVoice(e) {
      console.log(e);

      if (!loginmanager.isLogin()) {
        loginmanager.toLogin();
        return;
      }

      console.log(e);
      var tid = this.datalist[e.currentTarget.id].tid;
      console.log(tid); // var fid = e._currentTabChange

      wx.navigateTo({
        url: '../post_thread/post_thread?isreply=true&type=audio&fid=' + this.fid + '&tid=' + tid + '&isreply=true&is_quan=true'
      });
      this.rightBarShow(e.currentTarget.id, false); // this.triggerEvent('disVoice', this.data.audiotid)
    },

    rightBarShow(index, isShow) {
      let shareshow = 1;

      if (this.clickIdx == index) {
        if (this.datalist[index].shareshow == 1 || !isShow) {
          shareshow = 0;
        }
      }

      let param = {};
      let str = "datalist[" + index + "].shareshow";
      param[str] = shareshow;
      this.setData({
        clickIdx: index
      });
      this.setData(param);
    },

    lookImage(e) {
      let cellItem = this.datalist[e.currentTarget.dataset.cellindex];
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

    postEnter() {
      this.$emit('postEnter');
    },

    // 下拉刷新
    refreshHeaderHidden() {
      this.setData({
        isLoading: false,
        scrollTop: 0
      });
    },

    touchStart(e) {
      this.isTouch = true;

      if (!this.isLoading) {
        this.setData({
          refreshMsg: "松开刷新"
        });
      }
    },

    touchMove(event) {
      let currentX = event.touches[0].pageX;
      let currentY = event.touches[0].pageY;
      let tx = currentX - this.lastX;
      let ty = currentY - this.lastY;
      let offsetTop = event.target.offsetTop;

      if (Math.abs(tx) > Math.abs(ty)) {
        //左右方向滑动
        if (tx < 0) {// console.log("向左滑动")
        } else if (tx > 0) {// console.log("向右滑动")
        }
      } else {
        if (ty > 0) {
          // 向下滑动
          if (ty > 10 && offsetTop < 300) {
            this.setData({
              scrollTop: -60 - 5
            });
          }
        }
      }

      this.lastX = currentX;
      this.lastY = currentY;
    },

    touchEnd(e) {
      this.isTouch = false;

      if (this.scrollTop < -60) {
        this.setData({
          isLoading: true,
          refreshMsg: "正在刷新",
          page: 1
        });

        if (this.easyTalk) {
          this.workListRequest(this.esaySelected);
        } else {
          this.workListRequest();
        }
      }
    },

    // 上拉加载
    lower(e) {
      if (!this.isLoading && !this.noMore) {
        this.page++;

        if (this.easyTalk) {
          this.workListRequest(this.esaySelected);
        } else {
          this.workListRequest();
        }
      }
    },

    /* *********************** 播放语音相关start *********** */
    // 拖动进度条，到指定位置
    hanle_slider_change(e) {
      this.$emit('seekCurrentAudio', {
        detail: e.detail.value
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

    is_moving_sliderFun() {
      return this.is_moving_slider;
    },

    // 点击播放暂停
    audio_play(e) {
      let listIndex = e.currentTarget.dataset.listindex;

      if (this.easyTalk) {
        listIndex -= this.toplist.length;
      }

      let postItem = this.datalist[listIndex];
      let currentAudio = postItem.audioA[0];
      this.setData({
        currentAudio: currentAudio
      });
      let isplay = this.currentAudio.toolUse.is_play;
      var param = {};
      let audioset = "datalist[" + listIndex + "].audioA[0].toolUse.currentAudio";
      let playstr = "datalist[" + listIndex + "].audioA[0].toolUse.is_play";
      param[playstr] = !isplay;
      param[audioset] = postItem.audioA[0].attachment;
      this.setData(param);
      this.$emit('audio_play', {
        detail: {
          'isplay': isplay,
          'is_ended': this.data.currentAudio.toolUse.is_ended,
          'src': this.data.currentAudio.attachment
        }
      });
    },

    voiceReset() {
      let toolUse = this.currentAudio.toolUse;
      toolUse['is_play'] = false;
      toolUse['slider_value'] = 0;
      toolUse['current_process'] = util.formatTime(0);
      this.voiceDataUpdate(toolUse);
    },

    voiceDataUpdate(toolUse) {
      var listIndex = this.currentAudio.toolUse.listIndex;

      if (this.easyTalk) {
        listIndex -= this.toplist.length;
      }

      let param = {};
      let toolUsestr = "datalist[" + listIndex + "].audioA[0].toolUse";
      param[toolUsestr] = toolUse;
      this.setData(param);
    },

    currentVoiceUse() {
      if (!this.currentAudio) {
        return;
      }

      let toolUse = this.currentAudio.toolUse;
      return toolUse;
    }
    /* *********************** 语音end *********** */


  }
};
</script>
<style>
@import "./work_list.css";
</style>