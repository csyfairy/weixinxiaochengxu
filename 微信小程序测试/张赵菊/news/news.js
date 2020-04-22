// pages/news/news.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperList:[],
    newsList:[],
    time:'20200314',
    beforeData:[],
    timeArr: [
    ]
     
    
  },

// 请求数据
requestTodayData(){
  wx.request({
    url: 'https://news-at.zhihu.com/api/4/news/latest',
    data:{
      time:''
    },
    method:"GET",
    success:(res)=>{
      // console.log(res);
      this.setData({
        swiperList: res.data.top_stories,
        newsList:res.data.stories
      })
    }
  })
},
  requestData() {
    wx.request({
      url: 'https://news-at.zhihu.com/api/4/news/before/' +this.data.time,
      data: {
        // time: this.data.time
      },
      method: "GET",
      success: (res) => {
        console.log(res.data.stories,"qi");
        // this.data.roomList.concat(res.data.data.list)
        console.log(res.data.stories[0].ga_prefix)
        let month= res.data.stories[0].ga_prefix.substring(0, 2)
        let thisdate= res.data.stories[0].ga_prefix.substring(2, 4)
        // let timeArr;
        this.data.timeArr.push({month:month,thisdate:thisdate})
        this.setData({
          beforeData: this.data.beforeData.concat(res.data.stories),
          timeArr: this.data.timeArr
        })
        // 隐藏前先让提示框显示
        wx.showLoading({
          title: '',
        })
        wx.hideLoading()
        console.log(this.data.timeArr)
      }
    })
  },

   getYesterday(date) {
     var date1 = date.substring(0, 4)
    //  console.log(date,"...")
     var date2 = date.slice(4, -2)
     var date3 = date.substring(6);
    //  console.log(date, "...")
    //  console.log(date1)
    //  console.log(date2)
    //  console.log(date3)
    let today = new Date().setFullYear(+date1, +date2 - 1, +date3)
    var yesterday = new Date(today - 24 * 60 * 60 * 1000);
    var y = yesterday.getFullYear();
    var m = yesterday.getMonth() + 1;
    var d = yesterday.getDate();
    if(m<10) {
      m = '0' + m;
    }
     if(d<10) {
      d = '0' + d;
    }
     let yes = y + '' + m + '' + d;
     console.log(yes)
     this.setData({
       time: yes
     })
  },
 
// 进入详情函数
  enterDetail(e) {
    // 组件中的data数据
    // console.log(this)
    // 事件目标的自定义data-属性
    console.log(e.currentTarget.dataset.url)
    console.log(this)
    wx.navigateTo({
      // 跳转到房间直播页面，并通过url传参
      url: '/pages/news/news-detail/news-detail?id=' + e.currentTarget.dataset.url,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getYesterday(this.data.time);
    this.requestTodayData()
    this.requestData()
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
    this.bottom = true
    // // 增加页码
    // this.setData({
    //   currentPage: this.data.currentPage + 1,
    // })
    // 继续请求数据
    this.getYesterday(this.data.time);
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