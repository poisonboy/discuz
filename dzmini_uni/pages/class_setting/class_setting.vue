<template>
<view>
<!--<import src="more_user.wxml"></import>-->
<view class="page">
    <block data-type="template" data-is="moreUser" data-attr="...userList">
  <view class="l_member">
    <block v-for="(item, index) in userList" :key="index">
      <view class="fl me_item">
        <view class="img_block">
          <view class="me_head">
            <image mode="aspectFill" :src="item.avatar"></image>
          </view>
          <view class="me_lab lab_zhu" v-if="item.level == 1">管</view>
          <view class="me_lab lab_guan" v-if="item.level==2">管</view>
          <view class="me_lab lab_shi" v-if="item.level == 3">师</view>
        </view>
        <view class="me_nick ell">{{item.nickname?item.nickname:item.realname?item.realname:item.username}}</view>
      </view>
    </block>
    <!-- 加号 -->
    <view class="fl me_item">
      <button class="me_head" open-type="share">
        <view class="me_add"></view>
        <view class="me_jian"></view>
      </button>
      <view class="me_nick ell"></view>
    </view>
    <!-- 减号 -->
    <view class="fl me_item" v-if="userList.length > 1 &&(myInfo.level==1 || myInfo.level==2)" @tap="goToRemoveUser">
      <view class="me_head">
        <view class="me_jian"></view>
      </view>
      <view class="me_nick ell"></view>
    </view>

    <view class="fl me_more" v-if="!noMore" @tap="goToMoreUser">
      <text>查看更多群成员</text>
    </view>
  </view>
</block>
    <view class="page__bd">
      <view class="weui-cells weui-cells_after-title" @tap="goToUpdateClass">
          <view class="weui-cell">
              <view class="weui-cell__bd">圈子名称</view>
              <view :class="'weui-cell__ft ' + (myInfo.level == 1 || myInfo.level == 2 ?'weui-cell__ft_in-access':'') + ' mingcheng'">{{groupInfo.name}}</view>
          </view>
          <view class="weui-cell">
              <view class="weui-cell__bd">圈子口号</view>
              <view :class="'weui-cell__ft ' + (myInfo.level == 1 || myInfo.level == 2 ?'weui-cell__ft_in-access':'') + ' kouhao'">{{groupInfo.description}}</view>
          </view>
          <view class="weui-cell">
            <view class="weui-cell__hd">
                  <view class="weui-label">圈子LOGO</view>
              </view>            
              <view class="weui-cell__bd">

              </view>
              <view :class="'weui-cell__ft ' + (myInfo.level == 1 || myInfo.level == 2 ?'weui-cell__ft_in-access':'')">
                <view class="img_box">
                  <block v-if="groupInfo.iconnew != 0">
                    <image class="logo" :src="groupInfo.icon"></image>
                  </block>
                  <block v-else>
                    <image class="logo" src="https://mc.wpnicer.com/source/plugin/mobile/template/image/xiaochengxu/minimg/unknow_logo.jpg"></image>
                  </block>            
                </view>
              </view>
          </view>
      </view>   
      <view class="weui-cells weui-cells_after-title">
          <view class="weui-cell" @tap="giveUpAdmin" v-if="myInfo.level == 1">
              <view class="weui-cell__bd">圈主转让</view>
              <view class="weui-cell__ft weui-cell__ft_in-access"></view>

          </view>
          <view class="weui-cell" @tap="setAdmin" v-if="myInfo.level == 1">
              <view class="weui-cell__bd">管理员管理</view>
              <view class="weui-cell__ft weui-cell__ft_in-access"></view>
          </view>
          <view class="weui-cell" @tap="userAudit" v-if="myInfo.level == 1 || myInfo.level == 2">
              <view class="weui-cell__bd">成员审核</view>
              <view class="weui-cell__ft weui-cell__ft_in-access"><view class="weui-badge weui-badge_dot" v-if="groupInfo.moduser>0"></view></view>
          </view>
          <view class="weui-cell" @tap="goToTag" v-if="myInfo.level == 1 || myInfo.level == 2">
              <view class="weui-cell__bd">分类管理</view>
              <view class="weui-cell__ft weui-cell__ft_in-access"></view>
          </view>           
          <view class="weui-cell" @tap="goToRank" hidden>
              <view class="weui-cell__bd">排行榜</view>
              <view class="weui-cell__ft weui-cell__ft_in-access"></view>
          </view>
      </view>  
      <view class="weui-cells weui-cells_after-title" @tap="goToUserClass" hidden>
          <view class="weui-cell">
              <view class="weui-cell__bd">我在本圈子的昵称</view>
              <view class="weui-cell__ft weui-cell__ft_in-access">{{myInfo.nickname == ''?'设置昵称':myInfo.nickname}}</view>
          </view>
          <view class="weui-cell">
              <view class="weui-cell__bd">我的手机号</view>
              <view class="weui-cell__ft weui-cell__ft_in-access">{{myInfo.mobile == 0?'设置手机号':myInfo.mobile}}</view>
          </view>
      </view>  
      <view class="weui-btn-area">
          <button class="weui-btn" type="warn" @tap="exitClass" v-if="myInfo.uid != groupInfo.founderuid">退出圈子</button>
          <button class="weui-btn" type="warn" @tap="deleteClass" v-if="myInfo.uid == groupInfo.founderuid && userList.userList.length == 1" hidden>解散圈子</button>
          <button class="weui-btn" type="warn" @tap="giveUpAdmin" v-if="myInfo.uid == groupInfo.founderuid && userList.userList.length > 1">转让圈子</button>
      </view>
    </view>
</view>
</view>
</template>

<script>
const forumUrl = require("../../config").forumUrl;
const exitClassUrl = require("../../config").exitClassUrl;
const userAvatar = require("../../config").userAvatar;
const deleteClassUrl = require("../../config").deleteClassUrl;
var event = require("../../utils/event.js");
const app = getApp();
var _this;
var fid;

export default {
  data() {
    return {
      fid: 0,
      groupInfo: {},
      uid: 0,
      myInfo: {},
      userAvatar: "",
      userList: {},
      _userlist: ""
    };
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    fid = options.id;
    var uid = app.globalData.uid;
    console.log(uid);
    _this = this;
    this.setData({
      fid: fid,
      uid: uid,
      userAvatar: userAvatar
    });
  },
  onShow: function (options) {
    this.initClassInfo(fid);
  },

  onShareAppMessage() {
    var title = encodeURIComponent(_this.groupInfo.name);
    var content = encodeURIComponent(_this.groupInfo.description);
    var img = 'https://mc.wpnicer.com/source/plugin/mobile/template/image/xiaochengxu/minimg/shareClassIcon.png';
    var founderuid = _this.groupInfo.founderuid;
    console.log(founderuid);
    var founder = _this._userlist[founderuid];
    var nickname = founder.nickname ? founder.nickname : founder.realname ? founder.realname : founder.username;
    return {
      title: nickname + '同学创建了一个叫' + decodeURIComponent(title) + '的圈子，快快去加入讨论吧！',
      path: "/pages/index/index?sharetype=joinclass&shareid=" + _this.fid + "&title=" + title + "&content=" + content,
      imageUrl: img
    };
  },

  methods: {
    initClassInfo(fid) {
      app.globalData.apimanager.getRequest(forumUrl, {
        fid: fid
      }).then(res => {
        var myInfo = res.Variables.groupinfo.userlist[_this.uid];
        var userCount = res.Variables.groupinfo.users;
        wx.setNavigationBarTitle({
          title: '圈子信息(' + userCount + ')'
        });

        if (res.Variables.groupinfo.ingroup == 0) {
          wx.navigateBack();
          wx.showToast({
            title: '您还不是圈子成员，暂无权限查看',
            icon: 'none'
          });
          return;
        }

        var userList = []; //转数组

        for (var x in res.Variables.groupinfo.userlist) {
          userList.unshift(res.Variables.groupinfo.userlist[x]);
        } //排序


        userList.sort(function (a, b) {
          return a.level - b.level;
        });
        var _userList = userList;
        var userList = []; //只留18个显示

        var i = 0;

        for (var x in _userList) {
          var max = myInfo.level == 1 || myInfo.level == 2 ? 17 : 18;

          if (i > max) {
            break;
          }

          userList.push(_userList[x]);
          i = i + 1;
        }

        _this.setData({
          groupInfo: res.Variables.groupinfo,
          myInfo: myInfo,
          userList: {
            userList: userList,
            userAvatar: userAvatar,
            myInfo: myInfo
          },
          _userlist: res.Variables.groupinfo.userlist
        });
      }).catch(res => {
        wx.showToast({
          title: '出错了！',
          icon: 'none'
        });
        console.log(res);
      });
    },

    goToUpdateClass() {
      if (this.myInfo.level == 1 || this.myInfo.level == 2) {
        wx.navigateTo({
          url: '../create_class/create_class?id=' + _this.fid
        });
      }
    },

    setAdmin() {
      if (this.myInfo.level == 1 || this.myInfo.level == 2) {
        wx.navigateTo({
          url: '../admin_setting/admin_setting?type=set&id=' + _this.fid
        });
      }
    },

    setTeacher() {
      if (this.myInfo.level == 1 || this.myInfo.level == 2) {
        wx.navigateTo({
          url: '../admin_setting/admin_setting?type=setTeacher&id=' + _this.fid
        });
      }
    },

    giveUpAdmin() {
      if (this.myInfo.level == 1) {
        wx.navigateTo({
          url: '../admin_setting/admin_setting?type=giveup&id=' + _this.fid
        });
      }
    },

    goToRemoveUser() {
      if (this.myInfo.level == 1 || this.myInfo.level == 2) {
        wx.navigateTo({
          url: '../admin_setting/admin_setting?type=remove&id=' + _this.fid
        });
      }
    },

    userAudit() {
      if (this.myInfo.level == 1 || this.myInfo.level == 2) {
        wx.navigateTo({
          url: '../user_audit/user_audit?id=' + _this.fid
        });
      }
    },

    goToRank() {
      wx.navigateTo({
        url: '../class_rank/class_rank?id=' + _this.fid
      });
    },

    goToTag() {
      wx.navigateTo({
        url: '../class_tag/class_tag?id=' + _this.fid
      });
    },

    exitClass() {
      app.globalData.apimanager.getRequest(exitClassUrl, {
        fid: this.fid
      }).then(res => {
        if (res.Message.messageval == 'group_exit_succeed') {
          event.emit('indexChanged', {
            fid: _this.fid
          });
          wx.navigateBack();
        } else {
          wx.showModal({
            content: res.Message.messageval,
            showCancel: false
          });
        }
      }).catch(res => {
        wx.showToast({
          title: '出错了！',
          icon: 'none'
        });
      });
    },

    deleteClass() {
      wx.showModal({
        title: '提示',
        content: '解散圈子会删掉圈子的所有信息，包括圈子内容，成员等，你确认需要解散吗？',

        success(res) {
          if (res.confirm) {
            app.globalData.apimanager.getRequest(deleteClassUrl, {
              fid: _this.fid
            }).then(res => {
              if (res.Message.messageval == 'group_delete_succeed') {
                event.emit('indexChanged', {
                  fid: _this.fid
                });
                wx.navigateBack();
              } else {
                wx.showModal({
                  content: res.Message.messageval,
                  showCancel: false
                });
              }
            }).catch(res => {
              wx.showToast({
                title: '出错了！',
                icon: 'none'
              });
            });
          } else if (res.cancel) {
            console.log('用户点击取消');
          }
        }

      });
    },

    goToUserClass() {
      return;
      wx.navigateTo({
        url: '../user_class_setting/user_class_setting?id=' + _this.fid + '&nickname=' + encodeURIComponent(_this.myInfo.nickname) + '&mobile=' + encodeURIComponent(_this.myInfo.mobile)
      });
    },

    goToMoreUser() {
      wx.navigateTo({
        url: '../more_user/more_user?id=' + _this.fid
      });
    }

  }
};
</script>
<style>
@import "./class_setting.css";
</style>