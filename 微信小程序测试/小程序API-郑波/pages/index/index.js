//index.js
//获取应用实例
const app = getApp()

Page({
  data: {

  },
  // 按钮绑定的事件函数
  btnClick() {
    // 点击第一个按钮时,跳转到数据渲染页,使用wx.navigateTo()函数执行页面跳转
    wx.navigateTo({
      // url是要跳转的页面路径
      url: '/pages/data/data',
    })
  },

  onLoad: function () {
    // 分享功能:也可以不实现  onShareAppMessage函数使用API允许分享
    // wx.showShareMenu({
    //   withShareTicket:true
    // })
  },
  getUserInfo: function (e) {

  },

  /**
   * 用户点击右上角分享的函数,
   */
  onShareAppMessage: function () {
    //   // 这个函数只要存在,这一页就具有分享功能,
    //   // 函数中可以不写内容

    //   三种实现分享的方式
    // 1.实现 onShareAppMessage 这个函数
    // 2.使用 showShareMenu() 允许分享
    // 3.设置按钮属性 open-type="share" 直接分享

    // 这个函数可以返回一个对象,对象中设置自定义分享界面
    return {
      title: "快来看我的小程序",
      imageUrl: "http://a4.att.hudong.com/55/91/01300534888406136270917323337.jpg"
    }
  }
})
