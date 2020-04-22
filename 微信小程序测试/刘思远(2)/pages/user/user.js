// pages/user/user.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:null,
    systemInfo:null,
    onWifi:false,
    onBluetooth:false,
    level:0,
    isCharging:false,
    displayName:'',
    phoneNumber:null,
    copyInfo:''
  },
  getUserInfo(res){
    this.setData({ userInfo: res.detail.userInfo })
  },
  getSystemInfo(){
    wx.getSystemInfo({
      success: (res) => {
        this.setData({systemInfo:res})
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  // getUser(){
  //   wx.getUserInfo({
  //     withCredentials: false,
  //     lang: 'zh_CN',
  //     success: (res) => {
  //       console.log(res)
  //       this.setData({ userInfo : res.userInfo})
  //     },
  //     fail: function(res) {},
  //     complete: function(res) {},
  //   })
  // },
  changeWifi(e){
    if (e.detail.value) {
      wx.startWifi({
        success(res){
          console.log(res)
          wx.showToast({
            title: '已开启',
          })
        }
      })
    }
    this.setData({
      onWifi: e.detail.value
    })
  },
  changeBluetooth(e){
    if (e.detail.value) {
      wx.openBluetoothAdapter({
        success: function(res) {
          wx.showToast({
            title: '开启蓝牙',
          })
        },
      })
    }else{
      wx.closeBluetoothAdapter({
        success: function(res) {
          wx.showToast({
            title: '关闭蓝牙',
          })
        },
      })
    }
  },
  chooseFriend(){
    wx.chooseContact({
      success: ({ displayName,phoneNumber }) => {
        this.setData({ displayName, phoneNumber })
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getSystemInfo({
      success: (res) => {
        console.log(res)
        this.setData({
          onWifi:res.wifiEnabled,
          onBluetooth:res.bluetoothEnabled
        })
      },
    })
    wx.getBatteryInfo({
      success: ({level}) => {
        this.setData({ level})
      }
    })
  },
  copy(e){
    this.setData({copyInfo:e.detail.value})
  },
  copyed(){
    wx.setClipboardData({
      data: this.data.copyInfo,
      success(res) {
        wx.getClipboardData({
          success(res) {
            console.log(res) // data
          }
        })
      }
    })
  },
  getCopyInfo(){
    wx.getClipboardData({
      success(res) {
        console.log(res)
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