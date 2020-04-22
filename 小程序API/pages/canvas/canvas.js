// pages/canvas/canvas.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.canvas = wx.createCanvasContext("myCanvas", this)
  },
  drawLine() {
    // this.canvas.beginPath();
    this.canvas.moveTo(60, 60)
    this.canvas.lineTo(200, 60)
    this.canvas.lineTo(200, 200)
    this.canvas.lineTo(60, 200)
    this.canvas.lineTo(60, 60)

    this.canvas.stroke();
    this.canvas.draw()
  },
  drawRect() {
    // 实心
    this.canvas.setFillStyle("orange")
    this.canvas.fillRect(30, 30, 100, 100)

    // 空心
    this.canvas.setStrokeStyle("red")
    this.canvas.strokeRect(150, 30, 120, 100)

    // 绘制挖空矩形
    this.canvas.setFillStyle('black')
    this.canvas.fillRect(100, 160, 200, 100)
    this.canvas.clearRect(130, 190, 40, 40)

    this.canvas.draw()
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