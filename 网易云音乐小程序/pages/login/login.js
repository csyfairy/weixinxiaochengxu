// pages/login/login.js

const app = getApp();
import { loginRequest } from "../../utils/network.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 记录手机号
    phoneNumber: "",
    // 手机号验证状态, 0表示未验证, 1表示可用, 2表示不可用
    phoneState: 0,
    // 记录密码
    password: "",
    // 密码验证状态, 0表示未验证, 1表示可用, 2表示不可用
    passwordState: 0,
  },

  // 手机号输入,失去焦点时同步
  phoneInput(e) {
    // 正则表达式验证手机号
    var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
    if (myreg.test(e.detail.value)) {
      // 验证通过
      this.setData({
        phoneNumber: e.detail.value,
        phoneState: 1,
      })
    } else {
      this.setData({
        phoneState: 2
      })
    }
  },
  // 密码输入,失去焦点时同步
  passwordInput(e) {
    // 正则表达式验证密码
    var myreg = /^[a-zA-Z]{1}([a-zA-Z0-9]|[._]){5,14}$/;
    if (myreg.test(e.detail.value)) {
      // 验证通过
      this.setData({
        password: e.detail.value,
        passwordState: 1
      })
    } else {
      this.setData({
        passwordState: 2
      })
    }
  },

  /**
   * 点击登陆按钮
   */
  loginTap() {
    if (this.data.phoneState != 1) {
      this.setData({ phoneState: 2 })
      return;
    }
    if (this.data.passwordState != 1) {
      this.setData({ passwordState: 2 })
      return;
    }
    // 登录请求
    loginRequest(this.data.phoneNumber, this.data.password).then(data => {
      console.log(data)
      if (data.code == 200) {
        // 登录成功
        wx.showToast({
          title: '登录成功'
        })
        // // 在 app 的全局数据中保存 userid 和 用户信息 (备份)
        app.globalData.uid = data.profile.userId;
        app.globalData.userInfo = data.profile;
        console.log(1, data.profile)
        // 更新app.js中的用户信息
        app.initData();
        // 返回
        setTimeout(() => {
          wx.navigateBack()
        }, 600)
      } else {
        wx.showToast({
          title: data.msg,
          icon: "none"
        })
      }
    }).catch(err => {
      console.log(222);
      wx.showToast({
        title: '网络异常',
        icon: 'loading'
      })
    })
  }
})