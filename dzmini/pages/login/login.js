// pages/login/login.js
const commonLoginUrl = require('../../config').commonLoginUrl
const loginmanager = require('../../utils/loginManager')

const profileUpdateUrl = require('../../config').profileUpdateUrl
const app = getApp()
var self

Page({

  data: {

    userInfoHidden: true,
    isRequest: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    self = this

    if (loginmanager.openid) {
      if (app.globalData.userInfo) {
        this.setData({
          username: app.globalData.userInfo.nickName
        })
      }
    }

    if (app.globalData.uid) {
      loginmanager.loginOut()
    }

    this.downSeccode()
  },

  downSeccode() {
    app.apimanager.requstSeccode('login').then(res => {
      if (res.sechash) {
        this.setData({
          sechash: res.sechash,
          imageSrc: res.imageSrc
        })
      }

    })
  },

  formSubmit(e) {
    let param = e.detail.value;
    if (this.data.sechash) { // 有验证码
      param['sechash'] = self.data.sechash
    }
    if (loginmanager.openid) {
      param['openid'] = loginmanager.openid
    }
    if (loginmanager.unionid) {
      param['unionid'] = loginmanager.unionid
    }
    param['loginsubmit'] = "yes"
    wx.showLoading({
      title: '登录中',
      icon: 'loading'
    })
    app.apimanager.postRequest(commonLoginUrl, param).then(res => {
      wx.hideLoading()
      if (res.Message.messageval == 'login_succeed') {
        loginmanager.loginSetUserInfo(res)
        wx.navigateBack();
      }
      wx.showToast({
        title: res.Message.messagestr,
        icon: 'none'
      })
    }).catch(res => {
      wx.hideLoading()
      wx.showToast({
        title: "出错了",
        icon: 'none'
      })
    })
  },
  tohome: function() {
    wx.switchTab({
      url: '../discovery/discovery',
    }) 
  },
  toRegister() {
    wx.navigateTo({
      url: '../register/register',
    })
  },

  inputNameChange(e) {
    this.setData({
      username: e.detail.value,
    });
  },
 

})