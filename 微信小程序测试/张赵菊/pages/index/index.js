//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    
  },
  btnClick(){
    // 点击第一个按钮时，跳转到数据渲染页,使用wx.navigateTo()函数执行页面跳转
    wx.navigateTo({
      url: '../data/data',
    })
  },
  onLoad: function () {
    // 分享功能，也可以不实现onShareAppMessage,使用API允许分享
    wx.showShareMenu({
      // withShareTicket:true
    })
    },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    /**
     * 这个函数只要存在，这一页就具有分享功能
     * 函数中可以不写内容
     */ 


    /**
     * 三种实现分享方式
     * 1，实现onShareAppMessage这个函数
     * 2，使用wx.showShareMenu()允许分享
     * 3，设置按钮属性open-type="share"直接分享
     * 
     * 
     * 这个函数可以返回一个对象，对象中自定义设置分享界面
     */
    return{
      title:'快来看我的小程序',
      imageUrl:'/img/0.jpg'
    }
  }
})