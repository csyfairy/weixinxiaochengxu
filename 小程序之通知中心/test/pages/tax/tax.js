// pages/tax/tax.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.appID);
    // 我要在app的通知中心中注册事件 （这个回调函数我们命名为：b）
    this.cb1 = function (data) {
      console.log(data);
    };
    app.notificationCenter.on("meili881", this.cb1);


    this.cb2 = function (data) {
      console.log(data);
    };
    app.notificationCenter.on("meili881", this.cb2);



    this.cb3 = function (data) {
      console.log(data);
    };
    app.notificationCenter.on("jiaotongguangbo", this.cb3);
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
    console.log("tax页面卸载了");
    app.notificationCenter.off("meili881", this.cb1);
    app.notificationCenter.off("meili881", this.cb2);
    app.notificationCenter.off("jiaotongguangbo", this.cb3);
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