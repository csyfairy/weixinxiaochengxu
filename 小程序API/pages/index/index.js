const app = getApp() // app.js对象

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  btnClick() {
    wx.navigateTo({
      url: '/pages/data/data',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 也可以实现分享功能
    wx.showShareMenu({
      withShareTicket: true
    })
  },
  //用户点击分享函数
  onShareAppMessage() {
    // 函数存在就可以分享
    // 函数中可以不写内容


    // 分享的三种方式
    // 1:onShareAppMessage(){}
    // 2：wx.showShareMenu({
    //   withShareTicket: true
    // })
    // 3：设置button按钮 open-type="share"

    // 函数中可以自定义分享界面
    return {
      title: "快来看我的小程序",
      imageUrl: "https://dss1.bdstatic.com/5eN1bjq8AAUYm2zgoY3K/r/www/cache/static/protocol/https/home/img/qrcode/zbios_09b6296.png"
    }
  },


})