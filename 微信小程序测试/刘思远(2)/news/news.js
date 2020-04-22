// pages/news/news.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    stories:[],
    date:'',
    top_stories:[],
    dateList:null,
    weekList:['日','一','二','三','四','五','六']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getTodayNews()
  },
  getTodayNews(){
    wx.request({
      url: 'https://news-at.zhihu.com/api/4/news/latest',
      success:(res)=>{
        console.log(res)
        this.setData({...res.data})
      }
    })
  },
  getBeforeNews() {
    let lastDate = typeof this.data.date == 'object' ? this.data.date[this.data.date.length - 1] : this.data.date
    wx.request({
      url: `https://news-at.zhihu.com/api/4/news/before/${lastDate}`,
      success:(res)=>{
        if(typeof this.data.date == 'object'){
          var dateList = this.data.date
          dateList.push(res.data.date)
          dateFilterList = dateList.map((item, index) => item.substr(0, 4) + '年' + item.substr(4, 2) + "月" + item.substr(6) + '日 ' + "星期" + this.data.weekList[new Date((new Date).getTime() - 24 * 60 * 60 * 1000 * (index + 1)).getDay()])
        }else{
          var dateList = []
          dateList.push(res.data.date)
          var dateFilterList = dateList.map((item, index) => item.substr(0, 4) + '年' + item.substr(4, 2) + "月" + item.substr(6) + '日 ' + "星期" + this.data.weekList[new Date((new Date).getTime() - 24 * 60 * 60 * 1000 * (index + 1)).getDay()])
        }
        let stories = this.data.stories.concat(res.data.stories)
        this.setData({
          date: dateList,
          stories,
          dateList: dateFilterList
        })
      }
    })
  },
  geDetail(e){
    wx.navigateTo({
      url: '/pages/news-detail/news-detail?url=' + e.currentTarget.dataset.url,
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
    this.getBeforeNews()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})