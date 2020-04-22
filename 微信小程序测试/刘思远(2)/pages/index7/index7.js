// pages/index7/index7.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  changeUrl(){
    wx.navigateTo({
      url: '/pages/index3/index3',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // wx.showShareMenu({
    //   withShareTicket:true
    // })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return{
      title:'我的小程序',
      imageUrl:'https://bkimg.cdn.bcebos.com/pic/c2cec3fdfc03924583b3a2158594a4c27d1e25a1?x-bce-process=image/watermark,g_7,image_d2F0ZXIvYmFpa2UxODA=,xp_5,yp_5'
    }
  }
})