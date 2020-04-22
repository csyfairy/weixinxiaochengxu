// pages/media/media.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    recordTime:0,//记录当前录音的时间
    recordPath:[],//记录录音地址和时长
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取audio上下文InnerAudioContext对象
    this.audio = wx.createInnerAudioContext()
    this.audio.src = "/video/audio1.mp3";

    // 创建录音管理器
    this.recorderManager = wx.getRecorderManager()

    // 监听开始录音事件
    this.recorderManager.onStart(()=>{
      // 开启计时器，记录当前录音时间
      this.timer = setInterval(()=>{
        this.setData({
          recordTime:(this.data.recordTime+1)
        })
      },100)
    });
    // 监听录音停止时间
    this.recorderManager.onStop((res)=>{
      //停止计时器
      clearInterval(this.timer)
      // 把录音本地临时地址记录下来
      let temp = this.data.recordPath;
      temp.push({'path': res.tempFilePath,'time':(res.duration/1000).toFixed(2)})
      this.setData({
        recordPath:temp,
        recordTime:0
      })
    })
  },
  // 播放音频
  play(){
    this.audio.play();
  },
  pause(){
    this.audio.pause();
  },
// 开始录音
startRecord(){
  // 用录音管理器开始录音
  this.recorderManager.start({
    // 限制录音时长,单位ms
    duration:6000,
    format:'mp3',//默认音频格式aac，可以更改
  })


  // // 已停止维护的老API
  // wx.startRecord({
  //   //录音完成的回调函数
  //   success:(res)=>{
  //     let temp = this.data.recordPath;
  //     temp.push(res.tempFilePath)
  //     this.setData({
  //       recordPath: temp,
  //       recordTime: 0
  //     })
  //   }
  // })
},

// 结束录音
endRecord(){
  // 结束录音
  this.recorderManager.stop();

//  // 已停止维护的老API
//   wx.stopRecord();
},
// 播放录音的函数
playRecord(e){
  console.log(e.currentTarget.dataset.path)
// 播放这个录音文件(只能播放wx.startRecord()的录音)
// wx.playVoice({
//   filePath: e.currentTarget.dataset.path,
// })

// 用新API录音管理器播放
  this.audio.src = e.currentTarget.dataset.path;
  this.audio.play();
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