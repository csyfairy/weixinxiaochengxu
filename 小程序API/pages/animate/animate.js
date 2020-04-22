// pages/animate/animate.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    boxAnimation: null,
    fromCity: "商丘",
    toCity: "郑州",
    animationLeft: null,
    animationRight: null,
    offset: false,
  },
  // 城市切换动画
  changeCity() {
    if (!this.animationLeft || !this.animationRight) {
      // 左侧动画
      this.animationLeft = wx.createAnimation({})
      // 右侧动画
      this.animationRight = wx.createAnimation({})
    }

    // 动画方向
    if (this.data.offset) {
      // 动画效果
      this.animationLeft.translateX("0").step()
      this.animationRight.translateX("0").step()
    } else {
      // 动画效果
      this.animationLeft.translateX("500rpx").step()
      this.animationRight.translateX("-500rpx").step()
    }

    this.setData({
      animationLeft: this.animationLeft.export(),
      animationRight: this.animationRight.export(),
      offset: !this.data.offset
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})