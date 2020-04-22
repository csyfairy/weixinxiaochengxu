// pages/media/media.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    recordTime:0,
    recordPaths:[],
    src:"http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400",
    danmuList: [
      {
        text: '第 1s 出现的弹幕',
        color: '#ff0000',
        time: 1
      },
      {
        text: '第 2s 出现的弹幕',
        color: '#0000ff',
        time: 2
      },
      {
        text: '第 3s 出现的弹幕',
        color: '#ff00ff',
        time: 3
      }]
  },
  startRecord(){

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.audio = wx.createAudioContext("myAudio")
    this.recorderManager = wx.getRecorderManager()
    this.innerAudioContext = wx.createInnerAudioContext()
    this.recorderManager.onStart(()=>{
      console.log('开始啦')
      this.timer = setInterval(()=>{
        this.setData({
          recordTime:this.data.recordTime + 1
        })
      },1000)
    })
    this.recorderManager.onStop(function(res){
      console.log(res.tempFilePath)
      this.setData({
        recordTime: 0
      })
      clearInterval(this.timer)
      let temp = this.data.recordPaths
      temp.push(res.tempFilePath)
      this.setData({ recordPaths:temp })
    }.bind(this))
  },
  playVoice(e){
    console.log(e.currentTarget.dataset.path)
    this.innerAudioContext.src = e.currentTarget.dataset.path
    this.innerAudioContext.play()
    this.innerAudioContext.onPlay(() => {
      console.log('开始播放')
    })
    this.innerAudioContext.onError((res) => {
      console.log(res.errMsg)
      console.log(res.errCode)
    })
      // wx.playVoice({
      //   filePath: e.currentTarget.dataset.path,
      // })
  },
  play(){
    this.audio.play()
  },
  pause(){
    this.audio.pause()
  },
  startRecord(){
    this.recorderManager.start()
    //  wx.startRecord({
    //    success:res=>{
    //      console.log(res)
    //      let temp = this.data.recordPaths
    //      temp.push(res.tempFilePath)
    //      this.setData({ recordPaths: temp })
    //    }
    //  })
  },
  stopRecord(){
    this.recorderManager.stop()
  },
  bindInputBlur(e){
    this.danmu = e.detail.value
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