<template>
<view>
<!-- <wxs module='filter' src='../../utils/ceshi.wxs' /> -->
<!--pages/detail/detail.wxml-->
<!--<import src="../common_temp/audio_player.wxml"></import>-->
<view class="detail" v-if="datalist.length > 0">
	<view class="content">
		<view class="userInfo">
			<image class="autherAvatar" :src="userAvatar + '' + datalist[0].authorid"></image>

			<view class="auther_info">
				<view class="auther fontWeight">
					<view class="username">
						{{datalist[0].nickname?datalist[0].nickname:datalist[0].author}}
					</view>

				</view>
				<rich-text class="time" :nodes="datalist[0].dateline"></rich-text>
			</view>
			<view class="classType" v-if="thread.typename">
				<image class="classimage" src="https://mc.wpnicer.com/source/plugin/mobile/template/image/xiaochengxu/minimg/class_type.png"></image>
				<view class="c_type">{{thread.typename}}</view>
			</view>
		</view>

		<view class="worker">
			<!-- wx:if="{{is_quan &&  level == 1}}" -->
			<view class="easyTitle" v-if="!is_quan">{{thread.subject}}</view>
			<rich-text :class="'message ' + (!is_quan?'easyMessage':'')" :nodes="datalist[0].message"></rich-text>
			<view class="adminButton" v-if="is_quan &&  level == 2" @tap="deleteThread">【删除】</view>
			<view class="adminButton" v-if="is_quan &&  level == 1" @tap="deleteThread">【删除】</view>
			<view class="adminButton" v-if="is_quan &&  level != 1 &level !=2 &thread.allreplies == 0 &uid ==thread.authorid" @tap="deleteSelfPost" data-thread="main" :data-pid="datalist[0].pid">【删除】</view>
			<view class="attachlist" v-if="datalist[0].attachments">
				<block v-for="(image, index) in datalist[0].imageA" :key="index">
					<image class="attachImage" :src="image.newUrl" mode="widthFix" :id="aidx" data-cellindex="0" @tap.stop="lookImage"></image>
				</block>
				<block v-for="(video, index) in datalist[0].videoA" :key="index">
					<view class="viodeoView">
						<video id="myVideo" class="uploader__video uploader__input" controls="false" show-fullscreen-btn="false" @play="playVideo" @fullscreenchange="fullScreenChange" :src="video.newUrl">
						</video>
					</view>
				</block>
				<block v-for="(audio, index) in datalist[0].audioA" :key="index">
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
				<view style="overflow:hidden">
					<view v-for="(download, index) in datalist[0].DownloadA" :key="index" class="ppt" @tap="previewDoc" :data-url="download.newUrl" :data-ext="download.ext" :data-filename="download.filename">
						<view class="ppt_t">{{download.filename}}</view>
						<view>{{download.attachsize}}</view>
					</view>
				</view>
			</view>
		</view>
		<view class="sharecollect">
			<view class="share">
				<button open-type="share" plain="true" @tap="share">
					<image class="shareIcon" src="https://mc.wpnicer.com/source/plugin/mobile/template/image/xiaochengxu/minimg/share_work.png" mode="widthFix"></image>
				</button>
				<view>分享</view>
			</view>
			<view class="share">
				<image class="collectIcon" src="https://mc.wpnicer.com/source/plugin/mobile/template/image/xiaochengxu/minimg/collect_work.png" mode="widthFix" @tap.stop="collectThread"></image>
				<view>{{collecttext}}</view>
			</view>
		</view>

	</view>

	<view class="workInfoView" v-if="is_quan">
		<view class="submitView">
			<view>已完成(<text>{{workinfo.submitted.count}}</text>)人：</view>
			<block v-for="(user, index) in workinfo.submitted.list" :key="index">
				<text>{{user.showName}}</text>
				<block v-if="index < workinfo.submitted.list.length - 1">，</block>
			</block>
		</view>
		<view class="unsubmitView">
			<view>未完成(<text>{{workinfo.unsubmitlist.count}}</text>)人：</view>
			<block v-for="(user, index) in workinfo.unsubmitlist.list" :key="index">
				<text>{{user.showName}}</text>
				<block v-if="index < workinfo.unsubmitlist.list.length - 1">，</block>
			</block>
		</view>
	</view>

	<view class="replyInfo" v-if="!is_quan">
		<view>
			<block v-if="thread.replies">
				回复：<text>{{thread.replies}}</text>
			</block>
			<block v-else>
				暂无回复
			</block>
		</view>
		<view class="sortTip" @tap="showSort">{{listSortType}}</view>

		<view class="shortListContain" v-if="sortListShow">
			<image src="https://mc.wpnicer.com/source/plugin/mobile/template/image/xiaochengxu/minimg/sortList.png" mode="top" class="shortList">
			</image>
			<view class="sortType sortTypeF" @tap.stop="sortClick" id="2">
				<view>默认顺序</view>
				<image class="sortCheck" src="https://mc.wpnicer.com/source/plugin/mobile/template/image/xiaochengxu/minimg/check.png" :hidden="!sortdefault"></image>
			</view>
			<view class="sortType" id="1" @tap.stop="sortClick">
				<view>按时间</view>
				<image class="sortCheck" src="https://mc.wpnicer.com/source/plugin/mobile/template/image/xiaochengxu/minimg/check.png" :hidden="sortdefault"></image>
			</view>
		</view>

	</view>

	<view class="reply">
		<block v-for="(item, index) in datalist" :key="index" v-if="!showLock[item.pid]">

			<view class="replyCell" :id="item.pid" v-if="index != 0" @tap="cellClick">
				<view class="replyerInfo">
					<image class="avatar" :src="userAvatar + '' + datalist[index].authorid"></image>
					<view class="auther_info">
						<view class="username fontWeight">
							{{item.nickname?item.nickname:item.username}}
						</view>
						<rich-text class="retime" :nodes="item.dateline"></rich-text>
					</view>
				</view>
				<!-- wx:if="{{is_quan &&  level == 2}}" -->
				<view class="messageView">
					<rich-text class="message" :nodes="item.message"></rich-text>
					<view class="adminButton" v-if="is_quan &&  level == 2" :data-pid="item.pid" @tap="deletePost">【删除】</view>
					<view class="adminButton" v-if="is_quan &&  level == 1" :data-pid="item.pid" @tap="deletePost">【删除】</view>
					<view class="adminButton" v-if="is_quan &&  level != 1 &level !=2 & uid == item.authorid" @tap="deleteSelfPost" :data-pid="item.pid">【删除】</view>
					<view class="attachlist" v-if="item.attachments">

						<view :class="'attachementView ' + (item.imageA.length ==0 && item.videoA.length == 1?'singleVideo':'')" v-if="item.attachments">
							<block v-for="(attItem, imgIndex) in item.imageA" :key="imgIndex">
								<image :class="'attachement ' + (item.imageA.length ==1&& item.videoA.length == 0?'signle-image':'' )" :mode="item.imageA.length + item.videoA.length == 1?'widthFix':'aspectFill'" :src="attItem.newUrl" :id="imgIndex" :data-cellindex="index" @tap.stop="lookImage"></image>
							</block>

							<block v-for="(video, aidx) in item.videoA" :key="aidx">
								<image @tap.stop="clickVideo" :id="video.newUrl" class="attachement" src="https://mc.wpnicer.com/source/plugin/mobile/template/image/xiaochengxu/minimg/videoPlace.png"></image>
							</block>
						</view>
						<block v-for="(audio, index2) in item.audioA" :key="index2">
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

					</view>
				</view>

				<view class="flowerAndDiscuss">
					<!-- <image src="{{item.issupport==1?'https://mc.wpnicer.com/source/plugin/mobile/template/image/xiaochengxu/minimg/answer_agreed.png':'https://mc.wpnicer.com/source/plugin/mobile/template/image/xiaochengxu/minimg/answer_agree.png'}}" class='workButton' catchtap='sendFlower' id="{{index}}"></image> -->
					<view class="support" @tap.stop="sendFlower" :id="index">
						<image src="/static/image/support.png"></image>
						<view class="support-count">{{item.postreview.support?item.postreview.support:0}}</view>
					</view>
					<image src="https://mc.wpnicer.com/source/plugin/mobile/template/image/xiaochengxu/minimg/work_discuss.png" class="workButton" @tap.stop="replyWork" :id="item.pid"></image>
				</view>

				<view class="workReply" v-if="item.comments">
					<block v-for="(wreply, index2) in item.comments" :key="index2">
						<view class="workReplyText"><text class="workReplyAuthor">{{wreply.nickname?wreply.nickname:wreply.author}}：</text>{{wreply.comment}}</view>
					</block>
					<view @tap="commentMore" class="commentMore" :data-index="index" :data-pid="item.pid" v-if="commentMoreLock[item.pid] !== false && datalist[index].comments.length >= 5">查看更多></view>
				</view>

			</view>

		</block>
	</view>
	<view class="noMoreView" :hidden="hasMore">
		别再用力了，你已经滑到底啦
	</view>
</view>

 

<view class="toolbar" @tap.stop="toReply">
	<image class="toolimage" src="https://mc.wpnicer.com/source/plugin/mobile/template/image/xiaochengxu/minimg/reply_tool.png"></image>
	<view class="replyText" @tap.stop="replyText"></view>
	<view class="replyAudio" @tap.stop="replyAudio"></view>
	<view class="replyImage" @tap.stop="replyImage"></view>
	<view class="replyVideo" @tap.stop="replyVideo"></view>
	<view class="toolback"></view>
</view>
</view>
</template>

<script>
const detailUrl = require("../../config").detailUrl;
const baseUrl = require("../../config").baseUrl;
const collectUrl = require("../../config").collectUrl;
const unCollectUrl = require("../../config").unCollectUrl;
const sendFlowerUrl = require("../../config").sendFlowerUrl;
const workCountUrl = require("../../config").workCountUrl;
const joinClassUrl = require("../../config").joinClassUrl;
const deleteModUrl = require("../../config").deleteModUrl;
const deletePostUrl = require("../../config").deletePostUrl;
const deleteSelfPostUrl = require("../../config").deleteSelfPostUrl;
const commentMoreUrl = require("../../config").commentMoreUrl;
const userAvatar = require("../../config").userAvatar;
const checkUrl = require("../../config").checkUrl;
const loginmanager = require("../../utils/loginManager");
const util = require("../../utils/util.js");
var event = require("../../utils/event.js");
const app = getApp();
var self;

export default {
  data() {
    return {
      userAvatar,
      baseUrl: baseUrl,
      nickname: '',
      datalist: [],
      thread: {},
      tid: "",
      fid: "",
      is_quan: true,
      loading: false,
      pagenum: 1,
      ppp: 10,
      favorited: 0,
      collecttext: "收藏",
      sortdefault: false,
      listSortType: '按时间',
      sortListShow: false,
      workinfo: null,
      isShare: false,
      isJoin: false,
      showLock: {},
      commentMoreLock: {},
      repliesrank: "",
      allowpostcomment: "",
      uid: "",
      level: "",
      hasMore: false,
      myFid: "",
      previewLock: false,
      currentVideo: "",
      is_moving_slider: false,
      currentAudio: "",
      shareHidden: false
    };
  },

  components: {},
  props: {},

  onReady() {
    this.videoContext = wx.createVideoContext('detailVideo');
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    self = this;
    var tid = options.tid;
    var is_quan = options.is_quan ? options.is_quan : false;
    var uid = app.globalData.uid;
    var repliesrank = app.globalData.repliesrank;
    var allowpostcomment = app.globalData.allowpostcomment;
    self.setData({
      tid: tid,
      pagenum: 1,
      is_quan: is_quan,
      repliesrank: repliesrank,
      allowpostcomment: allowpostcomment,
      uid: uid
    });

    if (options.type == 'share') {
      self.isShare = true;
    }

    wx.showLoading();
    self.refreshRequest();
    self.setupAudioPlayer();
  },

  /**
   * 分享
   */
  onShareAppMessage: function (res) {
    self.setData({
      shareHidden: true
    });
    var path = "/pages/discovery/discovery?shareid=" + self.tid + '&special=' + self.thread.special;
    var placehold = "邀请你参与论坛话题交流，快快加入讨论吧";

    if (self.is_quan) {
      path = "/pages/index/index?sharetype=work&shareid=" + self.tid;
      placehold = "邀请你参与圈子话题交流，快快加入讨论吧";
    }

    var title = self.thread.subject ? self.thread.subject : self.nickname + placehold;
    var reg = /<[^<>]+>/g;
    title = title.replace(reg, '');
    var imagePath = "https://mc.wpnicer.com/source/plugin/mobile/template/image/xiaochengxu/minimg/kehoushare.png";

    if (self.datalist[0].imageA.length > 0) {
      imagePath = self.datalist[0].imageA[0].newUrl;
    }

    return {
      title: title,
      path: path,
      imageUrl: imagePath
    };
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      commentMoreLock: {}
    });
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    if (self.isShare) {
      event.emit('indexChanged', {
        fid: self.fid,
        name: "detail",
        join: self.isJoin
      });
    }

    self.innerAudioContext.destroy();
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    self.refreshRequest();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (self.hasMore) {
      self.requestMore(true);
    }
  },
  methods: {
    commentMore(e) {
      var pid = e.currentTarget.dataset.pid;
      var page = this.commentMoreLock[pid];
      var index = e.currentTarget.dataset.index;

      if (typeof page == "undefined") {
        page = 2;
      }

      var data = {
        pid: pid,
        tid: this.tid,
        page: page
      };
      app.globalData.apimanager.getRequest(commentMoreUrl, data).then(res => {
        var comments = res.Variables.comments[pid];
        var usernicknames = res.Variables.usernicknames;

        if (comments.length > 0) {
          page++;
          self.commentMoreLock[pid] = page;

          for (let key in comments) {
            let item = comments[key];

            if (usernicknames) {
              item.nickname = usernicknames[item.authorid];
            }
          }

          self.datalist[index].comments = self.datalist[index].comments.concat(comments);
          self.setData({
            commentMoreLock: self.commentMoreLock,
            datalist: self.datalist
          });
        } else {
          self.commentMoreLock[pid] = false;
          self.setData({
            commentMoreLock: self.commentMoreLock
          });
        }
      }).catch(res => {
        wx.showToast({
          title: '出错了！',
          icon: 'none'
        });
      });
    },

    deleteThread() {
      var data = {
        fid: this.fid,
        formhash: app.globalData.formhash
      };
      data['moderate[' + this.tid + ']'] = this.tid;
      wx.showModal({
        content: "删除后不可找回，确认删除？",

        success(res) {
          if (res.confirm) {
            app.globalData.apimanager.postRequest(deleteModUrl, data).then(res => {
              if (res.Message.messageval == "admin_succeed") {
                event.emit('indexChanged', {
                  name: 'workRefresh'
                });
                wx.navigateBack();
              } else {
                wx.showModal({
                  showCancel: false,
                  content: res.Message.messagestr
                });
              }
            }).catch(res => {
              console.log(res);
            });
          }
        }

      });
    },

    deleteSelfPost(e) {
      var type = e.currentTarget.dataset.thread ? true : false;
      var pid = e.currentTarget.dataset.pid;
      var data = {
        fid: this.fid,
        tid: this.tid,
        formhash: app.globalData.formhash,
        'delete': 1,
        pid: pid
      };
      wx.showModal({
        content: "删除后不可找回，确认删除？",

        success(res) {
          if (res.confirm) {
            app.globalData.apimanager.postRequest(deleteSelfPostUrl, data).then(res => {
              if (res.Message.messageval == "post_edit_delete_succeed") {
                if (type) {
                  event.emit('indexChanged', {
                    name: 'workRefresh'
                  });
                  wx.navigateBack();
                } else {
                  self.refreshRequest();
                }
              } else {
                wx.showModal({
                  showCancel: false,
                  content: res.Message.messagestr
                });
              }
            }).catch(res => {
              console.log(res);
            });
          }
        }

      });
    },

    deletePost(e) {
      var pid = e.currentTarget.dataset.pid;
      var data = {
        fid: this.fid,
        tid: this.tid,
        formhash: app.globalData.formhash
      };
      data['topiclist[' + pid + ']'] = pid;
      wx.showModal({
        content: "删除后不可找回，确认删除？",

        success(res) {
          if (res.confirm) {
            app.globalData.apimanager.postRequest(deletePostUrl, data).then(res => {
              if (res.Message.messageval == "admin_succeed") {
                var showLock = self.showLock;
                showLock[pid] = true;
                self.setData({
                  showLock: showLock
                });
              } else {
                wx.showModal({
                  showCancel: false,
                  content: res.Message.messagestr
                });
              }
            }).catch(res => {
              console.log(res);
            });
          }
        }

      });
    },

    workCountRequest() {
      let getDic = {
        tid: self.tid
      };
      app.globalData.apimanager.getRequest(workCountUrl, getDic).then(res => {
        var usernicknames = res.Variables.usernicknames;

        if (usernicknames) {
          if (res.Variables.workinfo) {
            for (let key in res.Variables.workinfo.submitted.list) {
              let item = res.Variables.workinfo.submitted.list[key];
              item.showName = usernicknames[item.uid] ? usernicknames[item.uid] : item.username;
            }

            for (let key in res.Variables.workinfo.unsubmitlist.list) {
              let item = res.Variables.workinfo.unsubmitlist.list[key];
              item.showName = usernicknames[item.uid] ? usernicknames[item.uid] : item.username;
            }
          }
        }

        self.setData({
          workinfo: res.Variables.workinfo,
          level: res.Variables.level
        });
      }).catch(res => {});
    },

    makeRequest() {
      self.setData({
        loading: true
      });
      let ordertype = 1;

      if (self.sortdefault) {
        self.setData({
          listSortType: '默认顺序'
        });
        ordertype = 2;
      }

      let getDic = {
        tid: self.tid,
        page: self.pagenum,
        ppp: self.ppp,
        ordertype: ordertype
      };
      app.globalData.apimanager.getRequest(detailUrl, getDic).then(res => {
        wx.hideLoading();
        wx.stopPullDownRefresh();
        let threads = res.Variables.thread;
        self.fid = threads.fid;
        let nickname = res.Variables.member_nickname ? res.Variables.member_nickname : res.Variables.member_username;
        self.setData({
          nickname: nickname
        });

        if (res.Message) {
          let messageval = res.Message.messageval;

          if (messageval == 'forum_group_noallowed') {
            console.log(77777);
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

        if (this.is_quan) {
          let userlevel = res.Variables.forum.userlevel;

          if (userlevel == -1 || !userlevel) {
            // 没有加入该群组
            // 
            wx.showModal({
              content: "对不起，目前你还不是圈子成员，请先申请加入圈子吧",
              showCancel: false,
              confirmText: "加入圈子",
              success: function (res) {
                if (res.confirm) {
                  self.joinClassRequest(self.fid);
                }
              }
            });
            return;
          } else if (userlevel == 0) {
            // 审核状态
            wx.showModal({
              content: "已提交加入圈子申请，请耐心等待审核",
              showCancel: false,
              confirmText: '知道了',
              success: function (res) {
                if (res.confirm) {
                  wx.navigateBack();
                }
              }
            });
            return;
          } else if (userlevel > 0) {// 已加入
          }
        }

        self.setData({
          favorited: threads.favorited
        });
        self.resetCollectState();
        var usernicknames = res.Variables.usernicknames;
        console.log('success', res);
        let arr1 = self.datalist;
        let listArray = res.Variables.postlist;

        for (let i = 0; i < listArray.length; i++) {
          let postItem = listArray[i];

          if (usernicknames) {
            if (usernicknames[postItem.authorid]) {
              postItem.nickname = usernicknames[postItem.authorid];
            }
          }

          postItem.message = postItem.message.replace(/\<img/gi, '<img class="rich-img"');
          postItem.message = postItem.message.replace(/<font (.*?)>/gi, "");
          postItem.message = postItem.message.replace(/<\/font>/gi, ""); // 作业评论处理

          let comments = res.Variables.comments;

          if (comments && comments.length != 0) {
            if (comments[postItem.pid]) {
              let comment = comments[postItem.pid];

              for (let key in comment) {
                let item = comment[key];

                if (usernicknames) {
                  item.nickname = usernicknames[item.authorid];
                }
              }

              postItem.comments = comment;
            }
          }

          var listindex = i + self.datalist.length; // 附件处理

          let attachments = postItem.attachments;
          let imageA = [];
          let audioA = [];
          let videoA = [];
          let DownloadA = [];

          for (let aidKey in attachments) {
            let attItem = attachments[aidKey];
            let newUrl = baseUrl + '/' + attItem.url + attItem.attachment;
            attItem['newUrl'] = newUrl;

            if (attItem.isimage != 0) {
              imageA.push(attItem);
            } else if (attItem.ext == 'mp3') {
              let total_process = '00:00';
              console.log(attItem.description);

              if (attItem.description) {
                total_process = util.formatTime(parseInt(attItem.description));
              }

              attItem['toolUse'] = {
                attachment: newUrl,
                listIndex: listindex,
                total_process: total_process
              };
              audioA.push(attItem);
            } else if (attItem.ext == 'mp4' || attItem.ext == 'avi') {
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

        if (self.pagenum > 1) {
          arr1 = arr1.concat(listArray);
        } else {
          arr1 = listArray;
        }

        if (arr1.length - 1 >= threads.replies) {
          self.setData({
            hasMore: false
          });
        } else {
          self.setData({
            hasMore: true
          });
        }

        console.log(arr1);
        self.setData({
          loading: false,
          datalist: arr1,
          thread: threads
        });
      }).catch(res => {
        wx.stopPullDownRefresh();
        wx.hideLoading();
        self.setData({
          loading: false
        });
        wx.showToast({
          title: '出错了！',
          icon: 'none'
        });
      });
    },

    showSort() {
      self.setData({
        sortListShow: !self.sortListShow
      });
    },

    sortClick(e) {
      let id = e.currentTarget.id;
      let sortdefault = true;
      let listSortType = '默认顺序';

      if (id == 1) {
        sortdefault = false;
        listSortType = '按时间';
      }

      self.pagenum = 1;
      self.setData({
        sortdefault: sortdefault,
        listSortType: listSortType,
        sortListShow: false
      });
      self.makeRequest();
    },

    joinClassRequest(fid) {
      var data = {
        fid: fid
      };
      app.globalData.apimanager.getRequest(joinClassUrl, data).then(res => {
        if (res.Message.messageval == "group_join_succeed") {
          wx.showToast({
            title: res.Message.messagestr,
            icon: 'none'
          });
          self.isJoin = true;
          self.makeRequest();
          var pages = getCurrentPages(); //获取当前页面 

          var prevPage = pages[pages.length - 2]; //获取上个页面 

          let myFidArr = prevPage.data.myFid;

          if (myFidArr && myFidArr.length > 0) {
            if (myFidArr.indexOf(fid) <= -1) {
              myFidArr.push(fid);
              prevPage.setData({
                myFid: myFidArr
              });
            }
          }
        } else {
          if (res.Message.messageval == "group_has_joined") {
            self.makeRequest();
          } else {
            wx.showModal({
              content: res.Message.messagestr,
              showCancel: false,
              confirmText: '知道了',
              success: function (res) {
                if (res.confirm) {
                  wx.navigateBack();
                }
              }
            });
          }
        }
      }).catch(res => {});
    },

    resetCollectState() {
      let collecttext = self.collecttext;

      if (self.favorited == 1) {
        collecttext = "已收藏";
      } else {
        collecttext = "收藏";
      }

      self.setData({
        collecttext: collecttext
      });
    },

    previewDoc(e) {
      var url = e.currentTarget.dataset.url;
      var name = e.currentTarget.dataset.filename;
      var ext = e.currentTarget.dataset.ext;

      if (this.previewLock) {
        return false;
      }

      this.setData({
        previewLock: true
      });
      wx.showLoading({
        title: '下载中'
      });
      wx.downloadFile({
        url: url,

        success(res) {
          if (res.statusCode === 200) {
            self.setData({
              previewLock: false
            });
            console.log(res.tempFilePath);
            wx.hideLoading();
            wx.openDocument({
              fileType: ext,
              filePath: res.tempFilePath,

              fail(e) {
                console.log(e);
              }

            });
          }
        },

        fail(e) {
          console.log(e);
        }

      });
    },

    collectThread() {
      if (self.favorited == 1) {
        // 已收藏 取消收藏
        this.unCollect();
      } else {
        // 未收藏 去收藏
        this.collect();
      }
    },

    collect() {
      let formhash = app.globalData.formhash;
      let data = {
        formhash: formhash,
        id: self.tid
      };
      app.globalData.apimanager.getRequest(collectUrl, data).then(res => {
        if (res.Message.messageval === "favorite_do_success") {
          self.setData({
            favorited: 1
          });
          self.resetCollectState();
        } else {
          if (res.Message.messageval === "favorite_repeat") {
            self.resetCollectState();
          }

          wx.showToast({
            title: res.Message.messagestr,
            icon: 'none'
          });
        }
      }).catch(res => {
        wx.showToast({
          title: '出错了！',
          icon: 'none'
        });
      });
    },

    unCollect() {
      let url = unCollectUrl + "&id=" + self.tid + "&type=thread";
      let formhash = app.globalData.formhash;
      let postData = {
        formhash: formhash,
        deletesubmit: true
      };
      app.globalData.apimanager.postRequest(url, postData).then(res => {
        if (res.Message.messageval == "do_success") {
          self.setData({
            favorited: 0
          });
          self.resetCollectState();
        } else {
          wx.showToast({
            title: res.Message.messagestr,
            icon: 'none'
          });
        }
      }).catch(res => {
        wx.showToast({
          title: '出错了！',
          icon: 'none'
        });
      });
    },

    toReply() {
      if (!loginmanager.isLogin()) {
        return;
      }

      wx.navigateTo({
        url: '../post_thread/post_thread?isreply=true'
      });
    },

    replyText() {
      if (!loginmanager.isLogin()) {
        return;
      }

      wx.navigateTo({
        url: '../post_thread/post_thread?isreply=true&type=text'
      });
    },

    replyAudio() {
      if (!loginmanager.isLogin()) {
        return;
      }

      wx.navigateTo({
        url: '../post_thread/post_thread?isreply=true&type=audio'
      });
    },

    replyImage() {
      if (!loginmanager.isLogin()) {
        return;
      }

      wx.navigateTo({
        url: '../post_thread/post_thread?isreply=true&type=image'
      });
    },

    replyVideo() {
      if (!loginmanager.isLogin()) {
        return;
      }

      wx.navigateTo({
        url: '../post_thread/post_thread?isreply=true&type=video'
      });
    },

    replyWork(e) {
      if (!loginmanager.isLogin()) {
        return;
      } // if (this.data.allowpostcomment.length == 0){


      var url = checkUrl;
      wx.request({
        url: url,
        method: 'POST',
        success: function (res) {
          if (res.data.setting.allowpostcomment.length == 0) {
            wx.showToast({
              title: '该功能暂未开启',
              icon: 'none'
            });
            return;
          } else {
            wx.navigateTo({
              url: '../post_thread/post_thread?isevaluate=true&pid=' + e.currentTarget.id
            });
          }
        }
      }); // }
      // wx.navigateTo({
      //   url: '../post_thread/post_thread?isevaluate=true&pid=' + e.currentTarget.id,
      // })
    },

    sendFlower(e) {
      let index = parseInt(e.currentTarget.id);
      let replyItem = self.datalist[index];
      let formhash = app.globalData.formhash;
      let data = {
        tid: self.tid,
        pid: replyItem.pid,
        hash: formhash
      };
      app.globalData.apimanager.getRequest(sendFlowerUrl, data).then(res => {
        if (res.Message.messageval == "thread_poll_succeed") {
          replyItem.issupport = 1;

          if (replyItem.postreview && replyItem.postreview.support) {
            replyItem.postreview.support = parseInt(replyItem.postreview.support) + 1;
          } else {
            var postreview = {
              support: 1
            };
            replyItem['postreview'] = postreview;
          }

          let param = {};
          let str = 'datalist[' + index + ']';
          param[str] = replyItem;
          self.setData(param); // console.log(self.data.datalist);
        } else {
          if (this.repliesrank == '0' && res.Message.messageval == "to_login") {
            wx.showToast({
              title: '该功能暂未开启',
              icon: 'none'
            });
          } else {
            wx.showToast({
              title: res.Message.messagestr,
              icon: 'none'
            });
          }
        }
      }).catch(res => {
        wx.showToast({
          title: '出错了',
          icon: 'none'
        });
      });
    },

    // 播放视频 -------------------
    clickVideo(e) {
      self.setData({
        currentVideo: e.currentTarget.id
      });
      self.videoContext.requestFullScreen({
        direction: 0
      });
    },

    fullScreenChange(e) {
      if (!e.detail.fullScreen) {
        self.videoContext.stop();
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
        console.log("ontimeupdate");

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
      var param = {};
      let audioset = "datalist[" + listIndex + "].audioA[0].toolUse.currentAudio";
      param[audioset] = currentAudio.newUrl;
      self.setData(param);
      self.setData({
        currentAudio: currentAudio
      });
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
      var src = self.currentAudio.newUrl;
      this.innerAudioContext.src = src;
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
        imageSrcArray.push(item.newUrl);
      }

      console.log(imageSrcArray);
      wx.previewImage({
        current: imageSrcArray[e.currentTarget.id],
        urls: imageSrcArray
      });
    },

    requestMore(isMore) {
      let pagenum = self.pagenum;

      if (isMore) {
        pagenum += 1;
      } else {
        pagenum = 1;
      }

      self.setData({
        pagenum: pagenum // 更新当前页数

      });
      self.makeRequest(); // 重新调用请求获取下一页数据 或者刷新数据
    },

    refreshRequest() {
      self.requestMore(false);

      if (this.is_quan) {
        this.workCountRequest();
      }
    }

  }
};
</script>
<style>
@import "./thread_detail.css";
</style>