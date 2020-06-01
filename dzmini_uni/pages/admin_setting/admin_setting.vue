<template>
<view>
<view class="l_sea">
  <view class="sea_bar" @tap.stop="showSea">
    <view class="sea_btn1" :hidden="showSea==1">搜索</view>
    <input class="sea_btn" placeholder="搜索" :hidden="showSea==0" :focus="showSea==1" @blur="seablur" placeholder-style="color:#B2B2B2" @input="seaInput"></input>
  </view>
</view>
<scroll-view class="l_main" v-if="type=='giveup'" scroll-y="true" :scroll-into-view="toView">
  <!-- 每组 -->
  <view class="l_group" v-if="userList['admin'].length>0">管理员</view>
  <!-- 成员 -->
  <view class="l_member">
    <block v-for="(item, index) in userList['admin']" :key="index">
      <view class="me_item" @tap="selectSuperAdmin" :data-uid="item.uid">
        <view class="fl me_head">
          <view class="imgbox">
            <image mode="aspectFill" :src="item.avatar"></image>
          </view>
            <view class="me_lab lab_zhu" v-if="item.level==1">管</view>
            <view class="me_lab lab_guan" v-if="item.level==2">管</view>
            <view class="me_lab lab_shi" v-if="item.level==3">师</view>
        </view>
        <view class="fl ell me_nick">{{item.nickname?item.nickname:item.realname?item.realname:item.username}}</view>
        <view class="fr me_nc" v-if="selectSingle == item.uid"></view>
      </view>
    </block>
  </view>
  <block v-for="(item, idx) in userList['user']" :key="idx">
    <view class="l_group" :id="'view_' + idx">{{idx}}</view>
    <block v-for="(_item, index) in item" :key="index">
      <view class="l_member">
        <view class="me_item" @tap="selectSuperAdmin" :data-uid="_item.uid">
          <view class="fl me_head">
            <view class="imgbox">
              <image mode="aspectFill" :src="_item.avatar"></image>
            </view>
            <view class="me_lab lab_zhu" v-if="_item.level==1">管</view>
            <view class="me_lab lab_guan" v-if="_item.level==2">管</view>
            <view class="me_lab lab_shi" v-if="_item.level==3">师</view>
          </view>
          <view class="fl ell me_nick">{{_item.nickname?_item.nickname:_item.realname?_item.realname:_item.username}}</view>
          <view class="fr me_nc" v-if="selectSingle == _item.uid"></view>
        </view>
      </view>
    </block>
  </block>
  <view class="l_nav">
    <block v-for="(item, idx) in userList['user']" :key="idx">
      <view class="nav_item" :data-id="idx" @tap="jumpTo">{{idx}}</view>
    </block>
  </view>
</scroll-view>
<view class="l_true l_flex" v-if="type=='giveup'">
  <input class="l_pwd" type="password" name="password" @input="passwordChange" placeholder="请输入密码"></input><button @tap="setAdmin">确定</button>
</view>
<scroll-view class="l_main" v-if="type=='set'" scroll-y="true" :scroll-into-view="toView">
  <!-- 每组 -->
  <view class="l_group" v-if="userList['admin'].length>0">管理员</view>
  <!-- 成员 -->
  <view class="l_member">
    <block v-for="(item, index) in userList['admin']" :key="index">
      <view class="me_item" @tap="selectNormalAdmin" :data-uid="item.uid">
        <view class="fl me_sele no" v-if="!selectMuti[item.uid]"></view>
        <view class="fl me_sele yes" v-if="selectMuti[item.uid]"></view>
        <view class="fl me_head">
          <view class="imgbox">
            <image mode="aspectFill" :src="item.avatar"></image>
          </view>
            <view class="me_lab lab_zhu" v-if="item.level==1">管</view>
            <view class="me_lab lab_guan" v-if="item.level==2">管</view>
            <view class="me_lab lab_shi" v-if="item.level==3">师</view>
        </view>
        <view class="fl ell me_nick">{{item.nickname?item.nickname:item.realname?item.realname:item.username}}</view>
      </view>
    </block>
  </view>
  <block v-for="(item, idx) in userList['user']" :key="idx">
    <view class="l_group" :id="'view_' + idx">{{idx}}</view>
    <block v-for="(_item, index) in item" :key="index">
      <view class="l_member">
        <view class="me_item" @tap="selectNormalAdmin" :data-uid="_item.uid">
          <view class="fl me_sele no" v-if="!selectMuti[_item.uid]"></view>
          <view class="fl me_sele yes" v-if="selectMuti[_item.uid]"></view>
          <view class="fl me_head">
            <view class="imgbox">
              <image mode="aspectFill" :src="_item.avatar"></image>
            </view>
            <view class="me_lab lab_zhu" v-if="_item.level==1">管</view>
            <view class="me_lab lab_guan" v-if="_item.level==2">管</view>
            <view class="me_lab lab_shi" v-if="_item.level==3">师</view>
          </view>
          <view class="fl ell me_nick">{{_item.nickname?_item.nickname:_item.realname?_item.realname:_item.username}}</view>
        </view>
      </view>
    </block>
  </block>
  <view class="l_nav">
    <block v-for="(item, idx) in userList['user']" :key="idx">
      <view class="nav_item" :data-id="idx" @tap="jumpTo">{{idx}}</view>
    </block>
  </view>


</scroll-view>
<view class="l_true" v-if="type=='set'">
  <button @tap="addAdmin">确定</button>
</view>
<scroll-view class="l_main" v-if="type=='setTeacher'" scroll-y="true" :scroll-into-view="toView">
  <!-- 每组 -->
  <view class="l_group" v-if="userList['admin'].length>0">管理员</view>
  <!-- 成员 -->
  <view class="l_member">
    <block v-for="(item, index) in userList['admin']" :key="index">
      <view class="me_item" @tap="selectTeacher" :data-uid="item.uid">
        <view class="fl me_sele no" v-if="!selectMutiTeacher[item.uid]"></view>
        <view class="fl me_sele yes" v-if="selectMutiTeacher[item.uid]"></view>
        <view class="fl me_head">
          <view class="imgbox">
            <image mode="aspectFill" :src="item.avatar"></image>
          </view>
            <view class="me_lab lab_zhu" v-if="item.level==1">管</view>
            <view class="me_lab lab_guan" v-if="item.level==2">管</view>
            <view class="me_lab lab_shi" v-if="item.level==3">师</view>
        </view>
        <view class="fl ell me_nick">{{item.nickname?item.nickname:item.realname?item.realname:item.username}}</view>
      </view>
    </block>
  </view>
  <block v-for="(item, idx) in userList['user']" :key="idx">
    <view class="l_group" :id="'view_' + idx">{{idx}}</view>
    <block v-for="(_item, index) in item" :key="index">
      <view class="l_member">
        <view class="me_item" @tap="selectTeacher" :data-uid="_item.uid">
          <view class="fl me_sele no" v-if="!selectMutiTeacher[_item.uid]"></view>
          <view class="fl me_sele yes" v-if="selectMutiTeacher[_item.uid]"></view>
          <view class="fl me_head">
            <view class="imgbox">
              <image mode="aspectFill" :src="_item.avatar"></image>
            </view>
            <view class="me_lab lab_zhu" v-if="_item.level==1">管</view>
            <view class="me_lab lab_guan" v-if="_item.level==2">管</view>
            <view class="me_lab lab_shi" v-if="_item.level==3">师</view>
          </view>
          <view class="fl ell me_nick">{{_item.nickname?_item.nickname:_item.realname?_item.realname:_item.username}}</view>
        </view>
      </view>
    </block>
  </block>
  <view class="l_nav">
    <block v-for="(item, idx) in userList['user']" :key="idx">
      <view class="nav_item" :data-id="idx" @tap="jumpTo">{{idx}}</view>
    </block>
  </view>
</scroll-view>
<view class="l_true" v-if="type=='setTeacher'">
  <button @tap="setTeacher">确定</button>
</view>
<scroll-view class="l_main" v-if="type=='remove'" scroll-y="true" :scroll-into-view="toView">
  <!-- 每组 -->
  <view class="l_group" v-if="userList['admin'].length>0">管理员</view>
  <!-- 成员 -->
  <view class="l_member">
    <block v-for="(item, index) in userList['admin']" :key="index">
      <view class="me_item" @tap="selectNormalAdmin" :data-uid="item.uid">
        <view class="fl me_sele no" v-if="!selectRemove[item.uid]"></view>
        <view class="fl me_sele yes" v-if="selectRemove[item.uid]"></view>
        <view class="fl me_head">
          <view class="imgbox">
            <image mode="aspectFill" :src="item.avatar"></image>
          </view>
            <view class="me_lab lab_zhu" v-if="item.level==1">管</view>
            <view class="me_lab lab_guan" v-if="item.level==2">管</view>
            <view class="me_lab lab_shi" v-if="item.level==3">师</view>
        </view>
        <view class="fl ell me_nick">{{item.nickname?item.nickname:item.realname?item.realname:item.username}}</view>
      </view>
    </block>
  </view>
  <block v-for="(item, idx) in userList['user']" :key="idx">
    <view class="l_group" :id="'view_' + idx">{{idx}}</view>
    <block v-for="(_item, index) in item" :key="index">
      <view class="l_member">
        <view class="me_item" @tap="selectNormalAdmin" :data-uid="_item.uid">
          <view class="fl me_sele no" v-if="!selectRemove[_item.uid]"></view>
          <view class="fl me_sele yes" v-if="selectRemove[_item.uid]"></view>
          <view class="fl me_head">
            <view class="imgbox">
              <image mode="aspectFill" :src="_item.avatar"></image>
            </view>
            <view class="me_lab lab_zhu" v-if="_item.level==1">管</view>
            <view class="me_lab lab_guan" v-if="_item.level==2">管</view>
            <view class="me_lab lab_shi" v-if="_item.level==3">师</view>
          </view>
          <view class="fl ell me_nick">{{_item.nickname?_item.nickname:_item.realname?_item.realname:_item.username}}</view>
        </view>
      </view>
    </block>
  </block>
  <view class="l_nav">
    <block v-for="(item, idx) in userList['user']" :key="idx">
      <view class="nav_item" :data-id="idx" @tap="jumpTo">{{idx}}</view>
    </block>
  </view>
</scroll-view>
<view class="l_true" v-if="type=='remove'">
  <button @tap="removeUser">确定</button>
</view>
</view>
</template>

<script>
const forumUrl = require("../../config").forumUrl;
const userAvatar = require("../../config").userAvatar;
const setAdminUrl = require("../../config").setAdminUrl;
const addAdminUrl = require("../../config").addAdminUrl;
import util from "../../utils/util";
const app = getApp();
var _this;

export default {
  data() {
    return {
      fid: 0,
      groupInfo: {},
      uid: 0,
      myInfo: {},
      showSea: 0,
      userList: {},
      allUserList: {},
      selectRemove: {},
      pwd: '',
      userAvatar: "",
      type: "",
      selectSingle: "",
      selectMuti: "",
      selectMutiTeacher: "",
      toView: ""
    };
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var fid = options.id;
    var type = options.type;
    var uid = app.globalData.uid;
    console.log(uid);
    _this = this;
    this.setData({
      fid: fid,
      uid: uid,
      userAvatar: userAvatar,
      type: type
    });
  },
  onShow: function (options) {
    this.initClassInfo();
  },
  methods: {
    initClassInfo() {
      app.globalData.apimanager.getRequest(forumUrl, {
        fid: this.fid
      }).then(res => {
        var myInfo = res.Variables.groupinfo.userlist[_this.uid];
        var userCount = res.Variables.groupinfo.users;
        wx.setNavigationBarTitle({
          title: '成员(' + userCount + ')'
        });
        var selectSingle = res.Variables.groupinfo.founderuid;
        var selectMuti = new Array();
        var selectMutiTeacher = new Array();

        for (var x in res.Variables.groupinfo.userlist) {
          if (res.Variables.groupinfo.userlist[x].level == 2) {
            selectMuti[res.Variables.groupinfo.userlist[x].uid] = res.Variables.groupinfo.userlist[x].uid;
          }
        }

        for (var x in res.Variables.groupinfo.userlist) {
          if (res.Variables.groupinfo.userlist[x].level == 3) {
            selectMutiTeacher[res.Variables.groupinfo.userlist[x].uid] = res.Variables.groupinfo.userlist[x].uid;
          }
        }

        var userList = util.userListUpdate(res.Variables.groupinfo.userlist);

        _this.setData({
          userList: userList,
          userAvatar: userAvatar,
          allUserList: res.Variables.groupinfo.userlist,
          selectSingle: selectSingle,
          selectMuti: selectMuti,
          selectMutiTeacher: selectMutiTeacher
        });
      }).catch(res => {
        console.log(res);
        wx.showToast({
          title: '出错了！',
          icon: 'none'
        });
      });
    },

    showSeaFun: function () {
      this.setData({
        showSea: 1
      });
    },
    seablur: function (e) {
      if (e.detail.value.length == 0) {
        this.setData({
          showSea: 0
        });
      }
    },
    seaInput: function (e) {
      if (e.detail.value.length != 0) {
        var keyword = e.detail.value;
        var searchUserList = util.searchUserList(keyword, this.allUserList);
        var userList = util.userListUpdate(searchUserList);

        _this.setData({
          userList: userList
        });
      } else {
        var userList = util.userListUpdate(this.allUserList);

        _this.setData({
          userList: userList
        });
      }
    },

    selectSuperAdmin(e) {
      var uid = e.currentTarget.dataset.uid;
      this.setData({
        selectSingle: uid
      });
    },

    selectNormalAdmin(e) {
      var uid = e.currentTarget.dataset.uid;
      var selectMuti = this.selectMuti;

      if (this.type == 'remove') {
        if (uid == app.globalData.uid) {
          wx.showToast({
            title: '不能踢出自己！',
            icon: 'none'
          });
          return;
        }

        var selectMuti = this.selectRemove;
      }

      if (selectMuti[uid]) {
        delete selectMuti[uid];
      } else {
        selectMuti[uid] = uid;
      }

      this.setData({
        selectMuti: selectMuti,
        selectRemove: selectMuti
      });
    },

    passwordChange(e) {
      var password = e.detail.value;
      console.log(password);
      this.setData({
        pwd: password
      });
    },

    setAdmin() {
      var data = {
        fid: this.fid,
        formhash: app.globalData.formhash,
        groupdemise: 1,
        suid: this.selectSingle,
        grouppwd: this.pwd
      };
      app.globalData.apimanager.postRequest(setAdminUrl, data).then(res => {
        if (res.Message.messageval == 'group_demise_succeed') {
          wx.showModal({
            content: res.Message.messagestr,
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                wx.navigateBack({});
              }
            }
          });
        } else {
          wx.showModal({
            content: res.Message.messagestr,
            showCancel: false
          });
        }
      }).catch(res => {
        wx.showToast({
          title: '出错了！',
          icon: 'none'
        });
        console.log(res);
      });
    },

    addAdmin() {
      var data = {
        fid: this.fid,
        formhash: app.globalData.formhash,
        targetlevel: 2,
        managetype: 1
      };

      for (var x in this.selectMuti) {
        var key = 'muid[' + x + ']';
        data[key] = x;
      }

      app.globalData.apimanager.postRequest(addAdminUrl, data).then(res => {
        if (res.Message.messageval == 'group_setup_succeed') {
          wx.showModal({
            content: res.Message.messagestr,
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                wx.navigateBack({});
              }
            }
          });
        } else {
          wx.showModal({
            content: res.Message.messagestr,
            showCancel: false
          });
        }
      }).catch(res => {
        wx.showToast({
          title: '出错了！',
          icon: 'none'
        });
        console.log(res);
      });
    },

    selectTeacher(e) {
      var uid = e.currentTarget.dataset.uid;
      var selectMutiTeacher = this.selectMutiTeacher;
      console.log(selectMutiTeacher);

      if (this.type == 'remove') {
        var selectMutiTeacher = this.selectRemove;
      }

      if (selectMutiTeacher[uid]) {
        delete selectMutiTeacher[uid];
      } else {
        selectMutiTeacher[uid] = uid;
      }

      this.setData({
        selectMutiTeacher: selectMutiTeacher,
        selectRemove: selectMutiTeacher
      });
    },

    setTeacher() {
      var data = {
        fid: this.fid,
        formhash: app.globalData.formhash,
        targetlevel: 3,
        managetype: 2
      };

      for (var x in this.selectMutiTeacher) {
        var key = 'muid[' + x + ']';
        data[key] = x;
      }

      app.globalData.apimanager.postRequest(addAdminUrl, data).then(res => {
        if (res.Message.messageval == 'group_setup_succeed') {
          wx.showModal({
            content: res.Message.messagestr,
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                wx.navigateBack({});
              }
            }
          });
        } else {
          wx.showModal({
            content: res.Message.messagestr,
            showCancel: false
          });
        }
      }).catch(res => {
        wx.showToast({
          title: '出错了！',
          icon: 'none'
        });
        console.log(res);
      });
    },

    removeUser() {
      var data = {
        fid: this.fid,
        formhash: app.globalData.formhash,
        targetlevel: 5
      };

      for (var x in this.selectRemove) {
        var key = 'muid[' + x + ']';
        data[key] = x;
      }

      app.globalData.apimanager.postRequest(addAdminUrl, data).then(res => {
        if (res.Message.messageval == 'group_setup_succeed') {
          wx.showModal({
            content: res.Message.messagestr,
            showCancel: false
          });
          this.initClassInfo();
        } else {
          if (res.Message.messageval.indexOf('group_member_level_admin_noallowed') != -1) {
            wx.showModal({
              content: "抱歉，您的管理权限无法踢出该用户",
              showCancel: false
            });
            return;
          }

          wx.showModal({
            content: res.Message.messagestr,
            showCancel: false
          });
        }
      }).catch(res => {
        wx.showToast({
          title: '出错了！',
          icon: 'none'
        });
        console.log(res);
      });
    },

    jumpTo: function (e) {
      var id = e.currentTarget.dataset.id;
      this.setData({
        toView: 'view_' + id
      });
    }
  }
};
</script>
<style>
@import "./admin_setting.css";
</style>