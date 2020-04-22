//logs.js
const util = require('../../utils/util.js')
var app = getApp()

Page({
  data: {
    logs: []
  },
  onLoad: function () {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    })
  },
  onReady(){
    
  },
  onUnload: function () {
   
  },
})
