// pages/map/map.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    longitude: 113.65,
    latitude: 34.75,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 向用户获取定位权限
    // wx.authorize({
    //   scope: 'scope.record',
    //   success: () => {
    //     console.log("成功")
    //   },
    //   fail: () => {
    //     console.log("失败")
    //   }
    // })

    // // 打开设置
    // wx.openSetting({
    //   success: (res) => {
    //     console.log(res)
    //   }
    // })

    //  在页面加载之后获取定位
    wx.getLocation({
      // 开启高精度定位
      isHighAccuracy: true,
      success: (res) => {
        console.log(res);
        this.setData({
          longitude: res.longitude,
          latitude: res.latitude,
        })
      }
    })

    // 移动到当前位置
    // 获取地图对象 
    var mapContext = wx.createMapContext("myMap", this)
    mapContext.moveToLocation();
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