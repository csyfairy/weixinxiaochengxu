// pages/search/search.js

import {
  hotwordRequest,
  keywordRequest
} from "../../utils/network.js"

let timer = null;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 热搜列表
    hotword: [],
    // 搜索关键字
    keyword: "",
    // 搜索结果的列表
    resultList: [],
  },

  //点击了热搜关键字
  hotwordClick(e) {
    // console.log(e.currentTarget.dataset.hotword);
    this.setData({
      keyword: e.currentTarget.dataset.hotword
    })
    // 发起请求
    this.doSearch();
  },

  onLoad: function (options) {
    // 请求热搜关键字
    hotwordRequest().then(data => {
      // console.log(data);
      this.setData({
        hotword: data.result.hots
      })
    });
  },

  onHide(){
    // 页面隐藏时重置搜索列表
    this.setData({
      resultList: null,
      keyword : ""
    })
  },

  //用户输入的搜索关键字改变了
  keywordChange(e) {
    this.setData({
      keyword: e.detail.value
    });

    // 停止输入1s后再发送网络请求(防抖动机制)
    clearTimeout(timer);
    timer = setTimeout(() => {
      this.doSearch();
    }, 1000)
  },

  //发起搜索的请求
  doSearch() {
    // 关键字清空则重置搜索结果,不展示搜索结果列表
    if (!this.data.keyword.trim()) {
      this.setData({
        resultList: []
      });
      return;
    }
    // 如果关键字不为空,发起搜索请求
    keywordRequest(this.data.keyword, 0).then(data => {
      // console.log(data.result.songs);
      this.setData({
        resultList: data.result.songs
      })
    });
  },

  //页面上拉触底事件的处理函数,加载更多搜索结果
  onReachBottom: function () {
    // 过滤空关键字
    if (!this.data.keyword.trim()) {
      this.setData({
        resultList: []
      });
      return;
    }

    wx.showLoading({
      title: '加载更多',
    })
    keywordRequest(this.data.keyword, this.data.resultList.length).then(data => {
      // console.log(data.result.songs);
      wx.hideLoading();  // 隐藏加载更多提示框
      // 如果有更多搜多结果数据, 把搜索结果拼接到当前列表中
      if (data.result.songs) {
        this.setData({
          resultList: this.data.resultList.concat(data.result.songs)
        })
        wx.showToast({
          title: '请求成功',
        })
      } else {
        wx.showToast({
          title: '没有更多数据了',
        })
      }
    });
  },
})