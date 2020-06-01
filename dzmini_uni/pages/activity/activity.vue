<template>
<view>
<!--pages/activity/activity.wxml-->
<view class="container">
	<!-- 内容 -->
	<view class="class_content">
		<form catchsubmit="formSubmit" report-submit="true" report-submit-timeout="500">
			<block v-for="(item, index) in datalist" :key="index">
				<view class="cell" :id="index" @tap="activityClick">
	

          <view class="tj_content">
            <view class="title">{{item.subject}}<text v-if=" item.class && item.class != 'undefined'">{{item.class}}</text>
				</view>

				<view class="info">
					<view class="info-content">
						<view class="time_content">
							<image class="small_icon" src="https://mc.wpnicer.com/source/plugin/mobile/template/image/xiaochengxu/minimg/join_time.png"></image>

							<view class="time">{{item.starttime}} - {{item.expiration}}</view>
						</view>

						<view class="count_content">
							<image class="small_icon" src="https://mc.wpnicer.com/source/plugin/mobile/template/image/xiaochengxu/minimg/join_count.png"></image>

							<view class="count">
								<text>已报 {{item.applynumber}}</text>/{{item.number==0?'不限':item.number}} 人</view>
						</view>
					</view>

					<view class="join" @tap.stop="joinActivity" :id="item.tid" hidden>报名</view>

				</view>

	</view>

</view>

</block>
</form>
</view>
<view class="noMoreView" :hidden="!noMore">
	别再用力了，你已经滑到底啦
</view>

</view>

<image src="https://mc.wpnicer.com/source/plugin/mobile/template/image/xiaochengxu/minimg/course_post.png" class="postEnter borderShowdow" @tap="postEnter">发布</image>

<course_joinMask @joinSucceed="joinSucceed" :joinShow="joinShow" :tid="currenttid"></course_joinMask>
</view>
</template>

<script>
// pages/activity/activity.js
const workListUrl = require("../../config").workListUrl;
const app = getApp();
var self;
import course_joinMask from "../../component/activity_joinMask/activity_joinMask";

export default {
  data() {
    return {
      datalist: [],
      loading: false,
      pagenum: 1,
      fid: 70,
      noMore: "",
      currenttid: "",
      joinShow: false
    };
  },

  components: {
    course_joinMask
  },
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    self = this;
    self.shareManage(options);
    self.makeRequest();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},
  onPullDownRefresh: function () {
    wx.showLoading({
      title: 'loading...',
      icon: 'loading'
    });
    self.requestMore(false);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (!self.noMore) {
      self.requestMore(true);
    }
  },
  methods: {
    shareManage(options) {
      // sharetype = work & shareid=
      if (options.shareid) {
        wx.navigateTo({
          url: '../activity_detail/activity_detail?tid=' + options.shareid
        });
      }
    },

    makeRequest() {
      self.setData({
        loading: true
      });
      let getdata = {
        fid: self.fid,
        page: self.pagenum,
        mobile_api: 1
      };
      app.globalData.apimanager.getRequest(workListUrl, getdata).then(res => {
        wx.stopPullDownRefresh();
        wx.hideLoading();
        let arr1 = res.Variables.forum_threadlist;

        for (let i = 0; i < arr1.length; i++) {
          var thread = arr1[i];
          thread.nickname = res.Variables.usernicknames[thread.authorid] ? res.Variables.usernicknames[thread.authorid] : thread.author;
        }

        if (self.pagenum > 1) {
          arr1 = self.datalist.concat(arr1);
        }

        var noMore = false;

        if (arr1.length >= res.Variables.forum.threadcount) {
          noMore = true;
        }

        self.setData({
          loading: false,
          datalist: arr1,
          noMore: noMore
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

    stopPullDownRefresh() {
      wx.stopPullDownRefresh({
        complete(res) {
          wx.hideToast();
        }

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

    joinActivity(e) {
      self.setData({
        currenttid: e.currentTarget.id,
        joinShow: true
      });
    },

    activityClick(e) {
      const index = e.currentTarget.id;
      var item = self.datalist[index];
      wx.navigateTo({
        url: '../activity_detail/activity_detail?tid=' + item.tid + '&pid=' + item.pid
      });
    },

    postEnter() {
      if (app.globalData.member_identity == 2 && app.globalData.member_status != 1) {
        wx.showModal({
          content: '老师身份正在审核，请耐心等待',
          showCancel: false,
          confirmText: '知道了'
        });
        return;
      }

      wx.navigateTo({
        url: '../activity_post/activity_post?fid=' + self.fid
      });
    }

  }
};
</script>
<style>
@import "./activity.css";
</style>