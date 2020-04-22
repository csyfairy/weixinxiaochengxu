// pages/index6/index6.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    count:0,
    isShow:false,
    time:"12:00",
    date:"2020/3/3",
    region:["河南省","信阳市","潢川县"]
  },
  onGetData(e){
    console.log(e)
  },
  myInput(e){
    // console.log(e.detail.value)
    this.setData({ count: e.detail.value})
  },
  add(){
    this.setData({ count: this.data.count + 1 })
  },
  show(){
    console.log(this)
    this.setData({ isShow: !this.data.isShow })
  },
  timeChange(e){
    this.setData({ time: e.detail.value})
  },
  dateChange(e) {
    this.setData({ date: e.detail.value })
  },
  regionChange(e){
    this.setData({ region: e.detail.value })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})