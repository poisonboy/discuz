<template>
<view>
<!--pages/question_type/question_type.wxml-->
<view class="containView">
  <!--列表start -->
  <view class="list-p">
    <view class="list-nav">
      <block v-for="(item, index) in ['全部','待回答','已回答']" :key="index">
        <view :class="'head-item ' + (index==currentTab?'active':'')" @tap="naviClick" :id="index">{{item}}</view>
      </block>
    </view>

    <view class="list-c">
      <block v-for="(wenItem, index) in datalist" :key="index">

        <view class="cell-p" @tap="cellClick" :id="index">
          <block v-if="wenItem.imageA.length==1">
            <view class="cell-single">
              <view class="cell-single-left">
              
                <block data-type="template" data-is="answer_cell" data-attr="wenItem">
  <view class="cell">
    <!-- cell标题 start-->
    <view :class="'cell-title ' + (wenItem.imageA.length == 1?'single-image':'')">
      <text class="wen">问</text> {{wenItem.subject}}
    </view>
    <!-- cell标题 end-->

    <!-- 附件 start-->
    <view class="cell-att" v-if="wenItem.imageA.length > 1">
      <block v-for="(item, index) in wenItem.imageA" :key="index" v-if="index < 3">
        <image class="cell-image" :src="item.attachment" mode="aspectFill"></image>
      </block>
    </view>

    <!-- 附件 end-->

    <!-- cell信息start -->
    <view class="cell-info">
      <view class="cell-info-left">
        <view class="icon-item cell-tag">
          <image class="cell-icon" src="https://mc.wpnicer.com/source/plugin/mobile/template/image/xiaochengxu/minimg/re_tag.png"></image>
          <view class="cell-icon-text">{{wenItem.typename?wenItem.typename:'分类'}}</view>
        </view>
        <view class="icon-item cell-recount">
          <image class="cell-icon" src="https://mc.wpnicer.com/source/plugin/mobile/template/image/xiaochengxu/minimg/re_dis.png"></image>
          <view class="cell-icon-text">{{wenItem.replies}}个回答</view>
        </view>
      </view>

      <view cell-info-right>
        <view class="icon-item cell-recount" @tap.stop="clickReply" :id="wenItem.tid">
          <image class="cell-icon" src="https://mc.wpnicer.com/source/plugin/mobile/template/image/xiaochengxu/minimg/re_re.png"></image>
          <view class="cell-reply">回答</view>
        </view>
      </view>
    </view>

  </view>
  <!-- cell信息end -->

</block>
              </view>
              <view class="cell-single-right">
                <image class="cell-image" :src="wenItem.imageA[0].attachment"></image>
              </view>
            </view>
          </block>
          <block v-else>
            <block data-type="template" data-is="answer_cell" data-attr="wenItem">
  <view class="cell">
    <!-- cell标题 start-->
    <view :class="'cell-title ' + (wenItem.imageA.length == 1?'single-image':'')">
      <text class="wen">问</text> {{wenItem.subject}}
    </view>
    <!-- cell标题 end-->

    <!-- 附件 start-->
    <view class="cell-att" v-if="wenItem.imageA.length > 1">
      <block v-for="(item, index) in wenItem.imageA" :key="index" v-if="index < 3">
        <image class="cell-image" :src="item.attachment" mode="aspectFill"></image>
      </block>
    </view>

    <!-- 附件 end-->

    <!-- cell信息start -->
    <view class="cell-info">
      <view class="cell-info-left">
        <view class="icon-item cell-tag">
          <image class="cell-icon" src="https://mc.wpnicer.com/source/plugin/mobile/template/image/xiaochengxu/minimg/re_tag.png"></image>
          <view class="cell-icon-text">{{wenItem.typename?wenItem.typename:'分类'}}</view>
        </view>
        <view class="icon-item cell-recount">
          <image class="cell-icon" src="https://mc.wpnicer.com/source/plugin/mobile/template/image/xiaochengxu/minimg/re_dis.png"></image>
          <view class="cell-icon-text">{{wenItem.replies}}个回答</view>
        </view>
      </view>

      <view cell-info-right>
        <view class="icon-item cell-recount" @tap.stop="clickReply" :id="wenItem.tid">
          <image class="cell-icon" src="https://mc.wpnicer.com/source/plugin/mobile/template/image/xiaochengxu/minimg/re_re.png"></image>
          <view class="cell-reply">回答</view>
        </view>
      </view>
    </view>

  </view>
  <!-- cell信息end -->

</block>
          </block>
        </view>

      </block>
    </view>
  </view>
  <!--列表end -->
  <view class="noMoreView" :hidden="!noMore">
  别再用力了，你已经滑到底啦
</view>

</view>

<image src="https://mc.wpnicer.com/source/plugin/mobile/template/image/xiaochengxu/minimg/course_post.png" class="postEnter borderShowdow" @tap="postEnter">发布</image>

</view>
</template>

<script>
// pages/question_type/question_type.js
const forumdisplayUrl = require("../../config").forumdisplayUrl;
const util = require("../../utils/util.js");
const app = getApp();
var self;

export default {
  data() {
    return {
      fid: 50,
      currentTab: 0,
      singleimage: true,
      typeid: '',
      page: 1,
      datalist: [],
      threadtypes: {},
      noMore: "",
      dataDic: ""
    };
  },

  components: {},
  props: {},
  onShow: function () {
    self = this;
  },
  onLoad: function (options) {
    console.log('执行了');
    self = this;

    if (options.typeid) {
      self.setData({
        typeid: options.typeid
      });
    }

    self.fourmdisplayRequest();
  },
  onPullDownRefresh: function () {
    self.page = 1;
    self.fourmdisplayRequest();
  },
  onReachBottom: function () {
    if (!self.noMore) {
      self.page++;
      self.fourmdisplayRequest();
    }
  },
  methods: {
    refreshRequest() {
      self.setData({
        page: 1
      });
      self.fourmdisplayRequest();
    },

    fourmdisplayRequest() {
      var data = {};

      if (self.currentTab == 0) {
        data = {
          'fid': self.fid,
          'page': self.page,
          mobile_api: 1
        };
      } else if (self.currentTab == 1) {
        data = {
          'filter': 'specialtype',
          'specialtype': 'reward',
          'rewardtype': 1,
          'fid': self.fid,
          'page': self.page,
          mobile_api: 1
        };
      } else if (self.currentTab == 2) {
        data = {
          'filter': 'specialtype',
          'specialtype': 'reward',
          'rewardtype': 2,
          'fid': self.fid,
          'page': self.page,
          mobile_api: 1
        };
      }

      if (self.typeid) {
        data['filter'] = 'typeid';
        data['typeid'] = self.typeid;
      }

      app.globalData.apimanager.getRequest(forumdisplayUrl, data).then(res => {
        wx.stopPullDownRefresh();
        var usernicknames = res.Variables.usernicknames;
        let arr1 = res.Variables.forum_threadlist;

        if (res.Variables.threadtypes) {
          self.setData({
            threadtypes: res.Variables.threadtypes
          });

          if (self.typeid) {
            wx.setNavigationBarTitle({
              title: self.threadtypes.types[self.typeid]
            });
          }
        }

        for (let i = 0; i < arr1.length; i++) {
          let postItem = arr1[i];

          if (usernicknames) {
            if (usernicknames[postItem.authorid]) {
              postItem.nickname = usernicknames[postItem.authorid];
            }
          }

          if (self.threadtypes && postItem.typeid > 0) {
            postItem['typename'] = self.threadtypes.types[postItem.typeid];
          }

          if (postItem.message && postItem.message.length > 0) {
            postItem.message = util.filterHtml(postItem.message);
          }

          let attachments = postItem.attachlist;

          if (attachments) {
            let imageA = [];

            for (let k = 0; k < attachments.length; k++) {
              let attItem = attachments[k];
              let realIndex = i;

              if (self.page > 1) {
                realIndex = i + self.datalist.length;
              }

              if (attItem.type == 'image') {
                attItem['toolUse'] = {
                  listIndex: realIndex,
                  imageIndex: k
                };
                imageA.push(attItem);
              }
            }

            postItem['imageA'] = imageA;
          }
        }

        if (self.page > 1 && arr1.length > 0) {
          arr1 = self.datalist.concat(arr1);
        }

        var noMore = false;

        if (arr1.length >= res.Variables.forum.threadcount) {
          noMore = true;
        }

        self.setData({
          datalist: arr1,
          noMore: noMore,
          dataDic: res
        });
      }).catch(res => {
        wx.stopPullDownRefresh();
        console.log(res);
      });
    },

    naviClick(e) {
      self.setData({
        currentTab: e.currentTarget.id,
        page: 1
      });
      self.fourmdisplayRequest();
    },

    cellClick(e) {
      var tid = this.datalist[e.currentTarget.id].tid;
      wx.navigateTo({
        url: '../question_answer_detail/question_answer_detail?tid=' + tid
      });
    },

    clickReply(e) {
      wx.navigateTo({
        url: '../post_thread/post_thread?isreply=true&tid=' + e.currentTarget.id + '&fid=' + self.fid
      });
    },

    postEnter() {
      wx.navigateTo({
        url: '../question_answer_post/question_answer_post?fid=' + self.fid + '&typeid=' + self.typeid
      });
    }

  }
};
</script>
<style>
@import "./question_type.css";
</style>