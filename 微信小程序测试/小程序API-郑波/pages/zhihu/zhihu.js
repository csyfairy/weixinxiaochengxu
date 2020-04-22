// pages/zhihu/zhihu.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    zhihuDailyToday: [],
    index: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */

  // 今天的知乎日报信息
  zhihuDailyToday() {
    wx.request({
      url: 'https://news-at.zhihu.com/api/4/news/latest',
      method: "GET",
      success: (res) => {
        // console.log(res.data)
        var temr = this.data.zhihuDailyToday;
        temr.push(res.data)
        this.setData({
          zhihuDailyToday: temr,
          index: this.data.zhihuDailyToday.length - 1
        })
        // this.data.index = this.data.zhihuDailyToday.length - 1
        // console.log(this.data.zhihuDailyToday.length)
        if (this.data.zhihuDailyToday[this.data.index].stories.length < 5) {
          this.yesterdayFun();
        }
      }
    })
  },
  onLoad: function(options) {
    this.zhihuDailyToday();
  },

  // 请求以前的数据
  yesterdayFun() {
    // console.log(this.data.index)
    // console.log(this.data.zhihuDailyToday[this.data.index].date)
    wx.showLoading({
      title: '正在加载',
    })
    var i = this.data.zhihuDailyToday[this.data.index].date;
    wx.request({
      url: 'https://news-at.zhihu.com/api/4/news/before/'+ i,
      method: "GET",
      success: (res) => {
        console.log(res)
        var temr = this.data.zhihuDailyToday;
        temr.push(res.data)
        this.setData({
          zhihuDailyToday: temr,
          index: this.data.zhihuDailyToday.length - 1
        })
        wx.hideLoading()
      }
    })
  },


  /**
  * 页面上拉触底事件的处理函数
  */
  onReachBottom: function () {
    this.yesterdayFun();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

 

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})