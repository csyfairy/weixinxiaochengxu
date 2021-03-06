// pages/douyu-room/douyu-room.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 定义此直播间网页地址
    roomUrl:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 加载事件函数的参数是通过url传递过来的数据
    console.log(options)
    // 动态设置当前页面标题
    wx.setNavigationBarTitle({
      title: options.roomName,
    })
    // 拼接直播间网址
    this.setData({
      roomUrl: "https://m.douyu.com/" + options.rid
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