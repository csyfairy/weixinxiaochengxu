// pages/media/video/video.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 视频地址
    src:'http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400',
    // 弹幕列表
    danmuList: [
      {
        text: '第 1s 出现的弹幕',
        color: '#ff0000',
        time: 1
      },
      {
        text: '男主好帅!!!!',
        color: '#ff0',
        time: 2
      },
      {
        text: '第 3s 出现的弹幕',
        color: '#ff00ff',
        time: 3
      }],
      danmu:'',// 当前输入框输入的 弹幕
  },

// 弹幕输入框和数据同步
  bindInputBlur(e){
    // 定义全局变量，记录输入的弹幕信息
    this.danmu = e.detail.value
    console.log(this.danmu)
    this.setData({
      danmu:e.detail.value
    })
  },
// 发送弹幕
sendDanmu(){
  this.videoContext.sendDanmu({
    text: this.data.danmu,
    color: this.getRandomColor()
  });
  // 清空弹幕
  this.setData({
    danmu:''
  })
},

// 随机颜色的函数
getRandomColor() {
  let rgb = []
  for(let i = 0 ; i< 3; ++i){
  let color = Math.floor(Math.random() * 256).toString(16)
  color = color.length == 1 ? '0' + color : color
  rgb.push(color)
}
return '#' + rgb.join('')
},


// 选择视频的函数
  getVideo(){
    wx.chooseVideo({
      sourceType:["album","camera"],//视频来源
      success:res=>{
        console.log(res)
        // 记录选择的这个视频
        this.setData({
          src:res.tempFilePath
        })
      }
    })
  },





  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 创建视频对象
    this.videoContext = wx.createVideoContext("myVideo", this)
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