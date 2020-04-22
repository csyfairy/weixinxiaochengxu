// pages/search/search.js
import {
  searchHot,
  searchSuggest
} from "../../utils/network.js"
var timer = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageSearch: "../../images/search.png",
    searchHotList: null,
    offset: 0,
    searchSuggestList: [],
    val: ''
  },

  // 触发输入事件
  searchSuggest(e) {
    // console.log()
    this.setData({
      val: e.detail.value
    })
    if (this.data.val != '') {
      clearTimeout(timer)
      timer = setTimeout(() => {
        searchSuggest(this.data.val, this.data.offset).then(data => {
          // console.log(data.result.songs)
          if (data.result.songs) {
            this.setData({
              searchSuggestList: data.result.songs,
            })
          } else {
            wx.showToast({
              title: '没有搜索到数据',
              icon: 'none'
            })
          }
          // console.log(this.data.searchSuggestList)
        })
      }, 1000)
    } else {
      this.setData({
        searchSuggestList: null
      })
    }

  },

  hotwordClick(e) {
    console.log(e.target.dataset.hotword)
    this.setData({
      val: e.target.dataset.hotword
    })
    searchSuggest(this.data.val, this.data.offset).then(data => {
      console.log(data.result.songs)
      this.setData({
        searchSuggestList: this.data.searchSuggestList.concat(data.result.songs),
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    searchHot().then(data => {
      // console.log(data)
      this.setData({
        searchHotList: data.result
      })
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
    this.setData({
      searchSuggestList: [],
      val: ''
    })
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
    this.setData({
      offset: this.data.offset + 1
    })
    wx: wx.showLoading({
      title: '加载更多',
    })
    searchSuggest(this.data.val, this.data.offset).then(data => {
      // console.log(data.result.songs)
      wx: wx.hideLoading()
      if (data.result.songs) {
        this.setData({
          searchSuggestList: this.data.searchSuggestList.concat(data.result.songs),
        })
        wx: wx.showToast({
          title: '请求成功',
        })
      } else {
        wx: wx.showToast({
          title: '没有更多数据了',
        })
      }

    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})