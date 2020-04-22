// pages/user/user.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 用户信息对象
    userInfo: null,
    // 系统信息对象
    systemInfo: null,
    // wifi的开关
    onWifi: false,
    // 蓝牙的开关
    onBluetooth : false,
    // 电量
    percent: 0,
    // 是否正在充电中
    isCharging : false,
    // 联系人的姓名和手机号
    displayName : null,
    phoneNumber : null,
    // 剪贴板中的数据
    message: "向剪贴版中放入的默认数据",
    // 显示粘贴按钮
    pasteShow : false,
    // 网络类型
    networkType: "获取网络类型"
  },

  // 通过微信API获取用户信息的函数
  gatUserInfo1(){
    // 调用API获取用户信息
    wx.getUserInfo({
      // 是否包含登录状态信息
      withCredentials: false,
      // 设置返回数据的语言, zh_CN简体中文
      lang: "zh_CN",
      success: (res)=>{
        console.log(res);
        this.setData({
          userInfo : res.userInfo
        })
      }

    })
  },
  // 通过按钮open-type属性获取用户信息的函数
  gatUserInfo2(res) {
    console.log(res)
    this.setData({
      userInfo: res.detail.userInfo
    })
  },

  // 获取系统信息
  gatSystemInfo(){
    // 调用API
    wx.getSystemInfo({
      success: (res)=> {
        this.setData({
          systemInfo : res
        })
      },
    })
  },

  // 切换wifi的函数
  changeWifi(e){
    console.log(e.detail.value)
    // 如果switch打开,就打开wifi
    if (e.detail.value){
      wx.startWifi({
        success(){
          wx.showToast({
            title: 'wifi已开启',
          })
        },
        fail(err){
          console.log(err)
        }
      })
    }else{
      wx.stopWifi({
        success() {
          wx.showToast({
            title: 'wifi已关闭',
          })
        },
        fail(err) {
          console.log(err)
        }
      })
    }
  },

  // 切换蓝牙的函数
  changeBluetooth(e){
    if (e.detail.value) {
      wx.openBluetoothAdapter({
        success(res) {
          wx.showToast({
            title: '蓝牙已开启',
          })
        }
      })
    }else{
      wx.closeBluetoothAdapter({
        success(res) {
          wx.showToast({
            title: '蓝牙已关闭',
          })
        }
      })
    }
  },

  // 选择联系人的函数
  chooseFriend(){
    wx.chooseContact({
      success: (res)=>{
        console.log(res)
        this.setData({
          displayName: res.displayName,
          phoneNumber: res.phoneNumber
        })
      }
    })
  },

  // 保存联系人的函数
  saveFriend(){
    wx.addPhoneContact({
      firstName: this.data.displayName || "张三",
      mobilePhoneNumber : this.data.phoneNumber || "123"
    })
  },

  // 姓名输入框输入同步
  nameInput(e){
    this.setData({
      displayName : e.detail.value
    })
  },
  // 电话号输入框输入同步
  phoneInput(e) {
    this.setData({
      phoneNumber: e.detail.value
    })
  },

  // 拨打电话的函数
  call(){
    wx.makePhoneCall({
      phoneNumber : this.data.phoneNumber || "10086"
    })
  },

  // 复制的输入框信息同步
  msgInput(e){
    this.setData({
      message: e.detail.value
    })
  },

  // 长按复制的函数
  copy(){
    // 把输入框中的数据放入剪贴板
    wx.setClipboardData({
      data: this.data.message
    })
  },

  // 长按显示粘贴按钮
  pasteLongTap(){
    this.setData({
      pasteShow : true
    })
  },

  // 点击粘贴按钮的函数
  paste(){
    // 从粘贴板中取出数据
    wx.getClipboardData({
      success:(res)=> {
        console.log(res.data)
        this.setData({
          pasteMsg: res.data,
          pasteShow : false
        })
      }
    })
  },

  // 获取网络类型
  network(){
    wx.getNetworkType({
      success: (res)=> {
        this.setData({
          networkType: "当前网络类型是: " + res.networkType
        })
      }
    })
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 监测WiFi/蓝牙状态,获取系统信息,查看WiFi状态
    wx.getSystemInfo({
      success: (res) => {
        console.log(res.wifiEnabled)
        this.setData({
          onWifi: res.wifiEnabled,
          onBluetooth: res.bluetoothEnabled
        })
      },
    })

    // 获取当前电量
    wx.getBatteryInfo({
      success: (res)=>{
        console.log(res)
        this.setData({
          percent : res.level,
          isCharging: res.isCharging
        })
      }
    })
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