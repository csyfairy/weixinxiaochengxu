// pages/register/register.js
import { getVarCodeRequest, phoneRegisterStateRequest, registerRequest } from "../../utils/network.js"
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
    // 记录昵称
    username: "",
    // 昵称验证状态, 0表示未验证, 1表示可用, 2表示不可用
    nameState: 0,
    // 验证码
    varCode: "",
    // 获取验证码按钮是否禁用,(默认禁用, 填入正确的手机号时可用)
    codeBtnDisabled: true,
    // 获取验输入框是否禁用,(默认禁用, 点击获取验证码后可用)
    codeInputDisabled: true,
    // 注册按钮是否禁用,(默认禁用, 填入验证码后可用)
    registBtnDisabled: true,
    // 验证码倒计时
    codeTimer: 0
  },

  // 手机号输入,失去焦点时同步
  phoneInput(e) {
    // 正则表达式验证手机号
    var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
    if (myreg.test(e.detail.value)) {
      // 验证通过
      this.setData({
        phoneNumber: e.detail.value,  // 记录手机号
        phoneState: 1,   // 提示手机号可用
        codeBtnDisabled: false  // 解禁验证码按钮
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

  // 用户名输入
  nameInput(e) {
    if (e.detail.value.length > 0) {
      console.log(111)
      this.setData({
        username: e.detail.value,
        nameState: 1
      })
    } else {
      this.setData({
        nameState: 2
      })
    }
  },

  // 获取验证码
  getCode() {
    // console.log(this.data.phoneNumber)
    // 获取验证码
    getVarCodeRequest(this.data.phoneNumber).then(data => {
      console.log(data);
    })

    this.setData({
      codeInputDisabled: false, // 解禁输入框
      codeBtnDisabled: true, //禁用获取验证码
      codeTimer: 60  // 开始倒计时
    })
    // 倒计时
    var timer = setInterval(() => {
      this.setData({
        codeTimer: this.data.codeTimer - 1
      })
      if (this.data.codeTimer <= 0) {
        this.setData({
          codeBtnDisabled: false, //解禁获取验证码
        })
        clearInterval(timer)
      }
    }, 1000)
  },

  // 验证码输入
  codeInput(e) {
    this.setData({
      varCode: e.detail.value,
      registBtnDisabled: e.detail.value.length < 4
    })

  },

  // 注册
  registTap() {
    if (this.data.phoneState != 1) {
      this.setData({ phoneState: 2 })
      return;
    }
    if (this.data.passwordState != 1) {
      this.setData({ passwordState: 2 })
      return;
    }
    if (this.data.nameState != 1) {
      this.setData({ nameState: 2 })
      return;
    }
    // 先检查手机号是否已经被注册
    phoneRegisterStateRequest(this.data.phoneNumber).then(data => {
      console.log(data)
      if (data.exist == 1) {
        wx.showToast({
          title: '此号码已注册,昵称是' + data.nickname,
          icon: "none"
        })
      } else if (data.exist == -1) {
        // 发起注册请求
        registerRequest(this.data.phoneNumber, this.data.password, this.data.username, this.data.varCode).then(data => {
          console.log(data)
          if (data.code == 200) {
            wx.showToast({
              title: '注册成功',
            })
            setTimeout(() => {
              // 返回上一页
              wx.navigateBack()
            }, 600)
          }
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})