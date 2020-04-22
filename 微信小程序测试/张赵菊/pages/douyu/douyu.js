// pages/douyu/douyu.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 当前页面的页码值
    currentPage:1,
    roomList:[],//房间列表
  },

// 斗鱼数据请求函数
requestData(){
  // 小程序里面是数据请求不受同源策略限制，无需考虑跨域问题
  wx.request({
    url: 'https://m.douyu.com/api/room/list',
    data: {
      page: this.data.currentPage
    },
    method: "GET",
    success: (res) => {
      console.log(res.data.data.list);
      this.setData({
        roomList: this.bottom ? this.data.roomList.concat(res.data.data.list):res.data.data.list.concat(this.data.roomList)
      })
      // 隐藏前先让提示框显示
      wx.showLoading({
        title: '',
      })
      // 数据请求完成，隐藏正在加载的提示框
      wx.hideLoading()
      // 结束下拉刷新
      wx.stopPullDownRefresh()
    }
  })
},






  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 定义全局变量,记录当前是否触底
    this.bottom = false;
    // 页面加载时请求数据
    this.requestData()
    // 以为一页数据占不满屏幕空间，无法触底，就不能触发触底刷新事件，所以默认执行一次触底刷新事件
    this.onReachBottom()
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
    this.bottom=false
    // 前提：需要在douyu.json文件中添加enablePullDownRefresh:true字段，允许本页的下拉刷新，才会触发这个刷新函数
    console.log("下拉刷新")
    // 增加页码
    this.setData({
      currentPage:this.data.currentPage+1,
    })
    // 继续请求数据
    this.requestData()
    // 显示正在加载的提示
    wx.showLoading({
      title: '正在加载...',
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.bottom=true
    // 增加页码
    this.setData({
      currentPage: this.data.currentPage + 1,
    })
    // 继续请求数据
    this.requestData()
    // 显示正在加载的提示
    wx.showLoading({
      title: '正在加载...',
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})