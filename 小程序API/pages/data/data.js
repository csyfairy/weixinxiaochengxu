// pages/data/data.js
var provinces = require ("../../utils/provinces.js")
var cities = require("../../utils/cities.js")
var areas = require("../../utils/areas.js")


Page({

  /**
   * 页面的初始数据
   */
  data: {
    count: 0,
    isShow: true,
    nameList: ["张三", "李四", "王五"],
    nameIndex: 0,
  },
  // 输入事件函数
  myInput(e) {
    console.log(e.detail.value)
    this.setData({
      count: e.detail.value * 1 || 0
    })
  },
  add() {
    this.setData({
      count: this.data.count + 1
    })
  },
  // picker 选择
  nameChange(e) {
    console.log(e.detail.value)
    this.setData({
      nameIndex: e.detail.value
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