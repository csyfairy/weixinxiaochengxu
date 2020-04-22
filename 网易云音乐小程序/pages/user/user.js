// pages/user/user.js
const app = getApp();
import { logoutRequest } from "../../utils/network.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 记录用户信息,如果有信息说明已登录,否则是未登录
    userInfo: null
  },

  /**
   * 跳转到登陆页面
   */
  goToLogin() {
    wx.navigateTo({
      url: '/pages/login/login',
    })
  },

  // 退出登录
  exitLogin() {
    logoutRequest().then(data => {
      console.log(data)
      if (data.code == 200) {
        // 清空本地用户信息
        wx.removeStorage({ key: "Cookies" });
        wx.removeStorageSync("uid")

        // 清空app.js中的用户信息
        app.globalData.uid = null;
        app.globalData.userInfo = null;

        // 清空当前页的用户信息
        this.setData({
          userInfo: null
        });
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // 获取用户信息
    this.setData({
      userInfo: app.globalData.userInfo
    });
  }
})