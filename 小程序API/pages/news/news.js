// pages/news/news.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 轮播图数据
    slideshowData: [],
    // 今日新闻数据
    nowData: [],
    // 往日新闻数据
    pastData: [],
    // 今天日期
    nowDate: "",
    // 过去日期列表
    pastDate: []

  },
  // 请求数据的函数
  requestData() {
    // 小程序数据请求不少同源策略限制, 无需考虑跨域问题
    wx.request({
      url: 'https://news-at.zhihu.com/api/4/news/latest',
      method: "GET",
      success: (res) => {
        // console.log(res.data)
        // console.log(res.data.date)
        this.setData({
          slideshowData: res.data.top_stories,
          nowData: res.data.stories,
          nowDate: res.data.date
        })
      }
    })
  },
  // 跳转到新闻详情页
  newsDetail(e) {
    // console.log(e.currentTarget.dataset.url) // 事件目标标签的data属性数据
    wx.navigateTo({
      // 跳转到直播间页面,并通过url传参
      url: '/pages/news-detail/news-detail?url=' + e.currentTarget.dataset.url
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.requestData();
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    // console.log(this.data.nowDate)
    wx.request({
      url: `https://news-at.zhihu.com/api/4/news/before/${this.data.nowDate}`,
      method: "GET",
      success: (res) => {
        console.log(res.data.date)
        this.setData({
          pastData: this.data.pastData.concat(res.data.stories),
          pastDate: this.data.pastDate.concat(res.data.date)
        })
        console.log(this.data.pastDate)
      }
    })

    this.setData({
      nowDate: this.data.nowDate - 1,
    })
  },

})