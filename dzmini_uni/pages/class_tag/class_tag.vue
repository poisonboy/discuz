<template>
<view class="page" @tap="no_remove">
  <view class="page__bd">
    <view class="slide_box">
      <block v-for="(item, index) in slide_list" :key="index">
        <view :class="'slide_item ' + (is_remove==index?'remove_ani':'')" :data-index="index">
          <view class="slide_cell">
            <view class="fl slide_for slide_close" :data-index="index" @tap.stop="remove"></view>
            <view class="fl slide_sub">
              <input class="fl slide_sub" type="number" :data-index="index" data-type="old" @input="inputSortChange" placeholder="排序" :value="item.displayorder"></input>
              <input class="fl slide_sub" :data-index="index" data-type="old" @input="inputNameChange" placeholder="添加分类" :value="item.name"></input>
            </view>
            <view class="fr slide_del" :data-id="item.typeid" @tap="deleteTag">删除</view>     
          </view>
        </view>
      </block>
      <block v-for="(item, index) in new_slide_list" :key="index">
        <view :class="'slide_item ' + (is_remove_new==index?'remove_ani':'')" :data-index="index">
          <view class="slide_cell">
            <view class="fl slide_for slide_close" :data-index="index" @tap.stop="removeNew"></view>
            <view class="fl slide_sub">
              <input class="fl slide_sub" type="number" :data-index="index" data-type="new" @input="inputSortChange" placeholder="排序" :value="item.displayorder"></input>
              <input class="fl slide_sub" :data-index="index" data-type="new" @input="inputNameChange" placeholder="添加分类" :value="item.name"></input>
            </view>
            <view class="fr slide_del" :data-index="index" @tap="deleteTagNew">删除</view>     
          </view>
        </view>
      </block>      
      <view class="slide_item">
        <view class="fl slide_for slide_new_add" @tap="addMore"></view>
        <view class="fl slide_sub">添加分类</view>
      </view>      
    </view>

    <view class="weui-btn-area">
        <button class="weui-btn" type="warn" @tap="formSubmit">确定</button>
    </view>
  </view>
</view>
</template>

<script>
const threadTypeUrl = require("../../config").threadTypeUrl;
const app = getApp();
var _this;

export default {
  data() {
    return {
      is_remove: -1,
      uid: false,
      slide_list: [],
      new_slide_list: [],
      is_remove_new: "",
      fid: ""
    };
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    _this = this;
    var fid = options.id;
    this.setData({
      fid: fid
    });
    this.getTagsByFid(fid);
  },
  methods: {
    inputSortChange(e) {
      var dataset = e.currentTarget.dataset;
      var index = dataset.index;
      var value = e.detail.value;

      if (dataset.type == 'old') {
        var slide_list = this.slide_list;
        slide_list[index]['displayorder'] = value;
        this.setData({
          slide_list: slide_list
        });
      } else {
        var new_slide_list = this.new_slide_list;
        new_slide_list[index]['displayorder'] = value;
        this.setData({
          new_slide_list: new_slide_list
        });
      }
    },

    inputNameChange(e) {
      var dataset = e.currentTarget.dataset;
      var index = dataset.index;
      var value = e.detail.value;

      if (dataset.type == 'old') {
        var slide_list = this.slide_list;
        slide_list[index]['name'] = value;
        this.setData({
          slide_list: slide_list
        });
      } else {
        var new_slide_list = this.new_slide_list;
        new_slide_list[index]['name'] = value;
        this.setData({
          new_slide_list: new_slide_list
        });
      }
    },

    no_remove: function () {
      var that = this;
      that.setData({
        is_remove: -1,
        is_remove_new: -1
      });
    },
    remove: function (e) {
      var that = this;

      if (e.currentTarget.dataset.index == that.is_remove) {
        that.setData({
          is_remove: -1,
          is_remove_new: -1
        });
      } else {
        that.setData({
          is_remove: e.currentTarget.dataset.index,
          is_remove_new: -1
        });
      }
    },
    removeNew: function (e) {
      var that = this;

      if (e.currentTarget.dataset.index == that.is_remove) {
        that.setData({
          is_remove: -1,
          is_remove_new: -1
        });
      } else {
        that.setData({
          is_remove: -1,
          is_remove_new: e.currentTarget.dataset.index
        });
      }
    },
    getTagsByFid: function (fid) {
      var data = {
        fid: fid
      };
      app.globalData.apimanager.getRequest(threadTypeUrl, data).then(res => {
        for (var x in res.Variables.threadtypes) {
          res.Variables.threadtypes[x]['marginL'] = 0;
        }

        this.setData({
          slide_list: res.Variables.threadtypes
        });
        console.log(res.Variables.threadtypes);
      }).catch(res => {
        wx.showToast({
          title: '出错了！',
          icon: 'none'
        });
      });
    },
    addMore: function (e) {
      var length = this.new_slide_list.length + this.slide_list.length;

      if (length == 20) {
        return false;
      }

      var new_slide_list = this.new_slide_list;
      new_slide_list.push({
        marginL: 0
      });
      this.setData({
        new_slide_list: new_slide_list
      });
    },

    formSubmit(e) {
      var data = {
        fid: this.fid,
        formhash: app.globalData.formhash
      };
      var slide_list = this.slide_list;
      console.log('old data', slide_list);
      var new_slide_list = this.new_slide_list; // if (slide_list.length == 0 && new_slide_list.length == 0) {
      //   wx.showToast({
      //     title: '至少添加一个分类！',
      //     icon: 'none'
      //   })
      //   return;
      // }

      console.log('new data', new_slide_list);

      for (var x in slide_list) {
        if (slide_list[x]['name'] != '') {
          data['name[' + slide_list[x]['typeid'] + ']'] = slide_list[x]['name'];
          data['displayorder[' + slide_list[x]['typeid'] + ']'] = slide_list[x]['displayorder'];
        }
      }

      for (var x in new_slide_list) {
        if (typeof new_slide_list[x]['name'] != "undefined") {
          data['newname[' + x + ']'] = new_slide_list[x]['name'];
          data['newdisplayorder[' + x + ']'] = new_slide_list[x]['displayorder'];
        }
      }

      console.log(data);
      app.globalData.apimanager.postRequest(threadTypeUrl, data).then(res => {
        if (res.Message && res.Message.messageval == "group_threadtype_edit_succeed") {
          wx.showModal({
            showCancel: false,
            content: '保存成功',

            success(data) {
              if (data.confirm) {
                wx.navigateBack({});
              }
            }

          });
        } else {
          if (res.Message && res.Message.messagestr) {
            wx.showModal({
              showCancel: false,
              content: res.Message.messagestr
            });
          }
        }
      }).catch(res => {
        console.log(res);
        wx.showToast({
          title: '出错了！',
          icon: 'none'
        });
      });
    },

    deleteTag(e) {
      var id = e.currentTarget.dataset.id;
      var data = {
        fid: this.fid,
        formhash: app.globalData.formhash
      };
      data['delete[' + id + ']'] = id;
      app.globalData.apimanager.postRequest(threadTypeUrl, data).then(res => {
        if (res.Message.messageval == "group_threadtype_edit_succeed") {
          _this.getTagsByFid(_this.fid);
        } else {
          wx.showModal({
            showCancel: false,
            content: res.Message.messagestr
          });
        }
      }).catch(res => {
        wx.showToast({
          title: '出错了！',
          icon: 'none'
        });
      });
    },

    deleteTagNew(e) {
      var index = e.currentTarget.dataset.index;
      var new_slide_list = [];

      for (var x in this.new_slide_list) {
        if (x != index) {
          new_slide_list.push(this.new_slide_list[x]);
        }
      }

      this.setData({
        new_slide_list: new_slide_list
      });
    }

  }
};
</script>
<style>
@import "./class_tag.css";
</style>