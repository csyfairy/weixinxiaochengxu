// pages/douyu/douyu.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 页码值
    currentPage: 1,
    roomList: []

  },
  // 请求数据的函数
  requestData() {
    // 小程序数据请求不受同源策略限制
    wx.request({
      url: 'http://m.douyu.com/api/room/list',
      data: {
        page: this.data.currentPage,
      },
      method: "GET",
      success: (res) => {
        console.log(res)
        this.setData({
          roomList: this.bottom ? this.data.roomList.concat(res.data.data.list) : res.data.data.list.concat(this.data.roomList)
        })
        // 隐藏正在加载的提示框
        wx.hideLoading()
        // 结束下拉刷新
        wx.stopPullDownRefresh()
      }
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 触底变量
    this.bottom = true
    //页面加载时请求数据
    this.onPullDownRefresh()
    // 
    this.onReachBottom();

  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    //前提:需要在本页 json 文件中 添加 enablePullDownRefresh ： true
    console.log("下拉刷新")
    // 增加请求页码
    this.setData({
      currentPage: this.data.currentPage + 1
    })
    this.bottom = false;
    this.requestData();
    // 显示正在加载的提示
    wx.showLoading({
      title: '正在加载...',
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    console.log("触底刷新");
    // 小程序默认监听触底刷新
    // 增加请求页码
    this.setData({
      currentPage: this.data.currentPage + 1
    })
    this.bottom = true;
    this.requestData();
    // 显示正在加载的提示
    wx.showLoading({
      title: '正在加载...',
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})