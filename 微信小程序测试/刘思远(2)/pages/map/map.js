// pages/map/map.js

var QQMapWX = require('../../libs/qqmap-wx-jssdk.js')
var qqmapsdk;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    longitude:113.64,
    latitude:34.75,
    traffic:false,
    isFocus:false,
    searchKey:'',
    markerList:[]
  },
  focusInput(){
    this.setData({isFocus:true})
  },
  myInput(e){
    this.setData({searchKey:e.detail.value})
  },
  search(){
    // 调用接口
    qqmapsdk.search({
      keyword: this.data.searchKey,
      success: (res) => {
        var poslist = res.data.map(item=>{
          return{
            id:item.id,
            longitude:item.location.lng,
            latitude:item.location.lat,
            title:item.title,
            iconPath:'../../icons/map-marker-radius.png',
            alpha:0.8,
            width:30,
            height:30,
            callout:{
              content:item.title
            }
          }
        })
        console.log(poslist)
        this.setData({markerList:poslist})
      },
      fail: function (res) {
        console.log(res);
      },
      complete: function (res) {
        console.log(res);
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    qqmapsdk = new QQMapWX({
      key: 'E32BZ-BIUED-EY244-HHWT2-YHHRJ-QCFLL'
    });
    wx.getLocation({
      isHighAccuracy:true,
      success: (res) => {
        this.setData({
          latitude: res.latitude,
          longitude: res.longitude,
          scale:16
        })
      },
    })
    this.mapContext = wx.createMapContext('myMap', this)
  },
  nowPos() {
    this.mapContext.moveToLocation()
    this.setData({scale:16})
  },
  smaller(){
    if(this.data.scale > 3){
      this.setData({
        scale:this.data.scale - 1
      })
    }
  },
  bigger() {
    if (this.data.scale < 20) {
      this.setData({
        scale: this.data.scale + 1
      })
    }
  },
  traffic(){
    this.setData({
      traffic:!this.data.traffic
    })
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