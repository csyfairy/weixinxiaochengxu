// pages/myPages/myPages.js
console.log(123)

console.log(getApp())


Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: "第一页",
    list: [1, 2, 3, 4],
    items: [{
        name: 'USA',
        value: '美国'
      },
      {
        name: 'CHN',
        value: '中国',
        checked: 'true'
      },
      {
        name: 'BRA',
        value: '巴西'
      },
      {
        name: 'JPN',
        value: '日本'
      },
      {
        name: 'ENG',
        value: '英国'
      },
      {
        name: 'FRA',
        value: '法国'
      },
    ]

  },
  radioChange: function(e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
  },

  /**
   * 生命周期函数--监听页面加载  相当于Vue中的
   * created
   */
  onLoad: function(options) {
    console.log("onLoad")
    console.log(this)
    console.log(getApp())
  },

  /**
   * 生命周期函数--监听页面初次渲染完成  相当于Vue中的
   * mounted
   */
  onReady: function() {
    console.log("onReady")
  },

  /**
   * 生命周期函数--监听页面显示
   * 相当于Vue中的 activited
   */
  onShow: function() {
    console.log("onShow")
  },

  /**
   * 生命周期函数--监听页面隐藏
   * 相当于Vue中的   
   */
  onHide: function() {
    console.log("onHide")
  },

  /**
   * 生命周期函数--监听页面卸载
   * 相当于Vue中的  
   */
  onUnload: function() {
    console.log("onUnload")
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   * 需要在配置中允许下拉动作
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