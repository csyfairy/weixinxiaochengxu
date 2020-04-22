// pages/douyu/douyu.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 当前请求的页码值
    currentPage: 1,
    // 当前斗鱼房间列表
    roomList: []
  },

  // 请求数据的函数
  requestData(){
    // 小程序数据请求不少同源策略限制, 无需考虑跨域问题
    wx.request({
      url: 'http://m.douyu.com/api/room/list',
      data: {
        page: this.data.currentPage
      },
      method: "GET",
      success: (res) => {
        console.log(res)
        this.setData({
          roomList: this.bottom ? this.data.roomList.concat(res.data.data.list) : res.data.data.list.concat(this.data.roomList)
        })
        // 隐藏正在加载的提示框
        wx.showLoading({title: ''})
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
    // 定义全局变量,记录当前是否是触底刷新
    this.bottom = false;
    // 页面加载时,请求数据
    this.requestData();
    // 因为一页数据占不满屏幕空间,无法触底,就不能触发触底刷新,所以默认执行一次触底加载函数
    this.onReachBottom()
    
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    // 前提: 需要在douyu.json文件中添加enablePullDownRefresh允许本页下拉刷新,然后下拉会执行这个函数
    console.log("下拉刷新")
    // 增加页码
    this.setData({
      currentPage : this.data.currentPage + 1
    })
    // 记录当前不是触底加载
    this.bottom = false;
    // 继续请求数据
    this.requestData();
    // 显示正在加载的提示
    wx.showLoading({
      title: '正在加载...',
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    // 小程序默认监听触底刷新
    console.log("触底刷新")
    // 增加页码
    this.setData({
      currentPage: this.data.currentPage + 1
    })
    // 记录当前时触底加载
    this.bottom = true;
    // 继续请求数据
    this.requestData();
    // 显示正在加载的提示
    wx.showLoading({
      title: '正在加载...',
    })
  },
})