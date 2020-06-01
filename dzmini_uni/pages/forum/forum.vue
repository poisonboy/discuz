<template>
<view>
<block v-for="(item, index) in catlist" :key="index">
	<view class="cu-bar bg-white solid-bottom margin-top">
		<view class="action">
			<text class="cuIcon-title text-yellow "></text> {{item.name}}
		</view>
	</view>
	<view v-for="(forum, index2) in item.forums" :key="index2" class="cu-list menu-avatar" :id="forum.fid">

		<view class="cu-item" @tap="toFourmdisplay" :for-item="forum" :id="forum.fid">
			<view class="cu-avatar round lg" :style="'background-image:url(' + forum.icon + ' );'">
				<view class="cu-tag badge" v-if="forum.todayposts>0">{{forum.todayposts}}</view>
			</view>
			<view class="content">
				<view class="text-grey">
					<text class="text-cut">{{forum.name}}</text>
					<view class="cu-tag round bg-yellow sm" v-if="forum.threads>3">热门</view>
				</view>
				<view class="text-gray text-sm flex">
					<text class="text-cut">{{forum.description}}</text>
				</view>
			</view>
			<view class="action">
				<view class="text-grey text-xs">帖数：{{forum.threads}}</view>
				 
			</view>
		</view>



	</view>
</block>
</view>
</template>

<script>
// pages/forum/forum.js
const forumindexUrl = require("../../config").forumindexUrl;
const app = getApp();
var self;

export default {
  data() {
    return {
      catlist: ""
    };
  },

  components: {},
  props: {},
  onLoad: function (options) {
    wx.showLoading();
    this.forumIndexRequest();
  },
  onShow: function (options) {
    wx.setNavigationBarTitle({
      title: '版块'
    });
  },
  onPullDownRefresh: function () {
    this.forumIndexRequest();
  },
  methods: {
    forumIndexRequest() {
      app.globalData.apimanager.getRequest(forumindexUrl).then(res => {
        wx.hideLoading();
        wx.stopPullDownRefresh();
        var catlist = res.Variables.catlist;
        var forumlist = res.Variables.forumlist;
        forumlist.forEach(function (data) {
          data.name = data.name.substring(0, 20);
        });

        for (let i = 0; i < catlist.length; i++) {
          catlist[i].name = catlist[i].name.substring(0, 20);
          let forums = catlist[i].forums;

          for (let j = 0; j < forums.length; j++) {
            let fid = forums[j];

            for (let k = 0; k < forumlist.length; k++) {
              let info = forumlist[k];

              if (fid == info.fid) {
                forums[j] = info;
                break;
              }
            }
          }
        }

        this.setData({
          catlist: catlist
        });
      }).catch(res => {
        wx.stopPullDownRefresh();
        wx.hideLoading();
      });
    },

    toFourmdisplay(e) {
      var fid = e.currentTarget.id;
      wx.navigateTo({
        url: '../forumdisplay/forumdisplay?fid=' + fid
      });
    }

  }
};
</script>
<style>
@import "./forum.css";
</style>